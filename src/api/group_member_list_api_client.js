import axios from "axios";
import UrlConstant from "../constants/url_constant"

const API_URL = UrlConstant.apiUrl; // ここにAPIのベースURLを設定してください

export async function getGroupMemberList(email) {
  try {
    const response = await axios.get(`${API_URL}/getGroupMemberList`, {
      headers: {
        email: email,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching group member list:", error);
    throw error;
  }
}

export async function insertGroupMemberList(userId, userName, code, email) {
  try {
    const response = await axios.post(`${API_URL}/groupMemberListInput`, {
      userId: userId,
      userName: userName,
      code: code,
      email: email,
    });
    alert(response)
    console.error("response:", response);
    return response.data;
  } catch (error) {
    console.error("Error inserting group member list:", error);
    throw error;
  }
}
