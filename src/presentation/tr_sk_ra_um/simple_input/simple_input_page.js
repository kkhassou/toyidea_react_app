import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SimpleInputPage = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    qi: "",
    kara: "",
    ame: "",
    kasa: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleClear = (event) => {
    const { name } = event.target;
    setInputs({ ...inputs, [name]: "" });
  };

  const handleSave = () => {
    // 保存ボタンが押された時の処理を記述
  };

  const handleSaveSetting = () => {
    // 保存時設定ボタンが押された時の処理を記述
  };

  const handleShowList = () => {
    // 一覧画面へボタンが押された時の処理を記述
    navigate("/simple_list", { state: {} });
  };

  return (
    <div>
      <h1>起空雨傘入力</h1>
      <div>
        <label>起</label>
        <input
          type="text"
          name="qi"
          value={inputs.qi}
          onChange={handleChange}
        />
        <button name="qi" onClick={handleClear}>
          クリア
        </button>
      </div>
      <div>
        <label>空</label>
        <input
          type="text"
          name="kara"
          value={inputs.kara}
          onChange={handleChange}
        />
        <button name="kara" onClick={handleClear}>
          クリア
        </button>
      </div>
      <div>
        <label>雨</label>
        <input
          type="text"
          name="ame"
          value={inputs.ame}
          onChange={handleChange}
        />
        <button name="ame" onClick={handleClear}>
          クリア
        </button>
      </div>
      <div>
        <label>傘</label>
        <input
          type="text"
          name="kasa"
          value={inputs.kasa}
          onChange={handleChange}
        />
        <button name="kasa" onClick={handleClear}>
          クリア
        </button>
      </div>
      <div>
        <button onClick={handleSave}>保存</button>
        <button onClick={handleSaveSetting}>保存時設定</button>
        <button onClick={handleShowList}>一覧画面へ</button>
      </div>
    </div>
  );
};

export default SimpleInputPage;
