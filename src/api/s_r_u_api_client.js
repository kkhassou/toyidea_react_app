import axios from "axios";
import UrlConstant from "../constants/url_constant";

const API_URL = UrlConstant.apiUrl; // ここにAPIのベースURLを設定してください

export async function getSkyRainUmbrellaList(
  // userId
  email
) {
  try {
    const response = await axios.get(API_URL + `skyRainUmbrellaList`, {
      headers: {
        // userid: userId,
        email: email,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching SkyRainUmbrella list:", error);
    throw error;
  }
}

export async function insertSkyRainUmbrella(
  // userId,
  // email,
  trigger,
  sky,
  rain,
  umbrella
) {
  try {
    const response = await axios.post(API_URL + `skyRainUmbrellaInput`, {
      // userId: userId,
      // email: email,
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
