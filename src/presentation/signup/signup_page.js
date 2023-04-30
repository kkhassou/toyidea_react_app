// src/Signup.js
import React, { useState } from 'react';
import firebase from '../../firebase';

export const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      alert('アカウント作成成功'); } catch (error) { alert('アカウント作成失敗: ' + error.message); } };

return ( <div> <h1>Signup</h1> <form onSubmit={handleSignup}> <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> <button type="submit">サインアップ</button> </form> </div> ); };

export default SignupPage;