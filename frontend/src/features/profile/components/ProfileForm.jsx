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

    function changeForm(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    async function submitForm(event) {
        event.preventDefault();

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
        <form className="profile-form" onSubmit={submitForm}>
            <h3>{editData ? "Edit Profile" : "New Profile"}</h3>
            <div className="fields">
                <input name="name" placeholder="Name" value={form.name} onChange={changeForm} required />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={changeForm} required />
                <input name="phone" placeholder="Phone" value={form.phone} onChange={changeForm} required />
                <input name="address" placeholder="Address" value={form.address} onChange={changeForm} required />
                <input name="age" type="number" placeholder="Age" value={form.age} onChange={changeForm} required />
            </div>
            <div className="form-actions">
                <button type="submit">{editData ? "Update" : "Create"}</button>
                {editData && <button type="button" onClick={onDismiss}>Cancel</button>}
            </div>
            {error && <p className="error-text">{error}</p>}
        </form>
    );
}
