import axios from "axios";
import UrlConstant from "../constants/url_constant";

const API_URL = UrlConstant.apiUrl; // ここにAPIのベースURLを設定してください

export async function getSkyRainUmbrellaList(theme) {
  try {
    const response = await axios.get(API_URL + `skyRainUmbrellaList`, {
      headers: {
        theme: encodeURIComponent(theme),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching SkyRainUmbrella list:", error);
    throw error;
  }
}
export async function getSkyRainUmbrellaThemeDistinctList(email) {
  try {
    const response = await axios.get(
      API_URL + `skyRainUmbrellaThemeDistinctList`,
      {
        headers: {
          email: email,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching SkyRainUmbrella list:", error);
    throw error;
  }
}

export async function insertSkyRainUmbrella(
  email,
  theme,
  trigger,
  sky,
  rain,
  umbrella
) {
  try {
    const response = await axios.post(API_URL + `skyRainUmbrellaInput`, {
      email: email,
      theme: theme,
      trigger: trigger,
      sky: sky,
      rain: rain,
      umbrella: umbrella,
    });
    return response.data;
  } catch (error) {
    console.error("Error inserting SkyRainUmbrella data:", error);
    throw error;
  }
}

export async function insertSkyRainUmbrellaTheme(theme, email) {
  try {
    const response = await axios.post(API_URL + `skyRainUmbrellaInput`, {
      theme: theme,
      email: email,
    });
    return response.data;
  } catch (error) {
    console.error("Error inserting SkyRainUmbrella data:", error);
    throw error;
  }
}
