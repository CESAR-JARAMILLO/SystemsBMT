export async function addUserToKlaviyo(profile: { 
  email: string; 
  first_name?: string; 
  phone_number?: string | null; 
  marketing_consent: boolean 
}) {
  const API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY;
  if (!API_KEY) throw new Error("Klaviyo API key is missing");

  const url = 'https://a.klaviyo.com/api/profiles';
  const body = JSON.stringify({
    data: {
      type: "profile",
      attributes: {
        email: profile.email,
        phone_number: profile.phone_number || undefined,
        first_name: profile.first_name || undefined,
        properties: {
          marketing_consent: profile.marketing_consent,
          signup_source: "Signup Form",
          // signup_date: new Date().toISOString(),
        },
      },
    },
  });

  console.log("🚀 Sending to Klaviyo:", JSON.stringify(body, null, 2));

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/vnd.api+json',
      revision: '2025-01-15',
      'content-type': 'application/vnd.api+json',
      Authorization: `Klaviyo-API-Key ${API_KEY}`,
    },
    body,
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (!response.ok) {
      console.error("❌ Klaviyo API Error:", JSON.stringify(json, null, 2));
      throw new Error(`Failed to add user to Klaviyo: ${json.detail || response.statusText}`);
    }

    // ✅ Log the entire properties object properly
    if (json.data?.attributes?.properties) {
      console.log("✅ Klaviyo Properties:", JSON.stringify(json.data.attributes.properties, null, 2));
    } else {
      console.log("⚠️ No properties found in Klaviyo response.");
    }

    return json;
  } catch (error) {
    console.error("❌ Error adding user to Klaviyo:", error);
    throw new Error("Failed to add user to Klaviyo.");
  }
}
