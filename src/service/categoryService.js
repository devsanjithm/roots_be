import { STATUS_CODE } from "../config";
import response from "../helpers/response";
import dbService from "../database";

class CategoryService {
addCategoryService = (payload) => {
return new Promise(async (resolve, reject) => {
try {
let prisma = dbService.prisma;
let category = await prisma.category.create({ data: payload });
if (category.count <= 0) {
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
"Category Added Sucessfully",
{ category },
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
getCategoryService = (payload) => {
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
let category = await prisma.category.findMany(params);
if (!category) {
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
"Category Retrived Sucessfully",
{ category },
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
updateCategoryService = (query, payload) => {
return new Promise(async (resolve, reject) => {
try {
let prisma = dbService.prisma;
let category = await prisma.category.update({
where: query,
data: payload,
});
if (category.count <= 0) {
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
"Category Updated Sucessfully",
{ category },
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
deleteCategoryService = (payload) => {
return new Promise(async (resolve, reject) => {
try {
let prisma = dbService.prisma;
let data = {
status: false,
deletedAt: new Date().toISOString(),
};
let category = await prisma.category.update({
where: payload,
data,
});
if (!category) {
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
"Category Deleted Sucessfully",
{ category },
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
listCategory = (payload) => {
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

let count = await prisma.category.count({ where });
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
let category = await prisma.category.findMany(params);
return resolve(
response(
"Fetch Category",
{
category,
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

const categoryService = new CategoryService();
export default categoryService;
