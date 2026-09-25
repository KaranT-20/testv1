import {
    getAllUsers,
    getSingleUser,
    createUser as createUserService,
    editUser as editUserService
} from "../services/profile.Services.js"

const getUsers = async (req, res, next) => {
    try {
        const user = await getAllUsers()
        if (!user.length) {
            return res.status(400).json({
                success: false,
                message: "user cannot be fetched"
            })
        }
        return res.status(200).json({
            success: true,
            message: "user fetched",
            user
        })
    } catch (error) {
        next(error)
    }
}
const getUser = async (req, res, next) => {
    try {
        const user = await getSingleUser(req.params.id)
        if (!user.length) {
            return res.status(400).json({
                success: false,
                message: "particular user cannot be fetched"
            })
        }
        return res.status(200).json({
            success: true,
            message: "particular user fetched",
            user
        })
    } catch (error) {
        next(error)
    }
}

const createUser = async (req, res, next) => {
    try {
        const user = await createUserService(
            req.ValidatedData
        )
        if (!user.length) {
            return res.status(400).json({
                success: false,
                message: "user cannot be created"
            })
        }
        return res.status(201).json({
            success: true,
            message: "user created",
            user
        })
    } catch (error) {
        next(error)
    }
}
const editUser = async (req, res, next) => {
    try {
        const user = await editUserService(
            req.params.id ,
            req.ValidatedData
        )
        if (!user.length) {
            return res.status(404).json({
                success: false,
                message: "user cannot be updated"
            })
        }
        return res.status(200).json({
            success: true,
            message: "user updated",
            user
        })
    } catch (error) {
        next(error)
    }
}

export {
    getUsers,
    getUser,
    editUser,
    createUser
}

