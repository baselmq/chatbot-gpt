import { useContext, useEffect } from "react";
import { DataCxt } from "../context/DataProvider";
import axios from "axios";

const InputField = () => {
  const { msgSubmit, setMsgSubmit, value, setValue, resMsg, setResMsg } =
    useContext(DataCxt);
  const { chats, setChats, setIsTyping, currentTitle } = useContext(DataCxt);
  const { setCurrentTitle, setPreviousChats, setMessage } = useContext(DataCxt);
  const apiUrl = "http://localhost:8080/";
  const headers = {
    "Content-Type": "application/json",
  };
  useEffect(() => {
    if (!currentTitle && msgSubmit && chats) {
      setCurrentTitle(msgSubmit);
    }
    if (currentTitle && msgSubmit && chats) {
      setPreviousChats((prevChat) => [
        ...prevChat,
        {
          title: currentTitle,
          role: "user",
          content: msgSubmit,
        },
        {
          title: currentTitle,
          role: resMsg.role,
          content: resMsg.content,
        },
      ]);
    }
  }, [msgSubmit, currentTitle]);
  const submit = async (e, message) => {
    e.preventDefault();
    const v = e.target.message.value;
    setMessage(v);

    if (!message) return;
    setIsTyping(true);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);
    setValue("");

    try {
      const response = await axios.post(apiUrl, { chats }, { headers });
      msgs.push(response.data.output);

      setResMsg(response.data.output);
      setChats(msgs);
      setIsTyping(false);
      setMsgSubmit(v);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form action="" className="form_chat" onSubmit={(e) => submit(e, value)}>
      <div className="d-flex justify-content-center align-items-center tesssst">
        <div className="input_chat d-flex justify-content-center align-items-center gap-3 mx-3">
          <input
            type="text"
            name="message"
            value={value == null ? "" : value}
            placeholder="Type a message here and hit Enter..."
            onChange={(e) => setValue(e.target.value)}
          />
          <i className="fi fi-ss-paper-plane d-flex custom__icons"></i>
        </div>
      </div>
    </form>
  );
};

export default InputField;

// const submit = async (e, message) => {
//   e.preventDefault();

//   if (!message) return;
//   setIsTyping(true);

//   let msgs = chats;
//   msgs.push({ role: "user", content: message });
//   setChats(msgs);
//   setMessage("");
//   fetch("http://localhost:8080/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       chats,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       msgs.push(data.output);
//       setChats(msgs);
//       setIsTyping(false);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
