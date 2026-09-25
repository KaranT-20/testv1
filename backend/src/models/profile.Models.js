import pool from "../config/db.js";

const getProfilesModel = async () => {
    const q = "SELECT * FROM users"
    const result = await pool.query(q)
    return result.rows
}

const getProfileModel = async (id) => {
    const q = "SELECT * FROM users WHERE id = $1"
    const Data = [id]
    const result = await pool.query(q, Data)
    return result.rows
}

const createProfileModel = async ({ name, email, age, address, phone }) => {
    const q = "INSERT INTO users (name, email, age, address, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *"
    const Data = [name, email, age, address, phone]
    const result = await pool.query(q, Data)
    return result.rows
}


const updateProfileModel = async (id, { name, email, age, address, phone }) => {
    const q = "UPDATE users SET name = $1, email = $2, phone = $3, address = $4, age = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *"
    const Data = [name, email, phone, address, age, id]
    const result = await pool.query(q, Data)
    return result.rows
}
// const deleteProfileModel = async (id) => {
//     const q = "DELETE users where id=$1 Returning* "
//     const Data = [id]
//     const result = await pool.query(q, Data)
//     return result.rows
// }


export {getProfileModel,getProfilesModel,createProfileModel,updateProfileModel}
