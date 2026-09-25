import { useState, useEffect } from "react";
import { getAllProfiles } from "./Services/ProfileApi.jsx";
import ProfileSearch from "./components/ProfileSearch";
import ProfileDetails from "./components/ProfileDetails";
import ProfileForm from "./components/ProfileForm";
import ProfileCard from "./components/ProfileCard";
import "../../App.css";

export default function ProfilePage() {
    const [profiles, setProfiles] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editingUser, setEditingUser] = useState(null);

    const loadProfiles = async () => {
        try {
            const res = await getAllProfiles();
            setProfiles(res.data.user || []);
        } catch (err) {
            console.error("Failed to load profiles:", err);
        }
    };

    useEffect(() => {
        loadProfiles();
    }, []);

    const handleSave = async () => {
        setSelectedUser(null);
        setEditingUser(null);
        await loadProfiles();
    };

    return (
        <div className="page">
            <h2>Profile Management System</h2>

            <ProfileSearch onResult={setSelectedUser} />

            <ProfileDetails
                profile={selectedUser}
                onEdit={(user) => setEditingUser(user)}
                onClose={() => setSelectedUser(null)}
            />

            <ProfileForm
                key={editingUser?.id || "new"}
                editData={editingUser}
                onSave={handleSave}
                onDismiss={() => setEditingUser(null)}
            />

            <hr />

            <h3>All Profiles (Click to View)</h3>
            <div className="card-grid">
                {profiles.map((user) => (
                    <ProfileCard
                        key={user.id}
                        profile={user}
                        onSelect={(item) => setSelectedUser(item)}
                    />
                ))}
            </div>
        </div>
    );
}
