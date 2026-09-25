const ProfileCard = ({ profile, onSelect }) => {
    return (
        <button type="button" className="profile-card" onClick={() => onSelect(profile)}>
            <h2>{profile.name}</h2>
            <p>{profile.id}</p>
            <p>{profile.email}</p>
        </button>
    );
}

export default ProfileCard