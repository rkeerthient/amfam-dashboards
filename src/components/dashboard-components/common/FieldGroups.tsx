import { useEffect } from "react";
import { Task } from "../../../types/Dashboard";
import Section from "../Section";
import TextField from "../fields/TextField";
import TextList from "../fields/TextList";
import DisplayData from "./DisplayData";
import { FieldSchema, ParseYextSchema } from "../../util/ParseYextSchema";
import PicklistField from "../fields/PickListField";
import TextAreaField from "../fields/TextAreaField";
import LexicalRichTextEditor from "../fields/LexicalRichText/LexicalRichTextEditor";
import Buttons from "./Buttons";
import { useFieldGroupsStore } from "../../util/useDashboardStore";
import MultiselectPicklistField from "../fields/MultiselectPicklist";
import StructuredListField from "../fields/StructuredListField";
import PhotoField from "../fields/PhotoField";
import EntityField from "../fields/entityField/EntityField";
import FAQsField from "../fields/FAQsField";
import BooleanField from "../fields/BooleanField";

interface TasksProp {
  tasks: Task[];
  document: any;
}

const FieldGroups = ({ tasks, document }: TasksProp) => {
  const {
    editingField,
    fieldApiTypes,
    fieldValues,
    setEditingField,
    setFieldApiType,
    setFieldApi,
    setFieldValue,
    setNewValue,
  } = useFieldGroupsStore();

  useEffect(() => {
    tasks.forEach((task) => {
      const value = document[task.field];
      if (fieldValues[task.field] === undefined) {
        setFieldValue(task.field, value);
        setNewValue(task.field, value);
      }
    });
  }, [tasks, document]);

  useEffect(() => {
    const fetchFieldType = async () => {
      if (editingField && !fieldApiTypes[editingField]) {
        const apiFieldType = await getFieldTypeFromAPI(editingField);
        if (apiFieldType) {
          setFieldApiType(editingField, apiFieldType);
          setFieldApi(editingField);
        }
      }
    };
    fetchFieldType();
  }, [editingField, fieldApiTypes, setFieldApiType]);

  return (
    <div className="flex flex-col">
      {tasks.map((item, index) => {
        const isEditing = editingField === item.field;
        const initialValue = document[item.field];
        const fieldType = getFieldType(initialValue);
 
        const fieldApiType = fieldApiTypes[item.field];

        return (
          <Section
            key={index}
            isLast={tasks.length - 1 === index}
            isEditing={isEditing}
          >
            <div className="flex justify-between w-full gap-4">
              <div className="flex flex-col w-[180px]">
                <p className="text-xs font-medium">{item.name}</p>
                <p className="text-[.6875rem] text-gray-500">{item.field}</p>
              </div>

              <div className="flex flex-1">
                {isEditing ? (
                  <div className="flex flex-1 w-min break-all text-xs flex-col">
                    {[
                      "hobbies",
                      "interests",
                      "languages",
                      "products",
                      "awards",
                      "services",
                      "specialities",
                      "certifications",
                      "associations",
                      "brands",
                    ].includes(item.field) || fieldApiType?.type === "array" ? (
                      <TextList fieldName={item.field} />
                    ) : fieldApiType?.type === "multiselect" ? (
                      <MultiselectPicklistField
                        fieldName={item.field}
                        options={fieldApiType.options || []}
                      />
                    ) : item.field === "frequentlyAskedQuestions" ? (
                      <FAQsField fieldName={item.field} />
                    ) : item.field === "headshot" ||
                      fieldApiType?.type === "image" ? (
                      <PhotoField fieldName={item.field} />
                    ) : fieldApiType?.type === "structuredListField" ? (
                      <StructuredListField
                        fieldName={item.field}
                        fields={fieldApiType?.fields ?? []}
                      />
                    ) : fieldApiType?.type === "richTextV2" ? (
                      <LexicalRichTextEditor fieldName={item.field} />
                    ) : fieldApiType?.type === "textarea" ? (
                      <TextAreaField fieldName={item.field} />
                    ) : fieldApiType?.type === "entityRelationship" ? (
                      <EntityField type={item.field} fieldName={item.field} />
                    ) : fieldApiType?.type === "select" ? (
                      <PicklistField
                        fieldName={item.field}
                        options={fieldApiType.options || []}
                      />
                    ) : fieldApiType?.type === "booleanType" ? (
                      <BooleanField fieldName={item.field} />
                    ) : item.field === "yearsOfExperience" ||
                      item.field === "nmlsNumber" ||
                      fieldType === "text" ||
                      fieldApiType?.type === "text" ? (
                      <TextField fieldName={item.field} />
                    ) : null}
                    <Buttons fieldName={item.field} />
                  </div>
                ) : (
                  <DisplayData
                    fieldName={item.field}
                    type={fieldType}
                    onEdit={() => setEditingField(item.field)}
                  />
                )}
              </div>
            </div>
          </Section>
        );
      })}
    </div>
  );
};

export default FieldGroups;

const getFieldType = (
  fieldValue: any
):
  | "text"
  | "array"
  | "custom"
  | "entityRelation"
  | "multiselect"
  | "richTextV2"
  | "image"
  | "unknown"
  | "booleanType" => {
 
  if (typeof fieldValue === "string") {
    return "text";
  }

  if (typeof fieldValue === "boolean") {
    return "booleanType";
  }

  if (Array.isArray(fieldValue)) {
    if (fieldValue.every((item) => typeof item === "string")) {
      return "array";
    } else if (
      fieldValue.every(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          "meta" in item &&
          item.meta?.entityType
      )
    ) {
      return "entityRelation";
    } else if (fieldValue.every((item) => typeof item === "object")) {
      return "custom";
    } else {
      return "unknown";
    }
  }

  if (typeof fieldValue === "object" && fieldValue !== null) {
    if ("json" in fieldValue) {
      return "richTextV2";
    }
    if (
      "url" in fieldValue &&
      ("height" in fieldValue || "width" in fieldValue)
    ) {
      return "image";
    }
    return "custom";
  }

  return "unknown";
};

const getFieldTypeFromAPI = async (
  fieldApi: string
): Promise<FieldSchema | undefined> => {
  try {
    const response = await fetch(`/api/getField/${fieldApi}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch schema for field ${fieldApi}`);
    }

    const data = await response.json();
    const parsedFields = await ParseYextSchema([data]);

    return parsedFields[0];
  } catch (error) {
    console.error("Error in getFieldTypeFromAPI:", error);
    return undefined;
  }
};
