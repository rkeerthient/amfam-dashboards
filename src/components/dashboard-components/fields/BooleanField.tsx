import { Fragment, useEffect, useMemo } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useFieldGroupsStore } from "../../util/useDashboardStore";
import { CompProps } from "../../../types/Dashboard";

type BoolOption = { label: "Yes" | "No"; value: boolean };

const BOOLEAN_OPTIONS: BoolOption[] = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

function normalizeToBoolean(input: unknown): boolean | undefined {
  if (typeof input === "boolean") return input;
  if (typeof input === "number") {
    if (input === 1) return true;
    if (input === 0) return false;
  }
  if (typeof input === "string") {
    const s = input.trim().toLowerCase();
    if (s === "yes" || s === "true" || s === "1") return true;
    if (s === "no" || s === "false" || s === "0") return false;
  }
  return undefined;
}

interface BooleanFieldProps extends CompProps {
  defaultToYes?: boolean;
  className?: string;
  disabled?: boolean;
}

const BooleanField = ({
  fieldName,
  defaultToYes = false,
  className = "",
  disabled = false,
}: BooleanFieldProps) => {
  const { newValues, fieldValues, setNewValue } = useFieldGroupsStore();
  const rawCurrent = newValues[fieldName] ?? fieldValues[fieldName];
  const normalizedCurrent = normalizeToBoolean(rawCurrent);

  const selected: BoolOption = useMemo(() => {
    if (normalizedCurrent === true) return BOOLEAN_OPTIONS[0];
    if (normalizedCurrent === false) return BOOLEAN_OPTIONS[1];
    return defaultToYes ? BOOLEAN_OPTIONS[0] : BOOLEAN_OPTIONS[1];
  }, [normalizedCurrent, defaultToYes]);

  useEffect(() => {
    if (normalizedCurrent === undefined) {
      setNewValue(fieldName, defaultToYes);
    }
  }, [normalizedCurrent, defaultToYes, fieldName, setNewValue]);

  return (
    <div className={`relative z-[60] m-auto flex w-full text-xs ${className}`}>
      <Listbox
        as="div"
        className="flex items-center w-full"
        value={selected}
        onChange={(opt: BoolOption) => setNewValue(fieldName, opt.value)}
        disabled={disabled}
      >
        <div className="relative h-fit z-[60] w-1/4 min-w-40 border bg-white rounded-md">
          <ListboxButton
            className={`flex w-full items-center justify-between rounded-md py-2 pl-3 pr-10 text-left text-xs
              ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            <span className="truncate">{selected.label}</span>
            <ChevronDownIcon className="h-5 w-5 text-gray-400 absolute right-2" />
          </ListboxButton>
          {!disabled && (
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute z-50 mt-1 w-full max-h-60 overflow-auto bg-white rounded-md shadow-lg ring-1 ring-black/5 text-xs">
                {BOOLEAN_OPTIONS.map((option, idx) => (
                  <ListboxOption
                    key={idx}
                    value={option}
                    className={({ active }) =>
                      `px-4 py-2 select-none cursor-pointer ${
                        active ? "bg-amber-100 text-amber-900" : ""
                      }`
                    }
                  >
                    {option.label}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          )}
        </div>
      </Listbox>
    </div>
  );
};

export default BooleanField;
