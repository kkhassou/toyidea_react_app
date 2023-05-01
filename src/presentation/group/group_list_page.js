import React, { useState, useEffect } from "react";
import { getBelongGroupList } from '../../api/group_list_api_client';
import { auth } from '../../firebase';
import { onAuthStateChanged } from "firebase/auth";

const GroupListPage = () => {
  const [groupList, setGroupList] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        //   alert(user.uid)
          // TODO:uidではなく、emailで検索しなくてはいけない
          getBelongGroupList(user.email)
          .then((data) => {
            setGroupList(data);
            console.log("kake data")
            console.log(data)
          })
          .catch((error) => {
            console.error("Error fetching group list:", error);
          });
        return unsubscribe;
        } else {
          setUser(null);
        }
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
              <td>{group.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupListPage;
