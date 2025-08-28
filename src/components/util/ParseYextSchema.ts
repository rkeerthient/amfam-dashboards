export type FieldType =
  | "text"
  | "textarea"
  | "array"
  | "select"
  | "multiselect"
  | "richTextV2"
  | "structuredListField"
  | "date"
  | "image"
  | "entityRelationship"
  | "custom";

export interface FieldSchema {
  id: string;
  displayName: string;
  type: FieldType;
  options?: { label: string; value: string }[];
  fields?: {
    name: string;
    displayName: string;
    type: FieldType;
    options?: { label: string; value: string }[];
  }[];
}

interface YextSchemaField {
  response: {
    $id: string;
    displayName: string;
    typeId: string;
    type: any;
  };
}

export const ParseYextSchema = async (
  schema: YextSchemaField[]
): Promise<FieldSchema[]> => {
  const fields = await Promise.all(
    schema.map(async (field) => {
      const { $id, displayName, type } = field.response;

      if (type?.stringType) {
        if (type.stringType.stereotype === "MULTILINE") {
          return {
            id: $id,
            displayName,
            type: "textarea" as FieldType,
          };
        } else {
          return {
            id: $id,
            displayName,
            type: "text" as FieldType,
          };
        }
      }
      if (type?.imageType) {
        return {
          id: $id,
          displayName,
          type: "image" as FieldType,
        };
      }

      if (type?.optionType) {
        const options = type.optionType.option.map(
          (opt: { displayName: string; textValue: string }) => ({
            label: opt.displayName,
            value: opt.textValue,
          })
        );
        return {
          id: $id,
          displayName,
          type: "select" as FieldType,
          options,
        };
      }

      if (type?.richTextV2Type) {
        return {
          id: $id,
          displayName,
          type: "richTextV2" as FieldType,
        };
      }

      if (type?.listType) {
        const listType = type.listType;

        if (listType?.typeId.includes("c_")) {
          try {
            const response = await fetch(
              `/api/getFieldType/${listType.typeId}`
            );
            const res = await response.json();

            if (res?.response?.type?.structType?.property) {
              const structProps = res.response.type.structType.property;

              const structuredFields = structProps.map((prop: any) => {
                if (prop.type?.stringType) {
                  return {
                    name: prop.name,
                    displayName: prop.displayName,
                    type: "text" as FieldType,
                  };
                }
                if (prop.typeId === "date") {
                  return {
                    name: prop.name,
                    displayName: prop.displayName,
                    type: "date" as FieldType,
                  };
                }

                if (prop.type?.listType?.type?.optionType?.option) {
                  const options = prop.type.listType.type.optionType.option.map(
                    (opt: { displayName: string; textValue: string }) => ({
                      label: opt.displayName,
                      value: opt.textValue,
                    })
                  );

                  return {
                    name: prop.name,
                    displayName: prop.displayName,
                    type: "multiselect" as FieldType,
                    options,
                  };
                }

                return {
                  name: prop.name,
                  displayName: prop.displayName,
                  type: "text" as FieldType,
                };
              });

              return {
                id: $id,
                displayName,
                type: "structuredListField" as FieldType,
                fields: structuredFields,
              };
            }
          } catch (err) {
            console.error("Save failed", err);
          }
        }

        if (listType?.type?.optionType?.option) {
          const options = listType.type.optionType.option.map(
            (opt: { displayName: string; textValue: string }) => ({
              label: opt.displayName,
              value: opt.textValue,
            })
          );
          return {
            id: $id,
            displayName,
            type: "multiselect" as FieldType,
            options,
          };
        }

        if (listType?.type?.stringType) {
          return {
            id: $id,
            displayName,
            type: "array" as FieldType,
          };
        }
        if (listType?.type?.entityReferenceType) {
          return {
            id: $id,
            displayName,
            type: "entityRelationship" as FieldType,
          };
        }
      }

      return {
        id: $id,
        displayName,
        type: "text" as FieldType,
      };
    })
  );

  return fields;
};
