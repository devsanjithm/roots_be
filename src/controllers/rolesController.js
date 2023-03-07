import { STATUS_CODE } from "../config";
import response from "../helpers/response";
import rolesService from "../service/rolesService";

class Roles {
addRoles = async (req, res) => {
try {
let payload = req.body;
rolesService.addRolesService(payload)
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
getRoles = async (req, res) => {
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
rolesService.getRolesService(payload)
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
updateRoles = async (req, res) => {
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
rolesService.updateRolesService(query, payload)
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
deleteRoles = async (req, res) => {
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
rolesService.deleteRolesService(payload)
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
listRoles = async (req, res) => {
try {
let payload = req.body;
rolesService.listRoles(payload)
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
const rolesController = new Roles();
export default rolesController;
