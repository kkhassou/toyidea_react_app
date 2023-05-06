import React, { useState, useEffect } from "react";
import FiveWoneHdata from "../../../data/5w1hdata";
import { insert_five_w_one_h } from "../../../api/five_w_one_h_client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { TextField } from "@mui/material";
import innate_desire_data from "../../../data/innate_desire.json";
import place_adjective_data from "../../../data/place_adjective.json";
import adverb_data from "../../../data/adverb.json";
import { Link, useNavigate } from "react-router-dom";
const getRandomItems = (list, count) => {
  const shuffled = list.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const getRandomItemsForSelected = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

const SimpleFirstStepPage = () => {
  const navigate = useNavigate();
  const [innateDesireData, setInnateDesireData] = useState({});
  const [placeAdjectivData, setPlaceAdjectivData] = useState({});
  const [adverbData, setAdverbData] = useState({});
  const [user, setUser] = useState(null);
  const [who, setWho] = useState([]);
  const [where, setWhere] = useState([]);
  const [when, setWhen] = useState([]);
  //   const [selectedWho, setSelectedWho] = useState("");
  //   const [selectedWhere, setSelectedWhere] = useState("");
  //   const [selectedWhen, setSelectedWhen] = useState("");
  const [randomCount, setRandomCount] = useState(3);

  useEffect(() => {
    setAdverbData(adverb_data);
    setInnateDesireData(innate_desire_data);
    setPlaceAdjectivData(place_adjective_data);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    setWho(getRandomItems(FiveWoneHdata.whoSmaple, randomCount));
    setWhere(getRandomItems(FiveWoneHdata.whereSmaple, randomCount));
    setWhen(getRandomItems(FiveWoneHdata.whenSmaple, randomCount));
  }, [randomCount]);

  useEffect(() => {
    if (who.length > 0 && selectedWhoInput === "") {
      setSelectedWhoInput(getRandomItemsForSelected(who));
    }
    if (where.length > 0 && selecteWhereInput === "") {
      setSelectedWhereInput(getRandomItemsForSelected(where));
    }
    if (when.length > 0 && selecteWhenInput === "") {
      setSelectedWhenInput(getRandomItemsForSelected(when));
    }
  }, [who, where, when]);

  const [whoInput, setWhoInput] = useState("");
  const [whereInput, setWhereInput] = useState("");
  const [whenInput, setWhenInput] = useState("");
  const [selectedWhoInput, setSelectedWhoInput] = useState("");
  const [selecteWhereInput, setSelectedWhereInput] = useState("");
  const [selecteWhenInput, setSelectedWhenInput] = useState("");
  const handleWhoInputChange = (event) => {
    setWhoInput(event.target.value);
  };

  const handleWhereInputChange = (event) => {
    setWhereInput(event.target.value);
  };

  const handleWhenInputChange = (event) => {
    setWhenInput(event.target.value);
  };
  const handleSelectedWhoInputChange = (event) => {
    setSelectedWhoInput(event.target.value);
  };

  const handleSelectedWhereInputChange = (event) => {
    setSelectedWhereInput(event.target.value);
  };

  const handleSelectedWhenInputChange = (event) => {
    setSelectedWhenInput(event.target.value);
  };

  const handleRandomCountChange = (event) => {
    setRandomCount(event.target.value);
  };

  const handleUpdate = () => {
    if (randomWhoOn) {
      setSelectedWhoInput(getRandomItemsForSelected(who));
    }
    if (randomWhereOn) {
      setSelectedWhereInput(getRandomItemsForSelected(where));
    }
    if (randomWhenOn) {
      setSelectedWhenInput(getRandomItemsForSelected(when));
    }
  };
  const handleListUpdate = () => {
    setWho(getRandomItems(FiveWoneHdata.whoSmaple, randomCount));
    setWhere(getRandomItems(FiveWoneHdata.whereSmaple, randomCount));
    setWhen(getRandomItems(FiveWoneHdata.whenSmaple, randomCount));
  };
  const handleSubmit = async () => {
    if (whoInput == "" || whereInput == "" || whenInput == "") {
      alert("who,wher,whenに何か入力してください");
    } else {
      try {
        const data = {
          userid: "",
          groupid: "",
          email: "",
          who: `${whoInput} ${selectedWhoInput}`,
          where: `${whereInput} ${selecteWhereInput}`,
          when: `${whenInput} ${selecteWhenInput}`,
          // 必要であれば、why, what, how の値も追加してください
          why: "",
          what: "",
          how: "",
        };
        const response = await insert_five_w_one_h(data);
        console.log("Response from server:", response);
      } catch (error) {
        console.error("Error while submitting data:", error);
      }
    }
  };
  const handleInnateDesireSetClick = (description) => {
    setWhoInput(description);
  };
  const handlePlaceAdjectivSetClick = (description) => {
    setWhereInput(description);
  };
  const handAdverbSetClick = (description) => {
    setWhenInput(description);
  };

  const [randomWhoOn, setRandomWhoOn] = useState(true);
  const [randomWhereOn, setRandomWhereOn] = useState(true);
  const [randomWhenOn, setRandomWhenOn] = useState(true);
  const handleRandomWhoToggle = () => {
    setRandomWhoOn(!randomWhoOn);
  };
  const handleRandomWhereToggle = () => {
    setRandomWhereOn(!randomWhereOn);
  };
  const handleRandomWhenToggle = () => {
    setRandomWhenOn(!randomWhenOn);
  };
  const [editWho, setEditWho] = useState(false);
  const [editWhere, setEditWhere] = useState(false);
  const [editWhen, setEditWhen] = useState(false);
  const handleSaveWho = () => {
    setEditWho(!editWho);
  };

  const handleSaveWhere = () => {
    setEditWhere(!editWhere);
  };

  const handleSaveWhen = () => {
    setEditWhen(!editWhen);
  };
  return (
    <div>
      <header style={{ display: "flex", justifyContent: "flex-start" }}>
        <h2 style={{ marginRight: "100px" }}>Who:</h2>
        <h2 style={{ marginRight: "100px" }}>Where:</h2>
        <h2>When:</h2>
      </header>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <ul style={{ marginRight: "50px" }}>
          {who.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <ul style={{ marginRight: "100px" }}>
          {where.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <ul>
          {when.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <label htmlFor="random-count">ランダムアイテムの行数を選択:</label>
        <select
          id="random-count"
          value={randomCount}
          onChange={handleRandomCountChange}
        >
          {Array.from({ length: 8 }, (_, i) => i + 3).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={handleListUpdate} style={{ margin: "10px" }}>
          リストアップデート
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>本源的欲求</div>
          <div
            style={{
              display: "flex",

              alignItems: "center",
            }}
          >
            <TextField
              value={whoInput}
              onChange={handleWhoInputChange}
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
            />{" "}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {editWho ? (
                <>
                  <TextField
                    value={selectedWhoInput}
                    onChange={handleSelectedWhoInputChange}
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
                  <button
                    style={{ margin: "0 10px" }}
                    onClick={() => handleSaveWho()}
                  >
                    保存
                  </button>
                </>
              ) : (
                <>
                  <span>{selectedWhoInput}</span>
                  <button
                    style={{ margin: "0 10px" }}
                    onClick={() => handleSaveWho()}
                  >
                    編集
                  </button>
                </>
              )}

              {randomWhoOn ? (
                <button
                  style={{ margin: "0 10px" }}
                  onClick={() => handleRandomWhoToggle()}
                >
                  ランダムオン
                </button>
              ) : (
                <button
                  style={{ margin: "0 10px" }}
                  onClick={() => handleRandomWhoToggle()}
                >
                  ランダムオフ
                </button>
              )}
            </div>
            <h1 style={{ margin: "0 10px" }}> が </h1>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor="where-input">形容詞</label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={whereInput}
              onChange={handleWhereInputChange}
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {editWhere ? (
                <>
                  <TextField
                    value={selecteWhereInput}
                    onChange={handleSelectedWhereInputChange}
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
                  <button
                    style={{ margin: "0 10px" }}
                    onClick={() => handleSaveWhere()}
                  >
                    保存
                  </button>
                </>
              ) : (
                <>
                  <span>{selecteWhereInput}</span>
                  <button
                    style={{ margin: "0 10px" }}
                    onClick={() => handleSaveWhere()}
                  >
                    編集
                  </button>
                </>
              )}
              {randomWhereOn ? (
                <button
                  style={{ margin: "0 10px" }}
                  onClick={() => handleRandomWhereToggle()}
                >
                  ランダムオン
                </button>
              ) : (
                <button
                  style={{ margin: "0 10px" }}
                  onClick={() => handleRandomWhereToggle()}
                >
                  ランダムオフ
                </button>
              )}
            </div>
            <h1 style={{ margin: "0 10px" }}> で </h1>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>副詞</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={whenInput}
              onChange={handleWhenInputChange}
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {editWhen ? (
                <>
                  <TextField
                    value={selecteWhenInput}
                    onChange={handleSelectedWhenInputChange}
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
                  <button
                    style={{ margin: "0 10px" }}
                    onClick={() => handleSaveWhen()}
                  >
                    保存
                  </button>
                </>
              ) : (
                <>
                  <span>{selecteWhenInput}</span>
                  <button
                    style={{ margin: "0 10px" }}
                    onClick={() => handleSaveWhen()}
                  >
                    編集
                  </button>
                </>
              )}
              {randomWhenOn ? (
                <button
                  style={{ margin: "0 10px" }}
                  onClick={() => handleRandomWhenToggle()}
                >
                  ランダムオン
                </button>
              ) : (
                <button
                  style={{ margin: "0 10px" }}
                  onClick={() => handleRandomWhenToggle()}
                >
                  ランダムオフ
                </button>
              )}
            </div>
            <h1 style={{ margin: "0 10px" }}> に </h1>
          </div>
        </div>
      </div>

      <div>
        <button style={{ margin: "10px" }} onClick={handleUpdate}>
          ランダム更新
        </button>
        <button style={{ marginRight: "10px" }} onClick={handleSubmit}>
          データ入力
        </button>
        <button
          style={{ marginRight: "10px" }}
          onClick={() =>
            navigate("/5w1h_inovation/simple/second_step", { state: {} })
          }
        >
          次へ
        </button>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              borderRight: "1px solid #cccccc",
              borderWidth: "1px",
              marginLeft: "0px",
              width: "470px",
            }}
          >
            <h1>本源的欲求</h1>
            <div>
              {Object.entries(innateDesireData).map(
                ([category, subcategories]) => (
                  <div key={category}>
                    <h2>{category}</h2>
                    <ul>
                      {Object.entries(subcategories).map(
                        ([subcategory, descriptions]) => (
                          <li key={subcategory}>
                            <strong>{subcategory}:</strong>
                            <ul>
                              {descriptions.map((description, index) => (
                                <div
                                  key={index}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <li style={{ marginRight: "10px" }}>
                                    {description}
                                  </li>
                                  <button
                                    onClick={() =>
                                      handleInnateDesireSetClick(description)
                                    }
                                  >
                                    セット
                                  </button>
                                </div>
                              ))}
                            </ul>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
          <div
            style={{
              borderRight: "1px solid #cccccc",
              borderWidth: "1px",
              marginLeft: "10px",
              width: "470px",
            }}
          >
            <h1>場所の形容詞（例）</h1>
            <div>
              {Object.entries(placeAdjectivData).map(([title, adjectives]) => (
                <div key={title}>
                  <h2>{title}</h2>
                  <ul>
                    {adjectives.map((adj) => (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <li key={adj}>{adj}</li>
                        <button
                          onClick={() => handlePlaceAdjectivSetClick(adj)}
                        >
                          セット
                        </button>
                      </div>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              borderRight: "1px solid #cccccc",
              borderWidth: "1px",
              marginLeft: "10px",
              width: "470px",
            }}
          >
            <h1>副詞（例）</h1>
            <div>
              {Object.entries(adverbData).map(([title, adjectives]) => (
                <div key={title}>
                  <h2>{title}</h2>
                  <ul>
                    {adjectives.map((adj) => (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <li key={adj}>{adj}</li>
                        <button onClick={() => handAdverbSetClick(adj)}>
                          セット
                        </button>
                      </div>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleFirstStepPage;
