import { useState } from "react";
import { CompProps } from "../../../types/Dashboard";
import { useFieldGroupsStore } from "../../util/useDashboardStore";

const Buttons = ({ fieldName }: CompProps) => {
  const {
    newValues,
    fieldValues,
    setNewValue,
    setEditingField,
    setFieldValue,
    fieldApi,
    entityId,
    isAdmin,
    setBackgroundColor,
    backgroundColor,
    setPortalPreviewValue,
  } = useFieldGroupsStore();
  console.log(isAdmin, "-----");

  const [isSaving, setIsSaving] = useState(false);

  const newValue = newValues[fieldName];
  const originalValue = fieldValues[fieldName];

  const isUnchanged =
    JSON.stringify(newValue) === JSON.stringify(originalValue);

  const handleCancel = () => {
    setNewValue(fieldName, originalValue);
    setEditingField(null);
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const requestBody = JSON.stringify({
        [fieldApi]:
          fieldName === "c_linkedLocations"
            ? newValue.map((item: any) => item.id)
            : newValue,
      });

      const response = await fetch(
        `/api/saveEntity/${entityId}?userType=${isAdmin}&body=${requestBody}`
      );

      const result = await response.json();

      if (isAdmin) {
        setFieldValue(fieldName, newValue);
        if (
          fieldName === "c_color" &&
          typeof newValue === "string" &&
          /^#[0-9A-Fa-f]{6}$/.test(newValue)
        ) {
          setBackgroundColor(newValue);
        }
      }
      setPortalPreviewValue(fieldName, newValue);
      setEditingField(null);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex py-2.5">
      <button
        style={{
          background: backgroundColor,
          color: "white",
        }}
        disabled={isUnchanged || isSaving}
        className="h-[30px] rounded-2xl border px-4 py-2 flex items-center justify-center cursor-pointer disabled:bg-[#dadce0] disabled:text-[#97999d] disabled:cursor-not-allowed"
        onClick={handleSave}
      >
        {isSaving ? "Saving..." : isAdmin ? "Save" : "Create Suggestion"}
      </button>
      <button
        style={{
          color:
            typeof backgroundColor === "string" ? backgroundColor : "#5A58F2",
        }}
        className="h-[30px] px-4 py-2 flex items-center justify-center"
        onClick={handleCancel}
      >
        Cancel
      </button>
    </div>
  );
};

export default Buttons;
