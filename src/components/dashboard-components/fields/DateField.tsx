import { useEffect, useRef } from "react";
import { useFieldGroupsStore } from "../../util/useDashboardStore";
import { CompProps } from "../../../types/Dashboard";

const DateField = ({ fieldName }: CompProps) => {
  const { setNewValue, fieldValues, newValues } = useFieldGroupsStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const initialValue = fieldValues[fieldName] ?? "";
  const currentValue = newValues[fieldName] ?? "";
  useEffect(() => {
    setNewValue(fieldName, initialValue);
    inputRef.current?.focus();
  }, [fieldName]);

  return (
    <input
      type="date"
      ref={inputRef}
      className="border mb-2.5 border-[#dadce0] h-[30px] rounded-md py-1.5 pl-2.5 w-40"
      value={currentValue}
      onChange={(e) => setNewValue(fieldName, e.currentTarget.value)}
    />
  );
};

export default DateField;
