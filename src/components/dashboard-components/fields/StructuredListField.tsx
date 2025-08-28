import { useEffect, useRef } from "react";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useFieldGroupsStore } from "../../util/useDashboardStore";
import { FieldType } from "../../util/ParseYextSchema";

interface StructuredFieldSchema {
  name: string;
  displayName: string;
  type: FieldType;
  options?: { label: string; value: string }[];
}

interface StructuredListFieldProps {
  fieldName: string;
  fields: StructuredFieldSchema[];
}

const StructuredListField = ({
  fieldName,
  fields,
}: StructuredListFieldProps) => {
  const { newValues, fieldValues, setNewValue } = useFieldGroupsStore();
  const dateRefs = useRef<(HTMLInputElement | null)[]>([]);

  const initial = fieldValues[fieldName];
  const current = newValues[fieldName];

  useEffect(() => {
    if (current === undefined) {
      setNewValue(
        fieldName,
        Array.isArray(initial) && initial.length ? initial : [{}]
      );
    }
  }, [fieldName]);

  const handleChange = (index: number, key: string, value: any) => {
    const updated = Array.isArray(current) ? [...current] : [];
    updated[index] = { ...updated[index], [key]: value };
    setNewValue(fieldName, updated);
  };

  const handleRemove = (index: number) => {
    if (Array.isArray(current)) {
      const updated = [...current];
      updated.splice(index, 1);
      if (updated.length === 0) updated.push({});
      setNewValue(fieldName, updated);
    }
  };

  const handleAdd = () => {
    const updated = Array.isArray(current) ? [...current, {}] : [{}];
    setNewValue(fieldName, updated);
  };

  const handleIconClick = (index: number) => {
    if (dateRefs.current[index]) {
      dateRefs.current[index]?.focus();
      setTimeout(() => {
        dateRefs.current[index]?.showPicker();
      }, 0);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      {Array.isArray(current) &&
        current.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 border rounded-md relative px-4 py-2.5"
          >
            {fields.map((field) => {
              const value = item[field.name] ?? "";
              if (field.type === "text") {
                return (
                  <div key={field.name}>
                    <label className="text-xs font-bold">
                      {field.displayName}
                    </label>
                    <input
                      className="border w-full border-[#dadce0] h-[30px] rounded-md py-1.5 pl-2.5 mt-1 text-xs"
                      value={value}
                      onChange={(e) =>
                        handleChange(index, field.name, e.target.value)
                      }
                    />
                  </div>
                );
              }
              if (field.type === "date") {
                return (
                  <div key={field.name} className="flex flex-col">
                    <label className="text-xs font-bold">
                      {field.displayName}
                    </label>
                    <div className="flex items-center border w-fit bg-white border-[#dadce0] h-[30px] rounded-md py-1.5 px-2.5 mt-1">
                      <input
                        ref={(el) => (dateRefs.current[index] = el)}
                        type="date"
                        className="text-xs appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                        value={value}
                        onChange={(e) =>
                          handleChange(index, field.name, e.target.value)
                        }
                      />
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="cursor-pointer"
                        onClick={() => handleIconClick(index)}
                      >
                        <path
                          d="M15.5 10.563c0 .309-.253.562-.563.562H9.314a.564.564 0 0 1-.563-.563c0-.309.253-.562.563-.562h5.624c.31 0 .563.253.563.563ZM4.812 15.625a.563.563 0 0 1 0-1.125h5.625c.31 0 .563.253.563.563 0 .309-.253.562-.563.562H4.814Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                );
              }
              if (field.type === "multiselect" && field.options) {
                const selectedValues = value;
                return (
                  <div key={field.name}>
                    <label className="text-xs font-bold">
                      {field.displayName}
                    </label>
                    <div className="mt-1">
                      {field.options.map((opt, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <input
                            type="checkbox"
                            checked={selectedValues?.includes(opt.value)}
                            onChange={() => {
                              let updatedValues = Array.isArray(selectedValues)
                                ? [...selectedValues]
                                : [];
                              if (updatedValues.includes(opt.value)) {
                                updatedValues = updatedValues.filter(
                                  (v) => v !== opt.value
                                );
                              } else {
                                updatedValues.push(opt.value);
                              }
                              handleChange(index, field.name, updatedValues);
                            }}
                          />
                          <span className="text-xs">{opt.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            })}
            <TrashIcon
              className="w-3 h-3 hover:cursor-pointer absolute top-2 right-2"
              onClick={() => handleRemove(index)}
            />
          </div>
        ))}
      <button
        type="button"
        onClick={handleAdd}
        className="text-left text-xs text-[#5A58F2] mt-2 hover:underline"
      >
        + Add an item
      </button>
    </div>
  );
};

export default StructuredListField;
