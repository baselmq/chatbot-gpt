import { createContext, useEffect, useState } from "react";

export const DataCxt = createContext("");
DataCxt.displayName = "Data";

const DataContextProvider = (props) => {
  const [resMsg, setResMsg] = useState(null);
  const [value, setValue] = useState(null);
  const [chats, setChats] = useState([]);
  const [msgSubmit, setMsgSubmit] = useState(null);
  const [message, setMessage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);

  const values = {
    resMsg,
    setResMsg,
    value,
    setValue,
    message,
    setMessage,
    chats,
    setChats,
    isTyping,
    setIsTyping,
    previousChats,
    setPreviousChats,
    currentTitle,
    setCurrentTitle,
    msgSubmit,
    setMsgSubmit,
  };
  useEffect(() => {}, []);
  return <DataCxt.Provider value={values}>{props.children}</DataCxt.Provider>;
};

export default DataContextProvider;
