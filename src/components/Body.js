import React, { useContext } from "react";
import InputField from "./Input";
import userIcon from "../assets/user.svg";
import chatIcon from "../assets/boots.svg";
import { DataCxt } from "../context/DataProvider";

// css
import "bootstrap/dist/css/bootstrap.css";
import "../css/index.css";

const Body = () => {
  const { streamData, saveValue, isTyping, previousChats, currentTitle } =
    useContext(DataCxt);
  const currentChat = previousChats.filter(
    (prevChat) => prevChat.title === currentTitle
  );
  return (
    <div className="container__body">
      <div className="content__chat">
        <section className="pt-2">
          {currentChat && currentChat.length
            ? currentChat.map((chat, index) => (
                <pre
                  key={index}
                  className={`${
                    chat.role === "user" ? "user_msg" : "assistant_msg"
                  } d-flex gap-2 m-3`}
                >
                  <span>
                    {chat.role === "user" ? (
                      <img src={userIcon} className="chat__icon" alt="user" />
                    ) : (
                      <img src={chatIcon} className="chat__icon" alt="chat" />
                    )}
                  </span>
                  <div className="d-flex align-items-center">
                    <span className="">{chat.content}</span>
                  </div>
                </pre>
              ))
            : ""}
        </section>
        <div className={isTyping ? "" : "hide"}>
          <pre>
            {isTyping ? (
              <>
                <div className="user_msg d-flex gap-2 m-3">
                  <img src={userIcon} className="chat__icon" alt="chat" />
                  <div className="d-flex align-items-center">
                    <span className="">{saveValue}</span>
                  </div>
                </div>
                <div className="assistant_msg d-flex gap-2 m-3">
                  <img src={chatIcon} className="chat__icon" alt="chat" />
                  <div className="d-flex align-items-center">
                    <span>
                      {streamData === "" ? "Generating..." : streamData}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </pre>
        </div>
        <div className="pt-5">
          {!isTyping && currentChat.length <= 0 ? (
            <div className="d-flex justify-content-center align-items-center flex-column">
              <div className="welcome">welcome in chat AI</div>
              <lottie-player
                src="https://lottie.host/72a6781e-028a-4966-8a7d-370af5f1a137/bFcfQmbZ8J.json"
                background="transparent"
                speed="1"
                style={{ maxWidth: "400px", width: "100%" }}
                loop
                autoplay
              ></lottie-player>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {/*---------------- InputField ------------------- */}
      <InputField />
      {/*---------------- InputField ------------------- */}
    </div>
  );
};

export default Body;
