import { STATUS_CODE } from "../config";
import response from "../helpers/response";
import categoryService from "../service/categoryService";

class Category {
addCategory = async (req, res) => {
try {
let payload = req.body;
categoryService.addCategoryService(payload)
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
getCategory = async (req, res) => {
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
categoryService.getCategoryService(payload)
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
updateCategory = async (req, res) => {
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
categoryService.updateCategoryService(query, payload)
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
deleteCategory = async (req, res) => {
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
categoryService.deleteCategoryService(payload)
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
listCategory = async (req, res) => {
try {
let payload = req.body;
categoryService.listCategory(payload)
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
const categoryController = new Category();
export default categoryController;
