import { useRef, useEffect } from "react";
import { InputIcon } from "./InputIcon";
import { InputIconEnum } from "../utils/enums";

export default function UserInput({ value, onChange, placeholder, onSend, eraseLastMessage, retry, continueChat}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <div className="user-input-area">
      <textarea
        className="user-input"
        ref={textareaRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
      />
      <div className="user-input-icons">
        <InputIcon icon={InputIconEnum.SEND} onClick={onSend} />
        <InputIcon icon={InputIconEnum.DELETE}  onClick={eraseLastMessage} />
        <InputIcon icon={InputIconEnum.REGENERATE} onClick={retry} />
        <InputIcon icon={InputIconEnum.CONTINUE} onClick={continueChat} />
      </div>
    </div>
  );
}
