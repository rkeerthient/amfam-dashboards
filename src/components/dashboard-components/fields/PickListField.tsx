import { useEffect, Fragment } from "react";
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

interface Option {
  label: string;
  value: string | boolean;
}

interface PicklistFieldProps extends CompProps {
  options: Option[];
}

const PicklistField = ({ options, fieldName }: PicklistFieldProps) => {
  const { newValues, fieldValues, setNewValue } = useFieldGroupsStore();

  const currentValue = newValues[fieldName];
  const initialValue = fieldValues[fieldName];

  useEffect(() => {
    if (currentValue === undefined && options.length > 0) {
      const matched = options.find((opt) => opt.value === initialValue);
      setNewValue(fieldName, matched?.value ?? options[0].value);
    }
  }, [currentValue, fieldName, initialValue, options, setNewValue]);

  const selected =
    options.find((opt) => opt.value === currentValue) ?? options[0];

  return (
    <div className="relative z-[60] m-auto flex flex-1 w-full text-xs flex-col">
      <Listbox
        as={"div"}
        className={"flex items-center"}
        value={selected}
        onChange={(option: Option) => setNewValue(fieldName, option.value)}
      >
        <div className="relative h-fit z-[60] w-1/4 border bg-white">
          <ListboxButton className="flex w-full items-center justify-between bg-fieldBlurBorder rounded-md py-2 pl-3 pr-10 text-left text-xs">
            <span className="truncate">{selected.label}</span>
            <ChevronDownIcon className="h-5 w-5 text-gray-400 absolute right-2" />
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-50 mt-1 w-full max-h-60 overflow-auto bg-white rounded-md shadow-lg ring-1 ring-black/5 text-xs">
              {options.map((option, idx) => (
                <ListboxOption
                  key={idx}
                  value={option}
                  className={({ active }) =>
                    `cursor-pointer select-none px-4 py-2 ${
                      active ? "bg-amber-100 text-amber-900" : ""
                    }`
                  }
                >
                  {option.label}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
        {fieldName === "c_fonts" && (
          <div
            className="max-w-[500px] mx-auto break-words text-base leading-relaxed ml-8"
            style={{
              ...(selected?.label && {
                fontFamily: `${selected.label}`,
              }),
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
            laudantium repudiandae amet voluptate iste nisi alias neque facilis
            unde dignissimos quisquam eos sapiente nobis porro deserunt, commodi
            sed natus dolorum!
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default PicklistField;
