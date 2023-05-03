import axios from "axios";
import UrlConstant from "../constants/url_constant";

const API_URL = UrlConstant.apiUrl; // ここにAPIのベースURLを設定してください

export async function getUserNickname(email) {
  try {
    const response = await axios.get(API_URL + `getUserNickname`, {
      headers: {
        email: email,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user nickname:", error);
    throw error;
  }
}

export async function insertUserInfo(nickname, email) {
  try {
    const response = await axios.post(API_URL + `insertUserInfo`, {
      nickname: nickname,
      email: email,
    });
    return response.data;
  } catch (error) {
    console.error("Error inserting user info:", error);
    throw error;
  }
}
