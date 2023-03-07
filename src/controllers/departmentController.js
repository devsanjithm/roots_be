import { STATUS_CODE } from "../config";
import response from "../helpers/response";
import departmentService from "../service/departmentService";

class Department {
addDepartment = async (req, res) => {
try {
let payload = req.body;
departmentService.addDepartmentService(payload)
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
getDepartment = async (req, res) => {
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
departmentService.getDepartmentService(payload)
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
updateDepartment = async (req, res) => {
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
departmentService.updateDepartmentService(query, payload)
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
deleteDepartment = async (req, res) => {
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
departmentService.deleteDepartmentService(payload)
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
listDepartment = async (req, res) => {
try {
let payload = req.body;
departmentService.listDepartment(payload)
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
const departmentController = new Department();
export default departmentController;
