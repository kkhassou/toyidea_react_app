import React, { useState } from "react";

const GroupCodePublishPage = () => {
  const [groupName, setGroupName] = useState("");

  const handlePublishCode = () => {
    // グループ名を使ってコードを発行する処理を実装してください
  };

  return (
    <div>
      <h1>コード発行</h1>
      <p>グループ名を入力してください:</p>
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="グループ名を入力"
      />
      <p>コードを発行します:</p>
      <button onClick={handlePublishCode}>発行する</button>
    </div>
  );
};

export default GroupCodePublishPage;
