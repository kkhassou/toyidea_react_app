import axios from "axios";
import UrlConstant from "../constants/url_constant";

const API_URL = UrlConstant.apiUrl;

export const get_comment_list = async (id) => {
  try {
    const response = await axios.get(API_URL + "get_comment_list", {
      headers: {
        sru_id: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const insert_comment = async ({ id, comment, email }) => {
  try {
    const response = await axios.post(API_URL + `insert_comment`, {
      id: id,
      comment: comment,
      email: email,
    });
    return response.data;
  } catch (error) {
    console.error("Error while insert_comment:", error);
    throw error;
  }
};
