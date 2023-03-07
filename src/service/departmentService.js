import { STATUS_CODE } from "../config";
import response from "../helpers/response";
import dbService from "../database";

class DepartmentService {
addDepartmentService = (payload) => {
return new Promise(async (resolve, reject) => {
try {
let prisma = dbService.prisma;
let department = await prisma.department.create({ data: payload });
if (department.count <= 0) {
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
"Department Added Sucessfully",
{ department },
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
getDepartmentService = (payload) => {
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
let department = await prisma.department.findMany(params);
if (!department) {
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
"Department Retrived Sucessfully",
{ department },
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
updateDepartmentService = (query, payload) => {
return new Promise(async (resolve, reject) => {
try {
let prisma = dbService.prisma;
let department = await prisma.department.update({
where: query,
data: payload,
});
if (department.count <= 0) {
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
"Department Updated Sucessfully",
{ department },
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
deleteDepartmentService = (payload) => {
return new Promise(async (resolve, reject) => {
try {
let prisma = dbService.prisma;
let data = {
status: false,
deletedAt: new Date().toISOString(),
};
let department = await prisma.department.update({
where: payload,
data,
});
if (!department) {
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
"Department Deleted Sucessfully",
{ department },
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
listDepartment = (payload) => {
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

let count = await prisma.department.count({ where });
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
let department = await prisma.department.findMany(params);
return resolve(
response(
"Fetch Department",
{
department,
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

const departmentService = new DepartmentService();
export default departmentService;
