import { useEffect, useRef } from "react";
import { useFieldGroupsStore } from "../../util/useDashboardStore";
import { CompProps } from "../../../types/Dashboard";

const TextAreaField = ({ fieldName }: CompProps) => {
  const { setNewValue, fieldValues, newValues } = useFieldGroupsStore();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const initialValue = fieldValues[fieldName] ?? "";
  const currentValue = newValues[fieldName] ?? "";
  useEffect(() => {
    setNewValue(fieldName, initialValue);
    inputRef.current?.focus();
  }, [fieldName]);

  return (
    <textarea
      ref={inputRef}
      rows={3}
      className="border mb-2.5 w-full border-[#dadce0] rounded-md py-1.5 pl-2.5"
      value={currentValue}
      onChange={(e) => setNewValue(fieldName, e.currentTarget.value)}
    />
  );
};

export default TextAreaField;
