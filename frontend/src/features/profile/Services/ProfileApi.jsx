import { api } from "../../../services/api";

const getAllProfiles = () => api.get("/")

const getProfileById = (id) => api.get(`/${id}`)

const createProfile = (data) => api.post("/",data)

const updateProfile = (id, data) => api.put(`/${id}`, data)

export {
    getAllProfiles,
    getProfileById,
    createProfile,
    updateProfile
}