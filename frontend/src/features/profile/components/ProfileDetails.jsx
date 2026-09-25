export default function ProfileDetails({ profile, onEdit, onClose }) {
  if (!profile) return null;

  return (
    <div style={{ border: "1px solid #007bff", borderRadius: "8px", padding: "16px", marginBottom: "16px", background: "#f0f7ff" }}>
      <h3 style={{ marginTop: 0 }}>Selected Profile Details</h3>
      <p><strong>ID:</strong> {profile.id}</p>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
      <p><strong>Address:</strong> {profile.address}</p>
      <p><strong>Age:</strong> {profile.age}</p>
      <button onClick={() => onEdit(profile)}>Edit</button>
      <button onClick={onClose} style={{ marginLeft: "8px" }}>Close</button>
    </div>
  );
}