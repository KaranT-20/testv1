import { useState } from "react";
import { createProfile, updateProfile } from "../Services/ProfileApi.jsx";

const emptyForm = {
    name: "",
    email: "",
    phone: "",
    address: "",
    age: ""
};

export default function ProfileForm({ editData, onSuccess, onCancel }) {
    const [form, setForm] = useState(editData || emptyForm);
    const [error, setError] = useState("");

    function changeForm(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    async function submitForm(event) {
        event.preventDefault();

        try {
            const payload = { ...form, age: Number(form.age) };

            if (editData) {
                await updateProfile(editData.id, payload);
            } else {
                await createProfile(payload);
            }

            setForm(emptyForm);
            onSuccess();
        } catch {
            setError("Could not save profile");
        }
    }

    return (
        <form onSubmit={submitForm}>
            <h3>{editData ? "Edit Profile" : "New Profile"}</h3>
            <input name="name" placeholder="Name" value={form.name} onChange={changeForm} required />
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={changeForm} required />
            <input name="phone" placeholder="Phone" value={form.phone} onChange={changeForm} required />
            <input name="address" placeholder="Address" value={form.address} onChange={changeForm} required />
            <input name="age" type="number" placeholder="Age" value={form.age} onChange={changeForm} required />
            <button type="submit">{editData ? "Update" : "Create"}</button>
            {editData && <button type="button" onClick={onCancel}>Cancel</button>}
            {error && <p>{error}</p>}
        </form>
    );
}