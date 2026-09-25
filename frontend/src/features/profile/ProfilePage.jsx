import { useState, useEffect } from "react";
import { getAllProfiles } from "./Services/ProfileApi.jsx";
import ProfileSearch from "./components/ProfileSearch";
import ProfileDetails from "./components/ProfileDetails";
import ProfileForm from "./components/ProfileForm";
import ProfileCard from "./components/ProfileCard";

export default function ProfilePage() {
    const [profiles, setProfiles] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        getAllProfiles()
            .then((res) => setProfiles(res.data.user || []))
            .catch((err) => console.error("Failed to load profiles:", err));
    }, []);

    const handleSuccess = () => {
        setSelectedUser(null);
        setEditingUser(null);
        getAllProfiles()
            .then((res) => setProfiles(res.data.user || []))
            .catch((err) => console.error("Failed to load profiles:", err));
    };

    return (
        <div style={{ maxWidth: "800px", margin: "24px auto", padding: "0 16px", fontFamily: "sans-serif" }}>
            <h2>Profile Management System</h2>

            <ProfileSearch onFound={setSelectedUser} />

            <ProfileDetails
                profile={selectedUser}
                onEdit={(user) => setEditingUser(user)}
                onClose={() => setSelectedUser(null)}
            />

            <ProfileForm
                key={editingUser?.id || "new"}
                editData={editingUser}
                onSuccess={handleSuccess}
                onCancel={() => setEditingUser(null)}
            />

            <hr style={{ margin: "24px 0" }} />

            <h3>All Profiles (Click to View)</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
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