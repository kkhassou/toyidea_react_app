import React, { useState, useEffect } from "react";
import { insertGroupMemberList } from "../../api/group_member_list_api_client";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const GroupCodeAddPage = () => {
  const [code, setCode] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const handleJoinGroup = () => {
    // コードを使ってチームに参加する処理を実装してください
    // Insert group member list
    if (code != "") {
      insertGroupMemberList(user.uid, "", code, user.email)
        .then((data) => {
          console.log("Group member list data inserted:", data);
        })
        .catch((error) => {
          console.error("Error inserting group member list:", error);
          alert("コードが存在しません");
        });
    } else {
      alert("コードを入力してください");
    }
  };

  return (
    <div>
      <h1>コード追加</h1>
      <p>もらったコードを入力してください:</p>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="コードを入力"
      />
      <button onClick={handleJoinGroup}>チームに参加する</button>
    </div>
  );
};

export default GroupCodeAddPage;
