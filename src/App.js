// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./presentation/home/home_page";
import LoginPage from "./presentation/login/login_page";
import SignupPage from "./presentation/signup/signup_page";
import GroupCodeAddPage from "./presentation/group/group_code_add_page";
import GroupCodePublishPage from "./presentation/group/group_code_publish_page";
import GroupListPage from "./presentation/group/group_list_page";
import GroupMemberPage from "./presentation/group/group_member_page";
import SimpleInputPage from "./presentation/tr_sk_ra_um/simple_input/simple_input_page";
import SimpleListPage from "./presentation/tr_sk_ra_um/simple_list/simple_list_page";
import SimpleFirstStepPage from "./presentation/5w1h_inovation/simple/simple_first_step_page";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/group/code-add" element={<GroupCodeAddPage />} />
        <Route path="/group/code-publish" element={<GroupCodePublishPage />} />
        <Route path="/group/list" element={<GroupListPage />} />
        <Route path="/group/member" element={<GroupMemberPage />} />
        <Route path="/simple_input" element={<SimpleInputPage />} />
        <Route path="/simple_list" element={<SimpleListPage />} />
        <Route
          path="5w1h_inovation/simple/first_step_page"
          element={<SimpleFirstStepPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
