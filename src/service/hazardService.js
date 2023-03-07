import { STATUS_CODE } from "../config";
import response from "../helpers/response";
import dbService from "../database";

class HazardService {
  addHazardService = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let prisma = dbService.prisma;
        let hazard = await prisma.hazard.create({ data: payload });
        if (hazard.count <= 0) {
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
        return resolve(
          response(
            "Hazard Added Sucessfully",
            { hazard },
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
  getHazardService = (payload) => {
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
        let hazard = await prisma.hazard.findMany(params);
        if (!hazard) {
          return reject(
            response(
              "Error While Retriving",
              {},
              false,
              STATUS_CODE.badRequest,
              { error: error.message }
            )
          );
        }
        return resolve(
          response(
            "Hazard Retrived Sucessfully",
            { hazard },
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
  updateHazardService = (query, payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let prisma = dbService.prisma;
        let hazard = await prisma.hazard.update({
          where: query,
          data: payload,
        });
        if (hazard.count <= 0) {
          return reject(
            response(
              "Error While Updating",
              {},
              false,
              STATUS_CODE.badRequest,
              { error: error.message }
            )
          );
        }
        return resolve(
          response(
            "Hazard Updated Sucessfully",
            { hazard },
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
  deleteHazardService = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let prisma = dbService.prisma;
        let data = {
          status: false,
          deletedAt: new Date().toISOString(),
        };
        let hazard = await prisma.hazard.update({
          where: payload,
          data,
        });
        if (!hazard) {
          return reject(
            response(
              "Error While Deleting",
              {},
              false,
              STATUS_CODE.badRequest,
              { error: error.message }
            )
          );
        }
        return resolve(
          response(
            "Hazard Deleted Sucessfully",
            { hazard },
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
  listHazard = (payload) => {
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

        let count = await prisma.hazard.count({ where });
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
        let hazard = await prisma.hazard.findMany(params);
        return resolve(
          response(
            "Fetch Hazard",
            {
              hazard,
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
}

const hazardService = new HazardService();
export default hazardService;
