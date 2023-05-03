import React, { useState, useEffect } from "react";
import FiveWoneHdata from "../../../data/5w1hdata";

const getRandomItems = (list, count) => {
  const shuffled = list.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const getRandomItemsForSelected = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

const SimpleFirstStepPage = () => {
  const [who, setWho] = useState([]);
  const [where, setWhere] = useState([]);
  const [when, setWhen] = useState([]);
  const [selectedWho, setSelectedWho] = useState("");
  const [selectedWhere, setSelectedWhere] = useState("");
  const [selectedWhen, setSelectedWhen] = useState("");
  const [randomCount, setRandomCount] = useState(3);

  useEffect(() => {
    setWho(getRandomItems(FiveWoneHdata.whoSmaple, randomCount));
    setWhere(getRandomItems(FiveWoneHdata.whereSmaple, randomCount));
    setWhen(getRandomItems(FiveWoneHdata.whenSmaple, randomCount));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRandomCountChange = (event) => {
    setRandomCount(event.target.value);
  };

  const handleUpdate = () => {
    setSelectedWho(getRandomItemsForSelected(who));
    setSelectedWhere(getRandomItemsForSelected(where));
    setSelectedWhen(getRandomItemsForSelected(when));
  };

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Who:</h2>
        <h2>Where:</h2>
        <h2>When:</h2>
      </header>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ul>
          {who.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <ul>
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
        <label htmlFor="random-count">Choose the number of random items:</label>
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <input type="text" />
          <span>{selectedWho}</span>
          <span> x </span>
        </div>
        <div>
          <input type="text" />
          <span>{selectedWhere}</span>
          <span> x </span>
        </div>
        <div>
          <input type="text" />
          <span>{selectedWhen}</span>
        </div>
      </div>
      <div>
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default SimpleFirstStepPage;
