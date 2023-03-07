import { STATUS_CODE } from "../config";
import response from "../helpers/response";
import dbService from "../database";

class UserRolesService {
addUserRolesService = (payload) => {
return new Promise(async (resolve, reject) => {
try {
let prisma = dbService.prisma;
let userRoles = await prisma.userRoles.create({ data: payload });
if (userRoles.count <= 0) {
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
"UserRoles Added Sucessfully",
{ userRoles },
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
getUserRolesService = (payload) => {
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
let userRoles = await prisma.userRoles.findMany(params);
if (!userRoles) {
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
"UserRoles Retrived Sucessfully",
{ userRoles },
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
updateUserRolesService = (query, payload) => {
return new Promise(async (resolve, reject) => {
try {
let prisma = dbService.prisma;
let userRoles = await prisma.userRoles.update({
where: query,
data: payload,
});
if (userRoles.count <= 0) {
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
"UserRoles Updated Sucessfully",
{ userRoles },
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
deleteUserRolesService = (payload) => {
return new Promise(async (resolve, reject) => {
try {
let prisma = dbService.prisma;
let data = {
status: false,
deletedAt: new Date().toISOString(),
};
let userRoles = await prisma.userRoles.update({
where: payload,
data,
});
if (!userRoles) {
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
"UserRoles Deleted Sucessfully",
{ userRoles },
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
listUserRoles = (payload) => {
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

let count = await prisma.userRoles.count({ where });
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
let userRoles = await prisma.userRoles.findMany(params);
return resolve(
response(
"Fetch UserRoles",
{
userRoles,
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

const userRolesService = new UserRolesService();
export default userRolesService;
