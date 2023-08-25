import { createContext, useEffect, useState } from "react";

export const DataCxt = createContext("");
DataCxt.displayName = "Data";

const DataContextProvider = (props) => {
  const [message, setMessage] = useState(null);
  const [value, setValue] = useState("");
  const [streamData, setStreamData] = useState("");
  const [saveValue, setSaveValue] = useState("");
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (value !== "" && value !== null) {
      setSaveValue(value);
    }
  }, [value]);

  const values = {
    streamData,
    setStreamData,
    saveValue,
    setSaveValue,
    value,
    setValue,
    message,
    setMessage,
    isTyping,
    setIsTyping,
    previousChats,
    setPreviousChats,
    currentTitle,
    setCurrentTitle,
  };

  return <DataCxt.Provider value={values}>{props.children}</DataCxt.Provider>;
};

export default DataContextProvider;
