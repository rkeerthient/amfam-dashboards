import { useEffect, useRef } from "react";
import { useFieldGroupsStore } from "../../util/useDashboardStore";
import { CompProps } from "../../../types/Dashboard";
import { TrashIcon } from "@heroicons/react/24/outline";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQsField = ({ fieldName }: CompProps) => {
  const { newValues, fieldValues, setNewValue } = useFieldGroupsStore();

  const currentValue: FAQItem[] = newValues[fieldName] ?? [];
  const initialValue: FAQItem[] = fieldValues[fieldName] ?? [];

  useEffect(() => {
    if (newValues[fieldName] === undefined) {
      if (Array.isArray(initialValue) && initialValue.length > 0) {
        const sanitized = initialValue.map((it: any) => ({
          question: String(it?.question ?? ""),
          answer: String(it?.answer ?? ""),
        }));
        setNewValue(fieldName, sanitized);
      } else {
        setNewValue(fieldName, [{ question: "", answer: "" }]);
      }
    }
  }, [fieldName]);

  const handleChange = (index: number, key: keyof FAQItem, value: string) => {
    const updated = [...currentValue];
    const row = { ...(updated[index] ?? { question: "", answer: "" }) };
    row[key] = value;
    updated[index] = row;
    setNewValue(fieldName, updated);
  };

  const handleRemove = (index: number) => {
    const updated = [...currentValue];
    updated.splice(index, 1);
    setNewValue(
      fieldName,
      updated.length > 0 ? updated : [{ question: "", answer: "" }]
    );
  };

  const addItem = () => {
    setNewValue(fieldName, [...currentValue, { question: "", answer: "" }]);
  };

  return (
    <>
      {currentValue.map((row, i) => (
        <div className="flex w-full justify-between" key={i}>
          <div className="bg-white w-full border p-4 flex flex-col rounded-md mb-3.5">
            <div>
              <div className="flex flex-col mb-2.5">
                <label
                  htmlFor={`faq-question-${i}`}
                  className="text-sm font-semibold mb-1"
                >
                  Question
                </label>
                <input
                  id={`faq-question-${i}`}
                  value={row?.question ?? ""}
                  onChange={(e) =>
                    handleChange(i, "question", e.currentTarget.value)
                  }
                  placeholder="Question"
                  className="border w-full border-[#dadce0] h-[30px] rounded-md py-1.5 pl-2.5"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor={`faq-answer-${i}`}
                  className="text-sm font-semibold  mb-1"
                >
                  Answer
                </label>
                <textarea
                  id={`faq-answer-${i}`}
                  value={row?.answer ?? ""}
                  onChange={(e) =>
                    handleChange(i, "answer", e.currentTarget.value)
                  }
                  placeholder="Answer"
                  className="border w-full border-[#dadce0] rounded-md py-1.5 pl-2.5 min-h-[72px]"
                />
              </div>
            </div>
          </div>
          <div className="p-2">
            <TrashIcon
              onClick={() => handleRemove(i)}
              className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer"
              aria-hidden="true"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="text-left text-xs text-[#5A58F2] mt-1 mb-3 hover:underline"
      >
        + Add a Q&A
      </button>
    </>
  );
};

export default FAQsField;
