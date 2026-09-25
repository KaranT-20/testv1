import { useState } from "react";
import { getProfileById } from "../Services/ProfileApi.jsx";

export default function ProfileSearch({ onFound }) {
    const [id, setId] = useState("");
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!id.trim()) return;

        try {
            setError("");
            const result = await getProfileById(id);
            onFound(result.data.user?.[0] || null);
        } catch {
            setError("Profile not found");
            onFound(null);
        }
    };

    return (
        <div className="search-section">
            <h3>Find Profile</h3>
            <input
                placeholder="Profile ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <button onClick={handleSearch}>Find</button>
            {error && <p className="error-text">{error}</p>}
        </div>
    );
}