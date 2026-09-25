import { useState } from "react";
import { createProfile, updateProfile } from "../Services/ProfileApi.jsx";

const emptyForm = {
    name: "",
    email: "",
    phone: "",
    address: "",
    age: "",
};

export default function ProfileForm({ editData, onSave, onDismiss }) {
    const [form, setForm] = useState(editData || emptyForm);
    const [error, setError] = useState("");

    function changeForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function submitForm(e) {
        e.preventDefault();
        try {
            const profileData = { ...form, age: Number(form.age) };
            if (editData) {
                await updateProfile(editData.id, profileData);
            } else {
                await createProfile(profileData);
            }
            setForm(emptyForm);
            onSave();
        } catch {
            setError("Could not save profile");
        }
    }

    return (
        <form onSubmit={submitForm} style={{ marginBottom: "24px" }}>
            <h3>{editData ? "Edit Profile" : "New Profile"}</h3>
            <br />
            <input name="name" placeholder="Name" value={form.name} onChange={changeForm} required /><br />
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={changeForm} required /><br />
            <input name="phone" placeholder="Phone" value={form.phone} onChange={changeForm} required /><br />
            <input name="address" placeholder="Address" value={form.address} onChange={changeForm} required /><br />
            <input name="age" type="number" placeholder="Age" value={form.age} onChange={changeForm} required /><br />
            <br />
            <button type="submit">{editData ? "Update" : "Create"}</button>
            {editData && <button type="button" onClick={onDismiss} style={{ marginLeft: "8px" }}>Cancel</button>}
            {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
        </form>
    );
}
