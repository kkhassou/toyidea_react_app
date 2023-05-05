import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import { insertSkyRainUmbrella } from "../../../api/s_r_u_api_client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase";

const SimpleInputPage = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const itemData = location.state?.item;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    trigger: itemData ? itemData.trigger : "",
    sky: itemData ? itemData.sky : "",
    rain: itemData ? itemData.rain : "",
    umbrella: itemData ? itemData.umbrella : "",
  });
  const [clearOption, setClearOption] = useState("umbrella");
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleClear = (event) => {
    const { name } = event.target;
    setInputs({ ...inputs, [name]: "" });
  };

  const handleSave = async () => {
    // 保存ボタンが押された時の処理を記述
    try {
      const result = await insertSkyRainUmbrella(
        // user.uid,
        // user.email,
        inputs.trigger,
        inputs.sky,
        inputs.rain,
        inputs.umbrella
      );
      console.log("保存に成功しました:", result);
      switch (clearOption) {
        case "umbrella":
          setInputs({ ...inputs, umbrella: "" });
          break;
        case "rainAndUmbrella":
          setInputs({ ...inputs, rain: "", umbrella: "" });
          break;
        case "skyRainAndUmbrella":
          setInputs({ ...inputs, sky: "", rain: "", umbrella: "" });
          break;
        case "all":
          setInputs({ trigger: "", sky: "", rain: "", umbrella: "" });
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("保存に失敗しました:", error);
    }
  };

  const handleShowList = () => {
    // 一覧画面へボタンが押された時の処理を記述
    navigate("/simple_list", { state: {} });
  };

  const handleClearOption = (event) => {
    setClearOption(event.target.value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>起空雨傘入力</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>起</label>
        <TextField
          name="trigger"
          value={inputs.trigger}
          onChange={handleChange}
          multiline
          inputProps={{
            maxLength: 30,
            style: { whiteSpace: "pre-wrap", wordWrap: "break-word" },
            wrap: "soft",
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "5px 10px",
            },
          }}
        />
      </div>
      <Button
        sx={{ minWidth: "80px", maxWidth: "80px" }}
        variant="outlined"
        name="trigger"
        onClick={handleClear}
      >
        クリア
      </Button>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>空</label>
        <TextField
          name="sky"
          value={inputs.sky}
          onChange={handleChange}
          multiline
          inputProps={{
            maxLength: 30,
            style: { whiteSpace: "pre-wrap", wordWrap: "break-word" },
            wrap: "soft",
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "5px 10px",
            },
          }}
        />
      </div>
      <Button
        sx={{ minWidth: "80px", maxWidth: "80px" }}
        variant="outlined"
        name="sky"
        onClick={handleClear}
      >
        クリア
      </Button>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>雨</label>
        <TextField
          name="rain"
          value={inputs.rain}
          onChange={handleChange}
          multiline
          inputProps={{
            maxLength: 30,
            style: { whiteSpace: "pre-wrap", wordWrap: "break-word" },
            wrap: "soft",
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "5px 10px",
            },
          }}
        />
      </div>
      <Button
        sx={{ minWidth: "80px", maxWidth: "80px" }}
        variant="outlined"
        name="rain"
        onClick={handleClear}
      >
        クリア
      </Button>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>傘</label>
        <TextField
          name="umbrella"
          value={inputs.umbrella}
          onChange={handleChange}
          multiline
          inputProps={{
            maxLength: 300,
            style: { whiteSpace: "pre-wrap", wordWrap: "break-word" },
            wrap: "soft",
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "5px 10px",
            },
          }}
        />
      </div>
      <Button
        sx={{ minWidth: "80px", maxWidth: "80px" }}
        variant="outlined"
        name="umbrella"
        onClick={handleClear}
      >
        クリア
      </Button>
      <div>
        <button onClick={handleSave}>保存</button>
        <label>保存時設定</label>
        <Select
          value={clearOption}
          onChange={handleClearOption}
          displayEmpty
          style={{ fontSize: "15px", height: "30px" }}
        >
          <MenuItem value="umbrella">傘だけ消す</MenuItem>
          <MenuItem value="rainAndUmbrella">傘と雨を消す</MenuItem>
          <MenuItem value="skyRainAndUmbrella">傘と雨と空を消す</MenuItem>
          <MenuItem value="all">全部消す</MenuItem>
        </Select>
        <button onClick={handleShowList}>一覧画面へ</button>
      </div>
    </div>
  );
};

export default SimpleInputPage;
