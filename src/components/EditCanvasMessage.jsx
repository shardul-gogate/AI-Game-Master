import { useRef, useEffect } from "react";
import { InputIcon } from "./InputIcon";
import { InputIconEnum } from "../utils/enums";

export default function EditCanvasMessage({ value, onChange, onConfirmEdit, onDiscard }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <div className="canvas-message-edit-area">
      <textarea
        className="canvas-message-edit"
        ref={textareaRef}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <div className="canvas-input-icons">
        <InputIcon icon={InputIconEnum.DONE} onClick={() => onConfirmEdit(textareaRef.current.value)} />
        <InputIcon icon={InputIconEnum.CANCEL} onClick={onDiscard} />
      </div>
    </div>
  );
}
