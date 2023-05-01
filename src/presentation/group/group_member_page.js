import React, { useState, useEffect } from "react";

const GroupMemberPage = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // DBから取得したメンバー名の一覧を設定してください
    // setMembers(取得したデータ);
  }, []);

  return (
    <div>
      <h1>チームメンバー</h1>
      <ul>
        {members.map((member) => (
            <li key={member.id}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GroupMemberPage;