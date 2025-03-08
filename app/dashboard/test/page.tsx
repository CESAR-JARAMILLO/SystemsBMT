// app/profiles/page.tsx (Server Component)
import { fetchAllProfiles } from "@/lib/klaviyo";

export default async function ProfilesPage() {
  const profiles = await fetchAllProfiles();

  return (
    <div>
      <h1 className="text-xl font-bold">Klaviyo Profiles</h1>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            {profile.attributes.email} - {profile.attributes.first_name}{" "}
            {profile.attributes.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
