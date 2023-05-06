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
export async function getSkyRainUmbrellaThemeDistinctList() {
  try {
    const response = await axios.get(
      API_URL + `skyRainUmbrellaThemeDistinctList`,
      {}
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching SkyRainUmbrella list:", error);
    throw error;
  }
}

export async function insertSkyRainUmbrella(theme, sky, rain, umbrella) {
  try {
    const response = await axios.post(API_URL + `skyRainUmbrellaInput`, {
      theme: theme,
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

export async function insertSkyRainUmbrellaTheme(theme) {
  try {
    const response = await axios.post(API_URL + `skyRainUmbrellaInput`, {
      theme: theme,
    });
    return response.data;
  } catch (error) {
    console.error("Error inserting SkyRainUmbrella data:", error);
    throw error;
  }
}
