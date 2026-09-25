export default function ProfileDetails({ profile, onEdit, onClose }) {
  if (!profile) return null;

  return (
    <div className="details-panel">
      <h3>Selected Profile Details</h3>
      <p><strong>ID:</strong> {profile.id}</p>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
      <p><strong>Address:</strong> {profile.address}</p>
      <p><strong>Age:</strong> {profile.age}</p>
      <div className="actions">
        <button onClick={() => onEdit(profile)}>Edit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}