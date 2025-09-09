type ApprovalProps = {
  entityId: string;
  averageRating: string;
};

const Approvals = ({ entityId, averageRating }: ApprovalProps) => {
  return (
    <div className="bg-white text-center text-gray-800 m-auto flex justify-center items-center w-1/5 px-4 py-8 mx-auto rounded-md">
      <div className="flex flex-col gap-4 w-full ">
        <div className="text-xl font-semibold">Entity Summary</div>
        <div className="w-full grid grid-cols-2 gap-4 justify-between">
          <a
            href="#"
            className="flex flex-col gap-2 items-center justify-center"
          >
            <div className="text-xl">0</div>
            <div className="text-sm">Live Listings</div>
          </a>
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="text-xl">4</div>
            <div className="text-sm">Average Rating</div>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="text-xl">0</div>
            <div className="text-sm">Pages Live</div>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="text-xl">1</div>
            <div className="text-sm">Users with Access</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Approvals;

//https://sandbox.yext.com/s/3356618/listings/all-listings#p0=specific&p1=contains&p2=1074570890&p3=-1&s0=0&l0=25&sortCol=default&sortDir=asc
