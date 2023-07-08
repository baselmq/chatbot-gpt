import { createContext, useState } from "react";

export const DataCxt = createContext("");
DataCxt.displayName = "Data";

const DataContextProvider = (props) => {
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  //   const getEmail = () => setEmail(email);
  const value = { chats, setChats, isTyping, setIsTyping };
  return <DataCxt.Provider value={value}>{props.children}</DataCxt.Provider>;
};

export default DataContextProvider;
