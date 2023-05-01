import axios from "axios";
import UrlConstant from "../constants/url_constant"

const API_URL = UrlConstant.apiUrl; // ここにAPIのベースURLを設定してください

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export async function getBelongGroupList(email) {
  try {
    const response = await instance.get(API_URL + `belongGroupList`, {   
      headers: {
        email: email,
      },
    });
    return response.data;
  } catch (error) {
    // console.error("Error fetching belong group list:", error);
    console.error("Error fetching belong group list:", error, error.config, error.request);
    throw error;
  }
}

export async function insertGroupList(userId, name, code) {
  try {
    const response = await axios.post(`${API_URL}/groupListInput`, {
      userId: userId,
      name: name,
      code: code,
    });
    return response.data;
  } catch (error) {
    console.error("Error inserting group list:", error);
    throw error;
  }
}
