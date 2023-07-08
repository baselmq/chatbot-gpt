import "../css/index.css";
import logo from "../assets/boots.svg";
import CardChatHistory from "./CardChatHistory";
const SideBar = () => {
  return (
    <div className="container__sidebar my-3">
      <Brand />
      <NewChat />
      <div className="text__sidebar mb-2 ms-1">history</div>
      <CardChatHistory />
    </div>
  );
};

export default SideBar;

const NewChat = () => {
  return (
    <div className="card_new_chat d-flex align-items-center gap-2 mb-3">
      <i className="fi fi-rr-plus d-flex custom__icons"></i>
      <span className="text__sidebar">New chat</span>
    </div>
  );
};
const Brand = () => {
  return (
    <div className="brand d-flex align-items-center gap-2 mb-3">
      <img src={logo} className="brand_logo" alt="logo" />
      <span className="text__brand">SuperChat</span>
    </div>
  );
};
