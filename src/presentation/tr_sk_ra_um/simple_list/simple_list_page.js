import React, { useState, useEffect } from "react";
import { getSkyRainUmbrellaList } from "../../../api/s_r_u_api_client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import {
  Select,
  MenuItem,
  Typography,
  Box,
  IconButton,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import { FavoriteIcon } from "@mui/icons-material/Favorite";
// import { Favorite } from "@mui/icons-material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import StarIcon from "@mui/icons-material/Star";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
const SimpleListPage = () => {
  const [list, setList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filterItem, setFilterItem] = useState("all");
  const [contentFilter, setContentFilter] = useState("all");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState({});
  const [checkedItems, setCheckedItems] = useState({
    trigger: true,
    sky: true,
    rain: true,
    umbrella: true,
  });
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      getSkyRainUmbrellaList(location.state?.theme)
        .then((data) => {
          setList(data);
          setFilteredData(data);
        })
        .catch((error) => {
          console.error("Error fetching sky rain umbrella list:", error);
        });
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    let filtered = list;

    if (filter !== "all" && filter !== "none") {
      filtered = list.filter((item) => {
        const filterItems = filter.split("|");
        return filterItems.some((filterItem) => item[filterItem]);
      });
    } else if (filter === "none") {
      filtered = [];
    }

    if (contentFilter !== "" && contentFilter !== "all") {
      filtered = filtered.filter((item) => {
        for (const key in item) {
          if (key !== "id" && item[key] === contentFilter) {
            return true;
          }
        }
        return false;
      });
    }

    setFilteredData(filtered);
  }, [filter, contentFilter, list]);

  const handleFilterChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });

    if (event.target.checked) {
      setFilter((prevFilter) =>
        prevFilter === "all"
          ? event.target.name
          : prevFilter + "|" + event.target.name
      );
    } else {
      setFilter((prevFilter) => {
        const newFilter = prevFilter
          .split("|")
          .filter((filterItem) => filterItem !== event.target.name)
          .join("|");
        return newFilter === "" ? "none" : newFilter;
      });
    }
  };

  const handleFilterItemChange = (event) => {
    const newFilterItem = event.target.value;
    setFilterItem(newFilterItem);
    setContentFilter("");
  };

  const handleContentFilterChange = (event) => {
    const newContentFilter = event.target.value;
    setContentFilter(newContentFilter);
  };

  const handleReconsider = (id) => {
    // 再考するボタンが押された時の処理を記述
    const selectedItem = list.find((item) => item.id === id);
    navigate("/simple_input", { state: { item: selectedItem } });
  };

  const handleComment = (id) => {
    // コメントするボタンが押された時の処理を記述
    const selectedItem = list.find((item) => item.id === id);
    navigate("/simple_theme_List_comment", { state: { item: selectedItem } });
  };

  const getContentOptions = () => {
    return list
      .map((item) => item[filterItem])
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((value) => (
        <MenuItem value={value} style={{ fontSize: "20px" }}>
          {value}
        </MenuItem>
      ));
  };

  const handleClick = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const handleBack = () => {
    navigate("/simple_input", { state: { theme: location.state?.theme } });
  };

  return (
    <div>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        {user && user.emailVerified ? (
          <>
            <p>プライベートモード</p>
          </>
        ) : (
          <></>
        )}
        <h1>起空雨傘一覧</h1>
        <Button
          variant="outlined"
          onClick={handleBack}
          sx={{
            marginLeft: "20px",
            height: "30px",
            width: "150px",
          }}
        >
          前のページに戻る
        </Button>
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          // justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">項目フィルタ:</Typography>
          <FormGroup>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.trigger}
                    onChange={handleFilterChange}
                    name="trigger"
                  />
                }
                label="起"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.sky}
                    onChange={handleFilterChange}
                    name="sky"
                  />
                }
                label="空"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.rain}
                    onChange={handleFilterChange}
                    name="rain"
                  />
                }
                label="雨"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.umbrella}
                    onChange={handleFilterChange}
                    name="umbrella"
                  />
                }
                label="傘"
              />
            </Box>
          </FormGroup>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">フィルタ項目:</Typography>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={filterItem}
              onChange={handleFilterItemChange}
              variant="outlined"
              style={{ fontSize: "20px", height: "40px" }}
            >
              <MenuItem value="trigger" style={{ fontSize: "20px" }}>
                起
              </MenuItem>
              <MenuItem value="sky" style={{ fontSize: "20px" }}>
                空
              </MenuItem>
              <MenuItem value="rain" style={{ fontSize: "20px" }}>
                雨
              </MenuItem>
              <MenuItem value="umbrella" style={{ fontSize: "20px" }}>
                傘
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">内容フィルタ:</Typography>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={contentFilter}
              onChange={handleContentFilterChange}
              variant="outlined"
              style={{ fontSize: "20px", height: "40px" }}
            >
              <MenuItem value="all" style={{ fontSize: "20px" }}>
                全て
              </MenuItem>
              {getContentOptions()}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <div
        style={{
          borderTop: "1px solid #cccccc",
          borderWidth: "1px",
          marginTop: "10px",
          marginLeft: "10px",
          width: "470px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "5px 10px",
            },
          }}
          marginTop={"10px"}
          marginBottom={"10px"}
        >
          テーマ
        </Typography>
        <Typography
          variant="h5"
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "5px 10px",
            },
          }}
          marginBottom={"20px"}
        >
          {location.state.theme}
        </Typography>
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
              {checkedItems.trigger && <p>起：{item.trigger}</p>}
              {checkedItems.sky && <p>空：{item.sky}</p>}
              {checkedItems.rain && <p>雨：{item.rain}</p>}
              {checkedItems.umbrella && <p>傘：{item.umbrella}</p>}
              <Box display="flex" alignItems="center">
                <button onClick={() => handleReconsider(item.id)}>
                  再考する
                </button>
                <IconButton onClick={() => handleClick(item.id)}>
                  {selected[item.id] ? (
                    <StarIcon sx={{ color: "#FFD700" }} />
                  ) : (
                    <StarOutlinedIcon />
                  )}
                </IconButton>
                <button onClick={() => handleComment(item.id)}>コメント</button>
              </Box>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimpleListPage;
