import { STATUS_CODE } from "../config";
import response from "../helpers/response";
import hazardService from "../service/hazardService";

class Hazard {
  addHazard = async (req, res) => {
    try {
      let payload = req.body;
      hazardService
        .addHazardService(payload)
        .then((result) => {
          return res
            .status(result.code)
            .json(
              response(result.message, result.data, result.status, result.code)
            );
        })
        .catch((error) => {
          return res
            .status(error.code)
            .json(response(error.error, {}, false, error.code, error.error));
        });
    } catch (error) {
      return res
        .status(STATUS_CODE.internalServerError)
        .json(
          response(
            "Unknown error Occurred",
            {},
            false,
            STATUS_CODE.internalServerError,
            { error: error.message }
          )
        );
    }
  };
  getHazard = async (req, res) => {
    try {
      let payload = req.query.query;
      if (!payload) {
        return res
          .status(STATUS_CODE.badRequest)
          .json(
            response(
              "Query Element is requires",
              {},
              false,
              STATUS_CODE.badRequest,
              "Query Element is requires"
            )
          );
      }
      try {
        payload = JSON.parse(payload);
      } catch (error) {
        return res
          .status(STATUS_CODE.badRequest)
          .json(
            response(
              "Error while parsing query",
              {},
              false,
              STATUS_CODE.badRequest,
              error
            )
          );
      }
      hazardService
        .getHazardService(payload)
        .then((result) => {
          return res
            .status(result.code)
            .json(
              response(result.message, result.data, result.status, result.code)
            );
        })
        .catch((error) => {
          return res
            .status(error.code)
            .json(response(error.error, {}, false, error.code, error.error));
        });
    } catch (error) {
      return res
        .status(STATUS_CODE.internalServerError)
        .json(
          response(
            "Unknown error Occurred",
            {},
            false,
            STATUS_CODE.internalServerError,
            { error: error.message }
          )
        );
    }
  };
  updateHazard = async (req, res) => {
    try {
      let query = { id: req.params.id };
      if (!req.params.id) {
        return res
          .status(STATUS_CODE.badRequest)
          .json(
            response(
              "Id is required for update",
              {},
              false,
              STATUS_CODE.badRequest,
              "Id is required for update"
            )
          );
      }
      let payload = req.body;
      hazardService
        .updateHazardService(query, payload)
        .then((result) => {
          return res
            .status(result.code)
            .json(
              response(result.message, result.data, result.status, result.code)
            );
        })
        .catch((error) => {
          return res
            .status(error.code)
            .json(response(error.error, {}, false, error.code, error.error));
        });
    } catch (error) {
      return res
        .status(STATUS_CODE.internalServerError)
        .json(
          response(
            "Unknown error Occurred",
            {},
            false,
            STATUS_CODE.internalServerError,
            { error: error.message }
          )
        );
    }
  };
  deleteHazard = async (req, res) => {
    try {
      let payload = { id: req.params.id };
      if (!req.params.id) {
        return res
          .status(STATUS_CODE.badRequest)
          .json(
            response(
              "Id is required for Delete",
              {},
              false,
              STATUS_CODE.badRequest,
              "Id is required for Delete"
            )
          );
      }
      hazardService
        .deleteHazardService(payload)
        .then((result) => {
          return res
            .status(result.code)
            .json(
              response(result.message, result.data, result.status, result.code)
            );
        })
        .catch((error) => {
          return res
            .status(error.code)
            .json(response(error.error, {}, false, error.code, error.error));
        });
    } catch (error) {
      return res
        .status(STATUS_CODE.internalServerError)
        .json(
          response(
            "Unknown error Occurred",
            {},
            false,
            STATUS_CODE.internalServerError,
            { error: error.message }
          )
        );
    }
  };
  listHazard = async (req, res) => {
    try {
      let payload = req.body;
      hazardService
        .listHazard(payload)
        .then((result) => {
          return res
            .status(result.code)
            .json(
              response(result.message, result.data, result.status, result.code)
            );
        })
        .catch((error) => {
          return res
            .status(error.code)
            .json(response(error.error, {}, false, error.code, error.error));
        });
    } catch (error) {
      return res
        .status(STATUS_CODE.internalServerError)
        .json(
          response(
            "Unknown error Occurred",
            {},
            false,
            STATUS_CODE.internalServerError,
            { error: error.message }
          )
        );
    }
  };
}
const hazardController = new Hazard();
export default hazardController;
