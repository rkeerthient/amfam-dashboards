import { useFieldGroupsStore } from "../../util/useDashboardStore";
import { Image, LexicalRichText } from "@yext/pages-components";
import * as AutogenEnums from "../../../types/autogen";

interface DisplayDataProps {
  type:
    | "text"
    | "number"
    | "array"
    | "custom"
    | "entityRelation"
    | "select"
    | "multiselect"
    | "richTextV2"
    | "image"
    | "unknown";
  onEdit: () => void;
  fieldName: string;
}

const isEmpty = (val: any): boolean => {
  if (val == null) return true;
  if (typeof val === "string") return val.trim() === "";
  if (Array.isArray(val)) return val.length === 0;
  if (val?.json?.root) {
    const root = val.json.root;
    return (
      Array.isArray(root.children) &&
      root.children.length === 1 &&
      root.children[0].type === "paragraph" &&
      root.children[0].children?.length === 0
    );
  }
  if (typeof val === "object") return Object.keys(val).length === 0;
  return false;
};

const DisplayData = ({ type, onEdit, fieldName }: DisplayDataProps) => {
  const { fieldValues } = useFieldGroupsStore();
  const value = fieldValues[fieldName];
  console.log(JSON.stringify(value));

  const baseClass = `text-xs break-all w-full ${
    isEmpty(value) ? "text-[#8896a1]" : ""
  } cursor-pointer`;

  if (type === "text" || fieldName == "yearsOfExperience") {
    const enumMap = getEnumFromFieldName(fieldName);
    let displayValue = "Click to add";

    if (typeof value === "string" && value.trim().length > 0) {
      if (isEnumType(value) && enumMap) {
        displayValue = enumMap[value as keyof typeof enumMap] ?? value;
      } else {
        displayValue = value;
      }
    } else if (value) {
      displayValue = value.toString();
    }

    return (
      <div className={baseClass} onClick={onEdit}>
        {displayValue}
      </div>
    );
  }

  if (type === "array") {
    return (
      <div className={baseClass} onClick={onEdit}>
        {Array.isArray(value) && value.length > 0 ? (
          (() => {
            const enumMap = getEnumFromFieldName(fieldName);

            return isEnumType(value) && enumMap
              ? value.map((item: string, idx: number) => (
                  <div key={idx} className="block">
                    {enumMap[item as keyof typeof enumMap]}
                  </div>
                ))
              : value.map((item: string, idx: number) => (
                  <div key={idx} className="block">
                    {item}
                  </div>
                ));
          })()
        ) : (
          <div className="block">Click to add</div>
        )}
      </div>
    );
  }

  if (type === "custom") {
    return (
      <div className={baseClass} onClick={onEdit}>
        {Array.isArray(value) && value.length > 0
          ? value.map((item: any, idx: number) => {
              const entriesRaw = Object.entries(item);
              const entries =
                fieldName === "frequentlyAskedQuestions"
                  ? (() => {
                      const orderedKeys = ["question", "answer"] as const;
                      const ordered = orderedKeys
                        .map((k) => entriesRaw.find(([key]) => key === k))
                        .filter(Boolean) as [string, any][];
                      const rest = entriesRaw.filter(
                        ([k]) => !orderedKeys.includes(k as any)
                      );
                      return [...ordered, ...rest];
                    })()
                  : entriesRaw;

              return (
                <div key={idx} className="mb-2">
                  {entries.map(([key, val]: any, subIdx: number) => (
                    <div
                      key={subIdx}
                      className="text-xs flex flex-col border-l border-[#c4cbd0] pl-2 pb-2"
                    >
                      <span className="font-bold mb-0.5">
                        {titleCase(key)}:
                      </span>
                      <span>
                        {Array.isArray(val) ? (
                          val.map((v, vi) => <div key={vi}>{v}</div>)
                        ) : (
                          <div>{val}</div>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              );
            })
          : "Click to add"}
      </div>
    );
  }

  if (type === "entityRelation") {
    return (
      <div className={baseClass} onClick={onEdit}>
        {Array.isArray(value) && value.length > 0 ? (
          value.map((item: any, idx: number) => (
            <div
              key={idx}
              className="border p-5 flex flex-col rounded-md mb-3.5 mr-2.5"
            >
              <p className="text-[#5A58F2] mb-0.5 text-sm">{item.name}</p>
              <div className="flex">
                <p className="font-bold w-24">Entity Id</p>
                <p>{item.id}</p>
              </div>
              <div className="flex">
                <p className="font-bold w-24">Entity Type</p>
                <p>{formatEntityName(item.meta.entityType.id)}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="block">Click to add</div>
        )}
      </div>
    );
  }

  // if (type === "richTextV2") {
  //   return (
  //     <div className={baseClass} onClick={onEdit}>
  //       {value && !isEmpty(value) ? (
  //         <LexicalRichText serializedAST={JSON.stringify(value.json)} />
  //       ) : (
  //         "Click to add"
  //       )}
  //     </div>
  //   );
  // }

  if (type === "image") {
    return (
      <div className={baseClass} onClick={onEdit}>
        {value?.url ? (
          <div className="w-[150px] h-[150px] border flex items-center justify-center hover:ring-1 ring-[#5A58F2] rounded-sm">
            <Image image={value} />
          </div>
        ) : value ? (
          <div className="w-[150px] h-[150px] border flex items-center justify-center hover:ring-1 ring-[#5A58F2] rounded-sm">
            <img src={value} />
          </div>
        ) : (
          "Click to add"
        )}
      </div>
    );
  }

  return (
    <span className="text-xs text-gray-400 cursor-pointer" onClick={onEdit}>
      Click to add
    </span>
  );
};

export default DisplayData;

const isEnumType = (input: string | string[]): boolean => {
  const check = (val: string) => /^[A-Z0-9_]+$/.test(val.trim());
  return Array.isArray(input) ? input.every(check) : check(input);
};

const getEnumFromFieldName = (fieldName: string) => {
  const enumKey = fieldName.replace(/^c_/, "C_");
  return AutogenEnums[enumKey as keyof typeof AutogenEnums] ?? null;
};

export const formatEntityName = (input: string) => {
  return input
    .replace("ce_", "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (char) => char.toUpperCase());
};

function titleCase(s: string) {
  return s
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
