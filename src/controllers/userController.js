import { STATUS_CODE } from "../config";
import response from "../helpers/response";
import userService from "../service/userService";

class User {
  addUser = async (req, res) => {
    try {
      let payload = req.body;
      userService
        .addUserService(payload)
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
  listUser = async (req, res) => {
    try {
      let payload = req.body;
      userService
        .listUser(payload)
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
  loginUser = async (req, res) => {
    try {
      let payload = req.body;
      userService
        .loginUserService(payload)
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
const userController = new User();
export default userController;
