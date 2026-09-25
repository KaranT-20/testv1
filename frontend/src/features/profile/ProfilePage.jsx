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
        <div className="page">
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