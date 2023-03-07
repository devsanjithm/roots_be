import { STATUS_CODE } from "../config";
import response from "../helpers/response";
import dbService from "../database";

class RolesService {
addRolesService = (payload) => {
return new Promise(async (resolve, reject) => {
try {
let prisma = dbService.prisma;
let roles = await prisma.roles.create({ data: payload });
if (roles.count <= 0) {
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
"Roles Added Sucessfully",
{ roles },
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
getRolesService = (payload) => {
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
let roles = await prisma.roles.findMany(params);
if (!roles) {
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
"Roles Retrived Sucessfully",
{ roles },
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
updateRolesService = (query, payload) => {
return new Promise(async (resolve, reject) => {
try {
let prisma = dbService.prisma;
let roles = await prisma.roles.update({
where: query,
data: payload,
});
if (roles.count <= 0) {
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
"Roles Updated Sucessfully",
{ roles },
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
deleteRolesService = (payload) => {
return new Promise(async (resolve, reject) => {
try {
let prisma = dbService.prisma;
let data = {
status: false,
deletedAt: new Date().toISOString(),
};
let roles = await prisma.roles.update({
where: payload,
data,
});
if (!roles) {
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
"Roles Deleted Sucessfully",
{ roles },
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
listRoles = (payload) => {
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

let count = await prisma.roles.count({ where });
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
let roles = await prisma.roles.findMany(params);
return resolve(
response(
"Fetch Roles",
{
roles,
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

const rolesService = new RolesService();
export default rolesService;
