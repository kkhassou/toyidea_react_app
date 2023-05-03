import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getGroupMemberList,
  insertGroupMemberList,
} from "../../api/group_member_list_api_client";

const GroupMemberPage = () => {
  const location = useLocation();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // DBから取得したメンバー名の一覧を設定してください
    // setMembers(取得したデータ);
    const code = location.state.code;
    //   alert("code:" + code)
    getGroupMemberList(code)
      .then((data) => {
        console.log("Group member list data:", data);
        setMembers(data);
        // alert(data)
      })
      .catch((error) => {
        console.error("Error fetching group member list:", error);
      });
  }, []);

  return (
    <div>
      <h1>チームメンバー</h1>
      <ul>
        {members.map((member) => (
          <li key={member.id}>{member.app_user.nickname}</li>
        ))}
      </ul>
    </div>
  );
};

export default GroupMemberPage;
