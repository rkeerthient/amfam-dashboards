import { FieldCompletionProps } from "../../types/Dashboard";

const IncompleteFields = ({
  missingFields,
}: {
  missingFields: FieldCompletionProps[];
}) => {
  return (
    <div className="flex flex-col gap-4 border p-5  bg-white">
      <div className="font-bold text-gray-900">Remaining Incomplete Fields</div>
      <div className="text-gray-900">
        Fill out the required fields listed below to complete your profile
      </div>
      <div className="flex gap-1 flex-col text-sm">
        {missingFields.map((item) => (
          <div className="flex gap-2 items-center" key={item.field}>
            <p className="pl-2"> - </p>
            <p>{item.name}</p>
            <p className="text-sm font-light text-gray-500">({item.field})</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncompleteFields;
