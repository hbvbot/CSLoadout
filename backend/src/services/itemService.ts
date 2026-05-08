const CSGO_API_URL = 'https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json';
import { supabaseAdmin } from "../config/postgres";

export async function fetchItemsFromApi() {
  try {
    const response = await fetch(CSGO_API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }

    const data = await response.json();
    return data;
  }

  catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
}

export async function fetchItemsFromDb() {
  return supabaseAdmin
    .from("items")
    .select("*");
}