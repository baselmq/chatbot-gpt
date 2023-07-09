import React, { useContext } from "react";
import InputField from "./Input";
import userIcon from "../assets/user.svg";
import chatIcon from "../assets/boots.svg";
import { DataCxt } from "../context/DataProvider";

// css
import "bootstrap/dist/css/bootstrap.css";
import "../css/index.css";

const Body = () => {
  const { isTyping, previousChats, currentTitle, message } =
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
          <p>
            {isTyping ? (
              <>
                <div className="user_msg d-flex align-items-center gap-2 m-3">
                  <img src={userIcon} className="chat__icon" alt="chat" />
                  {message}
                </div>
                <div className="assistant_msg d-flex align-items-center gap-2 m-3">
                  <img src={chatIcon} className="chat__icon" alt="chat" />
                  <i>Typing...</i>
                </div>
              </>
            ) : (
              ""
            )}
          </p>
        </div>
      </div>

      <InputField />
    </div>
  );
};

export default Body;
