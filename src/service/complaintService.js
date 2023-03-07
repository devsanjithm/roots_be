import { STATUS_CODE } from "../config";
import response from "../helpers/response";
import dbService from "../database";

class ComplaintService {
  addComplaintService = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let prisma = dbService.prisma;
        let complaint = await prisma.complaint.create({ data: payload });
        if (complaint.count <= 0) {
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
            "Complaint Added Sucessfully",
            { complaint },
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
  getComplaintService = (payload) => {
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
        let complaint = await prisma.complaint.findMany(params);
        if (!complaint) {
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
            "Complaint Retrived Sucessfully",
            { complaint },
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
  updateComplaintService = (query, payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let prisma = dbService.prisma;
        let complaint = await prisma.complaint.update({
          where: query,
          data: payload,
        });
        if (complaint.count <= 0) {
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
            "Complaint Updated Sucessfully",
            { complaint },
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
  deleteComplaintService = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let prisma = dbService.prisma;
        let data = {
          status: false,
          deletedAt: new Date().toISOString(),
        };
        let complaint = await prisma.complaint.update({
          where: payload,
          data,
        });
        if (!complaint) {
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
            "Complaint Deleted Sucessfully",
            { complaint },
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
  listComplaint = (payload) => {
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

        let count = await prisma.complaint.count({ where });
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
        let complaint = await prisma.complaint.findMany(params);
        return resolve(
          response(
            "Fetch Complaint",
            {
              complaint,
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

const complaintService = new ComplaintService();
export default complaintService;
