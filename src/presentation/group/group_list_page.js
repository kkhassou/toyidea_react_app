import React, { useState, useEffect } from "react";
import { getBelongGroupList } from "../../api/group_list_api_client";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const GroupListPage = () => {
  const [groupList, setGroupList] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user.emailVerified) {
        setUser(user);
        getBelongGroupList(user.email)
          .then((data) => {
            setGroupList(data);
            console.log("kake data");
            console.log(data);
          })
          .catch((error) => {
            console.error("Error fetching group list:", error);
          });
      } else {
        setUser(null);
      }
      return unsubscribe;
    });
    // DBから取得したチーム名とチームコードの一覧を設定してください
    // setGroups(取得したデータ);
    // Fetch group list using the user ID
  }, []);

  return (
    <div>
      <h1>チーム一覧</h1>
      <table>
        <thead>
          <tr>
            <th>チーム名</th>
            <th>チームコード</th>
          </tr>
        </thead>
        <tbody>
          {groupList.map((group) => (
            <tr key={group.id}>
              <td>{group.name}</td>
              <button
                onClick={() =>
                  navigate("/group/member", { state: { code: group.code } })
                }
              >
                {group.code}
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupListPage;
