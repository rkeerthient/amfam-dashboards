import { useEffect } from "react";
import { useFieldGroupsStore } from "../../util/useDashboardStore";
import { CompProps } from "../../../types/Dashboard";

interface Option {
  label: string;
  value: string;
}

interface MultiselectPicklistFieldProps extends CompProps {
  options: Option[];
}

const MultiselectPicklistField = ({
  fieldName,
  options,
}: MultiselectPicklistFieldProps) => {
  const { newValues, fieldValues, setNewValue } = useFieldGroupsStore();

  const currentValue = newValues[fieldName];
  const initialValue = fieldValues[fieldName];

  useEffect(() => {
    if (currentValue === undefined) {
      setNewValue(fieldName, Array.isArray(initialValue) ? initialValue : []);
    }
  }, [fieldName]);

  const handleChange = (value: string) => {
    if (Array.isArray(currentValue)) {
      if (currentValue.includes(value)) {
        setNewValue(
          fieldName,
          currentValue.filter((item: string) => item !== value)
        );
      } else {
        setNewValue(fieldName, [...currentValue, value]);
      }
    } else {
      setNewValue(fieldName, [value]);
    }
  };

  return (
    <>
      {Array.isArray(currentValue) &&
        options.map((option, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="checkbox"
              id={`checkbox-${i}`}
              checked={currentValue.includes(option.value)}
              onChange={() => handleChange(option.value)}
            />
            <label htmlFor={`checkbox-${i}`}>{option.label}</label>
          </div>
        ))}
    </>
  );
};

export default MultiselectPicklistField;
