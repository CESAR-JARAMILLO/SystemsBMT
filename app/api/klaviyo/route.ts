import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, firstName, phone } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // ✅ Ensure correct API key and List ID
    const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY;
    const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID;

    if (!KLAVIYO_API_KEY || !KLAVIYO_LIST_ID) {
      console.error("Missing Klaviyo API Key or List ID");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // ✅ Use the latest Klaviyo API for adding a profile to a list
    const response = await fetch(
      `https://a.klaviyo.com/api/lists/${KLAVIYO_LIST_ID}/relationships/profiles/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        },
        body: JSON.stringify({
          data: [
            {
              type: "profile",
              attributes: {
                email: email,
                first_name: firstName || "",
                phone_number: phone || "",
                properties: {
                  source: "Website Signup",
                  joined_at: new Date().toISOString(),
                },
              },
            },
          ],
        }),
      }
    );

    // ✅ Handle response
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Klaviyo API Error:", errorData);
      return NextResponse.json(
        { error: "Failed to subscribe user", details: errorData },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: "Subscription successful" });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
