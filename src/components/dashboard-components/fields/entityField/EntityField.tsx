import { useState, useEffect } from "react";
import { useFieldGroupsStore } from "../../../util/useDashboardStore";
import AddNewEntity from "../AddNewEntity";
import EntityCard from "./EntityCard";
import EntitySearchBox from "./EntitySearchBox";

export type FetchedEntityProps = {
  id: string;
  name: string;
  meta: { entityType: { id: string } };
};

interface EntityFieldProps {
  fieldName: string;
  type: string;
}

const EntityField = ({ fieldName, type }: EntityFieldProps) => {
  const [fetchedEntities, setFetchedEntities] = useState<FetchedEntityProps[]>(
    []
  );
  const [showAddButton, setShowAddButton] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const [isAddEntity, setAddEntity] = useState(false);

  const { newValues, fieldValues, setNewValue, isAdmin } =
    useFieldGroupsStore();
  const newValue = newValues[fieldName];
  const fieldValue = fieldValues[fieldName];

  useEffect(() => {
    if (newValue === undefined) {
      setNewValue(fieldName, fieldValue ?? []);
    }
  }, [fieldName]);

  const handleChange = (value: FetchedEntityProps) => {
    setNewValue(fieldName, [...(newValue || []), value]);
    setShowAddButton(true);
  };

  const handleRemove = (index: number) => {
    const updated = [...newValue];
    updated.splice(index, 1);
    setNewValue(fieldName, updated);
  };

  return (
    <>
      {Array.isArray(newValue) &&
        newValue.map((item, idx) => (
          <EntityCard
            key={idx}
            item={item}
            onRemove={() => handleRemove(idx)}
          />
        ))}

      {isAddEntity && (
        <AddNewEntity
          onClose={() => setAddEntity(false)}
          onEntityCreated={(newEntity: FetchedEntityProps) => {
            setNewValue(fieldName, [...(newValue || []), newEntity]);
            setAddEntity(false);
          }}
        />
      )}

      {!showAddButton && (
        <EntitySearchBox
          type={type}
          existingEntities={newValue || []}
          onSelect={handleChange}
          isAdmin={isAdmin}
          onAddEntity={() => setAddEntity(true)}
          hasFetched={hasFetched}
          setHasFetched={setHasFetched}
          fetchedEntities={fetchedEntities}
          setFetchedEntities={setFetchedEntities}
        />
      )}

      {showAddButton && (
        <button
          type="button"
          onClick={() => {
            setShowAddButton(false);
            setFetchedEntities([]);
            setHasFetched(false);
          }}
          className="text-left text-xs text-[#5A58F2] mt-1 mb-3 hover:underline"
        >
          + Add an item
        </button>
      )}
    </>
  );
};

export default EntityField;
