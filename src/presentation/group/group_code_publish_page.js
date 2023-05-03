import { insertGroupList } from "../../api/group_list_api_client";
import { insertGroupMemberList } from "../../api/group_member_list_api_client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";

const GroupCodePublishPage = () => {
  const [groupName, setGroupName] = useState("");
  const [groupCode, setGroupCode] = useState("");
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

  const handlePublishCode = async () => {
    // グループ名を使ってコードを発行する処理を実装してください
    try {
      // グループ名を使ってコードを発行する処理を実装してください
      // TODO:dummyUserIdとdummyCodeを実装流う
      const length = 10; // 生成する文字列の長さ
      const characters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // 使用する文字列の候補
      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      const response = await insertGroupList(
        user.uid,
        groupName,
        result,
        user.email
      );
      // 同時に、グループへ自分を登録する必要がある。
      insertGroupMemberList(user.uid, "", result, user.email)
        .then((data) => {
          console.log("Group member list data inserted:", data);
        })
        .catch((error) => {
          console.error("Error inserting group member list:", error);
          alert("コードが存在しません");
        });
      console.log(response);
      alert("グループコードを発行しました。");
    } catch (error) {
      console.error("Error publishing group code:", error);
      alert("グループコードの発行に失敗しました。");
    }
  };

  return (
    <div>
      <h1>コード発行</h1>
      <p>グループ名を入力してください:</p>
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="グループ名を入力"
      />
      <p>コードを発行します:</p>
      <button onClick={handlePublishCode}>発行する</button>
    </div>
  );
};

export default GroupCodePublishPage;
