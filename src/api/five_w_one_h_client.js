import axios from "axios";
import UrlConstant from "../constants/url_constant";

const API_URL = UrlConstant.apiUrl;

export const get_five_w_one_h = async () => {
  try {
    const response = await axios.get(API_URL + "get_five_w_one_h");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const insert_five_w_one_h = async ({
  userid,
  groupid,
  email,
  who,
  where,
  when,
  why,
  what,
  how,
}) => {
  try {
    const response = await axios.post(API_URL + `insert_five_w_one_h`, {
      userid: userid,
      groupid: groupid,
      email: email,
      who_st: who,
      where_st: where,
      when_st: when,
      why_st: why,
      what_st: what,
      how_st: how,
    });
    return response.data;
  } catch (error) {
    console.error("Error while inserting Five W One H data:", error);
    throw error;
  }
};
