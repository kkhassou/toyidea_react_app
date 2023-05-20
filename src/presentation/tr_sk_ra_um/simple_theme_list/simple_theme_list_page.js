import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { getSkyRainUmbrellaThemeDistinctList } from "../../../api/s_r_u_api_client";
import { TextField } from "@mui/material";
import { insertSkyRainUmbrellaTheme } from "../../../api/s_r_u_api_client";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";

const SimpleThemeList = () => {
  const [list, setList] = useState([]);
  const [user, setUser] = useState(null);
  const [newTheme, setNewTheme] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setUser(user);
        getSkyRainUmbrellaThemeDistinctList(user.email).then((data) => {
          setList(data);
        });
      } else {
        setUser(null);
        getSkyRainUmbrellaThemeDistinctList(null).then((data) => {
          setList(data);
        });
      }
    });
    return unsubscribe;
  }, []);

  const handleSelectTheme = (theme) => {
    console.log(`Selected theme: ${theme}`);
    // TODO: 選択したテーマIDを次のページに渡す処理
    navigate("/simple_input", { state: { theme: theme } });
  };
  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };
  const handleSave = async () => {
    // 保存ボタンが押された時の処理を記述
    try {
      const result = await insertSkyRainUmbrellaTheme(newTheme, user.email);
    } catch (error) {
      console.error("保存に失敗しました:", error);
    }
    navigate("/simple_input", { state: { theme: newTheme } });
  };
  const handleBack = () => {
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "left" }}
      >
        {user && user.emailVerified ? (
          <>
            <p>プライベートモード</p>
          </>
        ) : (
          <></>
        )}
        <Typography variant="h5" gutterBottom>
          新しいテーマ
        </Typography>
        <TextField
          value={newTheme}
          onChange={(e) => handleInputChange(e, setNewTheme)}
          multiline
          inputProps={{
            style: { whiteSpace: "pre-wrap", wordWrap: "break-word" },
            wrap: "soft",
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "5px 10px",
            },
            marginBottom: "20px",
            width: "500px", // ここで横幅を指定
          }}
        />{" "}
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "5px 10px",
            },
            marginBottom: "20px",
            width: "200px", // ここで横幅を指定
            // m: 1,
          }}
        >
          新しいテーマでスタート
        </Button>{" "}
      </Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          "& .MuiOutlinedInput-root": {
            padding: "5px 10px",
          },
          marginBottom: "20px",
        }}
      >
        テーマを選択してください
      </Typography>
      {list.map((one) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "5px 10px",
              },
            }}
          >
            {one.theme}
          </Typography>
          <Button
            key={one.theme}
            onClick={() => handleSelectTheme(one.theme)}
            sx={{ m: 1 }}
            variant="contained"
            size="large"
          >
            スタート
          </Button>
        </Box>
      ))}
      <Button
        variant="outlined"
        onClick={handleBack}
        sx={{
          marginTop: "20px",
          width: "200px",
        }}
      >
        前のページに戻る
      </Button>
    </Box>
  );
};

export default SimpleThemeList;
