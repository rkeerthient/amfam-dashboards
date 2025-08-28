import { TrashIcon } from "@heroicons/react/24/outline";
import { FetchedEntityProps } from "./EntityField";
import { formatEntityName } from "../../common/DisplayData";

const EntityCard = ({
  item,
  onRemove,
}: {
  item: FetchedEntityProps;
  onRemove: () => void;
}) => (
  <div className="flex w-full justify-between">
    <div className="bg-white w-full border p-5 flex flex-col rounded-md mb-3.5">
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
    <div className="p-2">
      <TrashIcon
        onClick={onRemove}
        className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer"
        aria-hidden="true"
      />
    </div>
  </div>
);

export default EntityCard;
