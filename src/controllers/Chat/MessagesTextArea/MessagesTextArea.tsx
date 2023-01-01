import { IoSend } from "react-icons/io5";
import IconButton from "../../../components/IconButton/IconButton";
import useOnChange from "../../../hooks/useOnChange";
import { useEffect, useRef } from "react";

export default function MessageTextArea() {
  const {
    values: { message },
    setValues,
    handleChange,
  } = useOnChange({ message: "" });
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "";
      textAreaRef.current.style.height =
        Math.min(textAreaRef.current.scrollHeight, 144) + "px";
    }
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.altKey && !event.shiftKey) {
      event.preventDefault();
      // sendMessage();
    }
    if (event.key === "Enter" && event.altKey) {
      event.preventDefault();
      setValues((values) => ({ message: values.message + "\r\n" }));
    }
  };

  useEffect(() => {
    resizeTextArea();
  }, [message]);

  return (
    <div className="flex items-center space-x-1">
      <textarea
        name="message"
        ref={textAreaRef}
        value={message}
        placeholder="Message"
        onChange={handleChange}
        onKeyDown={onKeyDown}
        className="h-10 max-h-36 w-full resize-none bg-level2 py-2 px-3 outline-none placeholder:text-quaternaryText"
      />
      {message !== "" && (
        <IconButton>
          <IoSend />
        </IconButton>
      )}
    </div>
  );
}
