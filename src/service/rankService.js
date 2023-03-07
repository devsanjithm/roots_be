import { STATUS_CODE } from "../config";
import response from "../helpers/response";
import dbService from "../database";

class RankService {
  addRankService = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let prisma = dbService.prisma;
        let rank = await prisma.rank.create({ data: payload });
        if (rank.count <= 0) {
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
            "Rank Added Sucessfully",
            { rank },
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
  getRankService = (payload) => {
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
        let rank = await prisma.rank.findMany(params);
        if (!rank) {
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
            "Rank Retrived Sucessfully",
            { rank },
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
  updateRankService = (query, payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let prisma = dbService.prisma;
        let rank = await prisma.rank.update({
          where: query,
          data: payload,
        });
        if (rank.count <= 0) {
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
            "Rank Updated Sucessfully",
            { rank },
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
  deleteRankService = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let prisma = dbService.prisma;
        let data = {
          status: false,
          deletedAt: new Date().toISOString(),
        };
        let rank = await prisma.rank.update({
          where: payload,
          data,
        });
        if (!rank) {
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
            "Rank Deleted Sucessfully",
            { rank },
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
  listRank = (payload) => {
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

        let count = await prisma.rank.count({ where });
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
        let rank = await prisma.rank.findMany(params);
        return resolve(
          response(
            "Fetch Rank",
            {
              rank,
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

const rankService = new RankService();
export default rankService;
