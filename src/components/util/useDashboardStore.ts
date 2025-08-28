import { create } from "zustand";
import { FieldSchema } from "./ParseYextSchema";

export const getTextColor = (bgColor: string): string => {
  if (typeof bgColor !== "string" || !bgColor.startsWith("#")) {
    console.warn("Invalid backgroundColor:", bgColor);
    return "#000000";
  }

  const hex = bgColor.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  return luminance > 0.5 ? "#000000" : "#FFFFFF";
};

interface FieldGroupsStore {
  editingField: string | null;
  fieldApiTypes: Record<string, FieldSchema>;
  fieldApi: string;
  fieldValues: Record<string, any>;
  newValues: Record<string, any>;
  entityId: string;
  isEditing: boolean;
  isAdmin: boolean;
  backgroundColor: string | undefined;
  stylesheetRef: string;
  setStylesheetRef: (stylesheetRef: string) => void;
  setEditingField: (field: string | null) => void;
  setFieldApiType: (field: string, schema: FieldSchema) => void;
  setFieldApi: (fieldApi: string) => void;
  setFieldValue: (field: string, value: any) => void;
  setNewValue: (field: string, value: any) => void;
  setEntityId: (entityId: string) => void;
  setIsEditing: (flag: boolean) => void;
  setIsAdmin: (flag: boolean) => void;
  resetFieldValues: () => void;
  setBackgroundColor: (color: string) => void;
  portalPreviewValues: Record<string, any>;
  setPortalPreviewValue: (field: string, value: any) => void;
}

const DEFAULT_BG = "#ffffff";

export const useFieldGroupsStore = create<FieldGroupsStore>((set) => ({
  editingField: null,
  fieldApiTypes: {},
  fieldApi: "",
  fieldValues: {},
  newValues: {},
  entityId: "",
  isEditing: false,
  isAdmin: true,
  backgroundColor: DEFAULT_BG,
  portalPreviewValues: {},
  stylesheetRef: "",
  setEditingField: (field) => set({ editingField: field }),

  setFieldApiType: (field, schema) =>
    set((state) => ({
      fieldApiTypes: { ...state.fieldApiTypes, [field]: schema },
    })),

  setFieldApi: (fieldApi) => set({ fieldApi }),

  setFieldValue: (field, value) =>
    set((state) => ({
      fieldValues: { ...state.fieldValues, [field]: value },
      portalPreviewValues: { ...state.portalPreviewValues, [field]: value },
    })),

  setNewValue: (field, value) =>
    set((state) => ({
      newValues: { ...state.newValues, [field]: value },
      portalPreviewValues: { ...state.portalPreviewValues, [field]: value },
    })),

  setEntityId: (entityId) => set({ entityId }),
  setIsEditing: (flag) => set({ isEditing: flag }),
  setIsAdmin: (flag) => set({ isAdmin: flag }),

  resetFieldValues: () =>
    set({
      fieldValues: {},
      newValues: {},
      editingField: null,
    }),

  setBackgroundColor: (color) => set({ backgroundColor: color }),
  setPortalPreviewValue: (field, value) =>
    set((state) => ({
      portalPreviewValues: { ...state.portalPreviewValues, [field]: value },
    })),
  setStylesheetRef: (stylesheetRef) => set({ stylesheetRef }),
}));
