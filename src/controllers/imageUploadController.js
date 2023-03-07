import { STATUS_CODE } from "../config";
import { v4 as uuidv4 } from "uuid";
import response from "../helpers/response";
import { s3CreateObject } from "../helpers/imageUpload";
export default async function imageUpload(req, res) {
  try {
    let results;
    if (req.files.length > 0) {
      results = await s3CreateObject(req.files, `${uuidv4()}`);
      return res
        .status(STATUS_CODE.success)
        .json(
          response(
            "success",
            { imageURL: results },
            true,
            STATUS_CODE.success,
            {}
          )
        );
    }

    return res.status(STATUS_CODE.badRequest).json(
      response("Image must be presenr", {}, false, STATUS_CODE.badRequest, {
        error: "Image need to be selected",
      })
    );
  } catch (error) {
    return res
      .status(STATUS_CODE.internalServerError)
      .json(
        response(
          "Error in Image Uploaad",
          {},
          false,
          STATUS_CODE.internalServerError,
          error
        )
      );
  }
}
