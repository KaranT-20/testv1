
import { getProfileModel,getProfilesModel,createProfileModel,updateProfileModel } from "../models/profile.Models.js";

const getAllUsers = () => getProfilesModel()
const getSingleUser = (id) => getProfileModel(id)
const createUser = (Data) => createProfileModel(Data)
const editUser = (id,Data) => updateProfileModel(id,Data)

export {
    getAllUsers,
    getSingleUser,
    createUser,
    editUser
}