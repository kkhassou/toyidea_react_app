// src/Home.js
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import face_kakegawa from "../../assets/images/face_kakegawa.jpg";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Select, MenuItem } from "@mui/material";
export const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          setUser(user);
        } else {
          alert("送信したメールのリンクをクリックしてください");
        }
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("ログアウト失敗:", error);
    }
  };
  const goToLogin = () => {
    navigate("/login");
  };

  const goToSignup = () => {
    navigate("/signup");
  };
  return (
    <div>
      <h1>
        <span>☰</span>
        <span> </span>
        ホーム
      </h1>
      {user && user.emailVerified ? (
        <>
          <p>プライベートモード</p>
          <button onClick={handleLogout}>ログアウト</button>
        </>
      ) : (
        <>
          <button onClick={goToLogin}>ログイン</button>
          <button onClick={goToSignup}>サインアップ</button>
        </>
      )}
      <p>今日も考えよう！</p>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={face_kakegawa} alt="空雨傘イメージ" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "1rem",
          }}
        >
          <Button
            sx={{ minWidth: "150px", maxWidth: "150px" }}
            variant="outlined"
            name="sky"
            onClick={() => navigate("/simple_theme_List", { state: {} })}
          >
            起空雨傘はじめる
          </Button>
          <div style={{ height: "10px" }}></div>
          <Button
            sx={{ minWidth: "220px", maxWidth: "220px" }}
            variant="outlined"
            name="sky"
            onClick={() =>
              navigate("/5w1h_inovation/simple/first_step", { state: {} })
            }
          >
            イノベーション①はじめる
          </Button>
        </div>
      </div>
      {user && user.emailVerified ? (
        <div>
          <Link to="/group/list">
            <button>加入一覧</button>
          </Link>
          <Link to="/group/code-add">
            <button>コード追加</button>
          </Link>
          <Link to="/group/code-publish">
            <button>コード発行</button>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default HomePage;
