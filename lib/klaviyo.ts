export interface KlaviyoProfile {
  id: string;
  type: string;
  attributes: {
    email: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    created?: string;
  };
}

interface KlaviyoApiResponse {
  data: KlaviyoProfile[];
  links?: {
    next?: string;
  };
}

export async function fetchAllProfiles(): Promise<KlaviyoProfile[]> {
  const API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY;
  const BASE_URL = 'https://a.klaviyo.com/api/profiles?page[size]=100';

  if (!API_KEY) throw new Error('Klaviyo API key is missing');

  let allProfiles: KlaviyoProfile[] = [];
  let nextPageUrl: string | null = BASE_URL;

  while (nextPageUrl) {
    const response: Response = await fetch(nextPageUrl, {
      method: 'GET',
      headers: {
        accept: 'application/vnd.api+json',
        revision: '2024-02-01',
        Authorization: `Klaviyo-API-Key ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profiles: ${response.statusText}`);
    }

    const data: KlaviyoApiResponse = await response.json(); // Now data is properly typed
    allProfiles = [...allProfiles, ...data.data];

    // Check if there's a next page
    nextPageUrl = data.links?.next || null;
  }

  return allProfiles;
}
