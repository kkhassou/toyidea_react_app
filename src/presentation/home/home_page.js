// src/Home.js
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../firebase';
import face_kakegawa from '../../assets/images/face_kakegawa.jpg';
import { Link,useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('ログアウト失敗:', error);
    }
  };
  const goToLogin = () => {
    navigate('/login');
  };

  const goToSignup = () => {
    navigate('/signup');
  };
  return (
    <div>
      <h1>
      <span>☰</span>
      <span> </span>
         ホーム
      </h1>
      {user ? (
        <button onClick={handleLogout}>ログアウト</button>
      ) : (
        <>
          <button onClick={goToLogin}>ログイン</button>
          <button onClick={goToSignup}>サインアップ</button>
        </>
      )}
      <p>今日も起空雨傘で考えよう！</p>
      <img src={face_kakegawa} alt="空雨傘イメージ" />
      <button>はじめる</button>
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
    </div>
  );
};

export default HomePage;
