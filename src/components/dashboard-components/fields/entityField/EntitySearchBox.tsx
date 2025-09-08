import { useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { FetchedEntityProps } from "./EntityField";

interface EntitySearchBoxProps {
  type: string;
  existingEntities: FetchedEntityProps[];
  onSelect: (entity: FetchedEntityProps) => void;
  isAdmin: boolean;
  onAddEntity: () => void;
  hasFetched: boolean;
  setHasFetched: (value: boolean) => void;
  fetchedEntities: FetchedEntityProps[];
  setFetchedEntities: (value: FetchedEntityProps[]) => void;
}

const EntitySearchBox = ({
  type,
  existingEntities,
  onSelect,
  isAdmin,
  onAddEntity,
  hasFetched,
  setHasFetched,
  fetchedEntities,
  setFetchedEntities,
}: EntitySearchBoxProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setFetchedEntities([]);
        setHasFetched(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchEntities = async () => {
    setHasFetched(false);
    setFetchedEntities([]);

    try {
      const res = await fetch(`/api/getEntities/location`);
      const data = await res.json();

      const entities = data.response?.entities ?? [];

      const filtered = entities
        .filter(
          (e: any) => !existingEntities.some((n: any) => n.id === e.meta.id)
        )
        .map((e: any) => ({
          id: e.meta.id,
          name: e.name,
          meta: { entityType: { id: e.meta.entityType } },
        }));

      setFetchedEntities(filtered);
    } catch (e) {
      console.error("Entity fetch failed", e);
    } finally {
      setHasFetched(true);
    }
  };

  return (
    <div className="relative bg-white z-10">
      {!hasFetched && (
        <div className="border w-2/3 flex items-center bg-white">
          <input
            onClick={fetchEntities}
            placeholder="Search entities"
            type="text"
            className="p-1 mr-2.5 rounded-sm grow text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
          <div className="flex p-1">
            <FaSearch />
          </div>
        </div>
      )}

      {hasFetched && fetchedEntities.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 w-2/3 z-[9999] shadow-lg border border-gray-300 rounded-b-md overflow-auto"
        >
          <div className="absolute inset-0 bg-white z-[-1] rounded-b-md pointer-events-none" />

          {fetchedEntities.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelect(item)}
              className="px-3.5 pt-1 hover:bg-gray-100 cursor-pointer text-[11px] border-b"
            >
              <p className="font-bold truncate">{item.name}</p>
              <p className="text-gray-600">ID: {item.id}</p>
            </div>
          ))}

          {isAdmin && (
            <div className="bg-white border-t py-2 px-4 text-right">
              <button
                type="button"
                onClick={onAddEntity}
                className="text-xs text-[#5A58F2] hover:underline"
              >
                + Add Entity
              </button>
            </div>
          )}
        </div>
      )}

      {hasFetched && fetchedEntities.length === 0 && (
        <div className="p-2 text-xs text-gray-500 italic">
          All entities have been linked.
        </div>
      )}
    </div>
  );
};

export default EntitySearchBox;
