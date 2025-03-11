export async function addUserToKlaviyo(profile: { 
  email: string; 
  first_name?: string; 
  phone_number?: string | null; 
  marketing_consent: boolean 
}) {
  const API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY;
  if (!API_KEY) {
    console.error("❌ Missing KLAVIYO_PRIVATE_API_KEY in production!");
    throw new Error("Klaviyo API key is missing.");
  }

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
      // ✅ Handle case where user already exists in Klaviyo
      if (json.errors && json.errors[0]?.code === "already_exists") {
        console.warn("⚠️ User already exists in Klaviyo:", profile.email);
        return json;
      }

      console.error("❌ Klaviyo API Error:", JSON.stringify(json, null, 2));
      throw new Error(`Failed to add user to Klaviyo: ${json.detail || response.statusText}`);
    }

    // ✅ Confirm success and log returned profile data
    console.log("✅ Successfully added profile to Klaviyo:", {
      email: json.data?.attributes?.email,
      phone_number: json.data?.attributes?.phone_number,
      first_name: json.data?.attributes?.first_name,
      properties: json.data?.attributes?.properties,
    });

    return json;
  } catch (error) {
    console.error("❌ Error adding user to Klaviyo:", error);
    throw new Error("Failed to add user to Klaviyo.");
  }
}

export async function subscribeProfilesToKlaviyoList(profile: { email: string }) {
  const API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY;
  const LIST_ID = process.env.KLAVIYO_LIST_ID;

  if (!API_KEY) throw new Error("Klaviyo API key is missing.");
  if (!LIST_ID) throw new Error("Klaviyo List ID is missing.");

  const body = JSON.stringify({
    data: {
      type: "profile-subscription-bulk-create-job",
      attributes: {
        profiles: {
          data: [
            {
              type: "profile",
              attributes: {
                email: profile.email,
                subscriptions: {
                  email: { marketing: { consent: "SUBSCRIBED" } },
                },
              },
            },
          ],
        },
        historical_import: false,
      },
      relationships: {
        list: { data: { type: "list", id: LIST_ID } },
      },
    },
  });

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
    const response = await fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs', options);

    const text = await response.text();
    
    // ✅ Handle cases where Klaviyo returns an empty response
    if (!text) {
      console.log("✅ Klaviyo request successful but returned an empty response (Double Opt-In likely enabled).");
      return { success: true, message: "User invited to confirm subscription via email." };
    }

    const json = JSON.parse(text);

    if (!response.ok) {
      throw new Error(`Failed to add user to Klaviyo: ${JSON.stringify(json)}`);
    }

    console.log("✅ Successfully added to Klaviyo List!");
    return json;
  } catch (error) {
    console.error("❌ Error subscribing profile to Klaviyo:", error);
    throw new Error("Failed to process Klaviyo subscription.");
  }
}
