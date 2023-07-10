import "../css/index.css";
import logo from "../assets/boots.svg";
import CardChatHistory from "./CardChatHistory";
import { useContext } from "react";
import { DataCxt } from "../context/DataProvider";
const SideBar = () => {
  const { setValue, setMessage, previousChats, setCurrentTitle } =
    useContext(DataCxt);

  const createNewChat = () => {
    setValue("");
    setMessage(null);
    setCurrentTitle(null);
  };

  const uniqueTitles = Array.from(
    new Set(previousChats.map((prevChat) => prevChat.title))
  );
  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setValue("");
    setMessage(null);
  };
  return (
    <div className="container__sidebar my-3">
      <Brand />
      <NewChat createNewChat={createNewChat} />
      <div className="text__sidebar mb-2 ms-1">history</div>
      {uniqueTitles?.map((uniqueTitle, index) => (
        <span key={index} onClick={() => handleClick(uniqueTitle)}>
          <CardChatHistory title={uniqueTitle} />
        </span>
      ))}
    </div>
  );
};

export default SideBar;

const NewChat = (props) => {
  return (
    <div
      className="card_new_chat d-flex align-items-center gap-2 mb-3"
      onClick={props.createNewChat}
    >
      <i className="fi fi-rr-plus d-flex custom__icons"></i>
      <span className="text__sidebar">New chat</span>
    </div>
  );
};
const Brand = () => {
  return (
    <div className="brand d-flex align-items-center gap-2 mb-3">
      <img src={logo} className="brand_logo" alt="logo" />
      <span className="text__brand">SuperChat AI</span>
    </div>
  );
};
