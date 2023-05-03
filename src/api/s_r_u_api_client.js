import axios from "axios";
import UrlConstant from "../constants/url_constant";

const API_URL = UrlConstant.apiUrl; // ここにAPIのベースURLを設定してください

export async function getSkyRainUmbrellaList(userId) {
  try {
    const response = await axios.get(API_URL + `skyRainUmbrellaList`, {
      headers: {
        userid: userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching SkyRainUmbrella list:", error);
    throw error;
  }
}

export async function insertSkyRainUmbrella(
  userId,
  trigger,
  sky,
  rain,
  umbrella
) {
  try {
    const response = await axios.post(API_URL + `skyRainUmbrellaInput`, {
      userId: userId,
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
