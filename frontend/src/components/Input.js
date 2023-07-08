import { useContext, useState } from "react";
import { DataCxt } from "../context/DataProvider";

const InputField = () => {
  const [message, setMessage] = useState("");
  const { chats, setChats, setIsTyping } = useContext(DataCxt);
  const submit = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);
    setMessage("");

    fetch("http://localhost:8080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chats,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        msgs.push(data.output);
        setChats(msgs);
        setIsTyping(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form action="" className="form_chat" onSubmit={(e) => submit(e, message)}>
      <div className="d-flex justify-content-center align-items-center tesssst">
        <div className="input_chat d-flex justify-content-center align-items-center gap-3 mx-3">
          <input
            type="text"
            name="message"
            value={message}
            placeholder="Type a message here and hit Enter..."
            onChange={(e) => setMessage(e.target.value)}
          />
          <i className="fi fi-ss-paper-plane d-flex custom__icons"></i>
        </div>
      </div>
    </form>
  );
};

export default InputField;
