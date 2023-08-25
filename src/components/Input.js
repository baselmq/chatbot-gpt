import { useContext, useEffect, useState } from "react";
import { DataCxt } from "../context/DataProvider";

const API_KEY = "";
const InputField = () => {
  const [streamComplete, setStreamComplete] = useState(false);
  const {
    streamData,
    setStreamData,
    saveValue,
    value,
    setValue,
    message,
    setMessage,
    setIsTyping,
    setPreviousChats,
    currentTitle,
    setCurrentTitle,
  } = useContext(DataCxt);

  useEffect(() => {
    if (streamComplete) {
      setMessage(streamData);
      setStreamData("");
      setStreamComplete(false);
      setIsTyping(false);
    }
  }, [streamComplete, streamData]);

  useEffect(() => {
    if (!currentTitle && saveValue && message) {
      setCurrentTitle(saveValue);
    }
    if (currentTitle && saveValue && message) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: "user",
          content: saveValue,
        },
        {
          title: currentTitle,
          role: "assistant",
          content: message,
        },
      ]);
    }
  }, [message, currentTitle]);

  const submit = async (e) => {
    e.preventDefault();
    if (!value) return;
    setValue("");
    setIsTyping(true);

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: value }],
        stream: true,
      }),
    };
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        options
      );
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      while (true) {
        const chunk = await reader.read();
        const { done, value } = chunk;

        if (done) {
          break;
        }
        const decodedChunk = decoder.decode(value);

        const lines = decodedChunk.split("\n");

        const parsedLines = lines
          .map((line) => line.replace(/^data: /, "").trim())
          .filter((line) => line !== "" && line !== "[DONE]")
          .map((line) => JSON.parse(line));

        for (const parsedLine of parsedLines) {
          const { choices } = parsedLine;
          const { delta } = choices[0];
          const { content } = delta;
          if (content) {
            setStreamData((prevData) => prevData + content);
          }
        }
        // Check if stream is complete
        const lastLine = parsedLines[parsedLines.length - 1];
        const { choices } = lastLine;
        const { finish_reason } = choices[0];
        if (finish_reason && finish_reason === "stop") {
          setStreamComplete(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form action="" className="form_chat" onSubmit={(e) => submit(e)}>
      <div className="container_input_chat">
        <div className="input_chat d-flex justify-content-center align-items-center gap-3 mx-3 ">
          <input
            type="text"
            name="message"
            value={value}
            placeholder="Type a message here and hit Enter..."
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="custom-btn-submit" onClick={(e) => submit(e)}>
            <i className="fi fi-ss-paper-plane d-flex custom__icons"></i>
          </div>
        </div>
      </div>
    </form>
  );
};

export default InputField;
