import { useEffect, useRef } from "react";
import { useFieldGroupsStore } from "../../util/useDashboardStore";
import { CompProps } from "../../../types/Dashboard";

const TextField = ({ fieldName }: CompProps) => {
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
      type={fieldName === "c_color" ? "color" : "text"}
      ref={inputRef}
      className={`${fieldName === "c_color" ? `w-8 p-1` : `w-full  py-1.5 pl-2.5`} border mb-2.5 bg-white  border-[#dadce0] h-[30px] rounded-md`}
      value={
        fieldName === "yearsOfExperience"
          ? currentValue.toString()
          : currentValue
      }
      onChange={(e) =>
        setNewValue(
          fieldName,
          fieldName === "yearsOfExperience"
            ? parseInt(e.currentTarget.value)
            : e.currentTarget.value
        )
      }
    />
  );
};

export default TextField;
