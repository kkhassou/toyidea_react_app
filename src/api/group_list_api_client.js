import axios from "axios";
import UrlConstant from "../constants/url_constant";

const API_URL = UrlConstant.apiUrl; // ここにAPIのベースURLを設定してください

export async function getBelongGroupList(email) {
  try {
    const response = await axios.get(API_URL + `belongGroupList`, {
      headers: {
        email: email,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching belong group list:",
      error,
      error.config,
      error.request
    );
    throw error;
  }
}

export async function insertGroupList(userId, name, code, email) {
  try {
    const response = await axios.post(API_URL + "groupListInput", {
      userId: userId,
      name: name,
      code: code,
      email: email,
    });
    return response.data;
  } catch (error) {
    console.error("Error inserting group list:", error);
    throw error;
  }
}
