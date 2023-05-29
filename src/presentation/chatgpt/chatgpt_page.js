import React, { useState } from "react";
// import { fetchFromOpenAI } from "../api/openai"; // OpenAIからのフェッチ関数をインポート
import axios from "axios";

const ChatgptPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState(
    // "text-davinci-002"
    // "gpt-3.5-turbo"
    "text-davinci-003"
  );
  const [response, setResponse] = useState("");
  const handleInputChange = (event) => {
    console.log(event.target.value);
    setInput(event.target.value);
  };

  const handleOpenAiSubmit = async (event) => {
    console.log(input);
    event.preventDefault();
    const API_KEY = process.env.REACT_APP_OPEN_AI_API_KEY;
    const URL = "https://api.openai.com/v1/engines/" + model + "/completions";
    try {
      const response = await axios.post(
        URL,
        {
          prompt: input,
          max_tokens: 200,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      setResponse(response.data.choices[0].text);
      setMessages([
        ...messages,
        { text: response.data.choices[0].text, user: "gpt-3" },
      ]);
      console.log("response");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.user}</strong>: {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleOpenAiSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatgptPage;
