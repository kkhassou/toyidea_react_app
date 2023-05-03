import React, { useState, useEffect } from "react";
import { getSkyRainUmbrellaList } from "../../../api/s_r_u_api_client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { Select, MenuItem, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";

const SimpleListPage = () => {
  const [list, setList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getSkyRainUmbrellaList(
          "ec69W4CxTagT47m2qKTLy0HFG3p2"
          // user.uid
        )
          .then((data) => {
            setList(data);
            setFilteredData(data);
          })
          .catch((error) => {
            console.error("Error fetching sky rain umbrella list:", error);
          });
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);

    if (newFilter === "all") {
      setFilteredData(list);
    } else {
      //   setFilteredData(list.filter((item) => item[newFilter] !== ""));
      setFilteredData(
        list.map((item) => {
          const newItem = { ...item };
          for (const key in newItem) {
            if (key !== "id" && key !== newFilter) {
              newItem[key] = "";
            }
          }
          return newItem;
        })
      );
    }
  };

  const handleReconsider = (id) => {
    // 再考するボタンが押された時の処理を記述
  };

  return (
    <div>
      <h1>起空雨傘一覧</h1>
      <Typography variant="h6">項目フィルタ:</Typography>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={filter}
          onChange={handleFilterChange}
          variant="outlined"
          style={{ fontSize: "20px", height: "40px" }}
        >
          <MenuItem
            value="all"
            style={{
              fontSize: "20px",
            }}
          >
            全て
          </MenuItem>
          <MenuItem
            value="trigger"
            style={{
              fontSize: "20px",
            }}
          >
            起のみ
          </MenuItem>
          <MenuItem
            value="sky"
            style={{
              fontSize: "20px",
            }}
          >
            空のみ
          </MenuItem>
          <MenuItem
            value="rain"
            style={{
              fontSize: "20px",
            }}
          >
            雨のみ
          </MenuItem>
          <MenuItem
            value="umbrella"
            style={{
              fontSize: "20px",
            }}
          >
            傘のみ
          </MenuItem>
        </Select>
      </FormControl>
      <div>
        {filteredData.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid black",
              padding: "10px",
              margin: "10px",
            }}
          >
            {filter === "all" || filter === "trigger" ? (
              <p>起：{item.trigger}</p>
            ) : null}
            {filter === "all" || filter === "sky" ? (
              <p>空：{item.sky}</p>
            ) : null}
            {filter === "all" || filter === "rain" ? (
              <p>雨：{item.rain}</p>
            ) : null}
            {filter === "all" || filter === "umbrella" ? (
              <p>傘：{item.umbrella}</p>
            ) : null}
            <button onClick={() => handleReconsider(item.id)}>再考する</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleListPage;
