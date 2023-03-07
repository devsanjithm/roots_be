import bcrypt from "bcrypt";
import { STATUS_CODE } from "../config";
import response from "../helpers/response";
import dbService from "../database";
import generateToken from "../helpers";

class UserService {
  addUserService = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let prisma = dbService.prisma;
        payload[`password`] = bcrypt.hashSync(payload.password, 10);
        let prevUser = await prisma.user.count({
          where: { email: payload.email },
        });
        if (prevUser > 0) {
          return reject(
            response("User Already exists", {}, false, STATUS_CODE.badRequest, {
              error: `user with mailid ${payload.email} already exists`,
            })
          );
        }
        let user = await prisma.user.create({ data: payload });
        if (user.count <= 0) {
          return reject(
            response(
              "Error While Inserting",
              {},
              false,
              STATUS_CODE.badRequest,
              { error: error.message }
            )
          );
        }
        if (user?.password) delete user[`password`];
        return resolve(
          response(
            "User Added Sucessfully",
            { user },
            true,
            STATUS_CODE.success
          )
        );
      } catch (error) {
        return reject(
          response(
            "Unknown Error Occurred",
            {},
            false,
            STATUS_CODE.badRequest,
            { error: error.message }
          )
        );
      }
    });
  };
  listUser = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let prisma = dbService.prisma;
        let {
          where = { status: true },
          skip = 0,
          limit = Number.MAX_SAFE_INTEGER,
          select = {},
          order = { createdAt: "desc" },
          include = {},
        } = payload;

        let count = await prisma.user.count({ where });
        const params = {
          where,
          take: limit,
          skip,
          orderBy: order,
        };
        if (Object.keys(select).length !== 0) {
          params[`select`] = select;
        }
        if (Object.keys(include).length !== 0) {
          params[`include`] = include;
        }
        let user = await prisma.user.findMany(params);
        return resolve(
          response(
            "Fetch User",
            {
              user,
              total: count,
            },
            true,
            STATUS_CODE.success
          )
        );
      } catch (error) {
        return reject(
          response(
            "Unknown Error Occurred",
            {},
            false,
            STATUS_CODE.badRequest,
            { error: error.message }
          )
        );
      }
    });
  };
  loginUserService = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let prisma = dbService.prisma;
        let { email, password, rememberMe = false } = payload;
        // payload[`password`] = bcrypt.hashSync(payload.password, 10);
        let prevUser = await prisma.user.findMany({
          where: { email },
          include: {
            UserRoles: {
              where: {
                status: true,
              },
              include: {
                RoleId: true,
              },
            },
          },
        });
        if (prevUser.length <= 0) {
          return reject(
            response(
              "User Does not exists",
              {},
              false,
              STATUS_CODE.badRequest,
              {
                error: `user with mailid ${email} does not exists`,
              }
            )
          );
        }
        const passwordVerified = await bcrypt.compare(
          password,
          prevUser[0].password
        );
        delete prevUser[0].password;
        if (!passwordVerified) {
          return reject(
            response(
              "Password Does not exists",
              {},
              false,
              STATUS_CODE.badRequest,
              {
                error: `Password Does not exists`,
              }
            )
          );
        }
        const authToken = await generateToken(prevUser[0], rememberMe);
        return resolve(
          response(
            "login success",
            { user: prevUser[0], token: authToken },
            true,
            200
          )
        );
      } catch (error) {
        return reject(
          response(
            "Unknown Error Occurred",
            {},
            false,
            STATUS_CODE.badRequest,
            { error: error.message }
          )
        );
      }
    });
  };
}

const userService = new UserService();
export default userService;
