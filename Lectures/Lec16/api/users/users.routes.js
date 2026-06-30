const { Router } = require("express")
const { getUsers, getUserById, createUser, deleteUser, updateUser } = require("./users.service")
const isAdminMiddleware = require("../../middlewares/isAdmin.middleware")

const usersRouter = Router()

usersRouter.get("/",isAdminMiddleware,getUsers)
usersRouter.get("/:id", getUserById)
usersRouter.post("/", createUser)
usersRouter.delete("/:id", deleteUser)
usersRouter.put("/:id", updateUser)

module.exports = usersRouter
