const CardChatHistory = (props) => {
  return (
    <div className="card__history d-flex align-items-center gap-2 my-2">
      <i className="fi fi-rr-comment-alt d-flex custom__icons"></i>
      <span className="text__sidebar">{props.title}</span>
    </div>
  );
};

export default CardChatHistory;
