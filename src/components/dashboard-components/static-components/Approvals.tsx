const Approvals = () => {
  return (
    <div className="bg-white text-center text-gray-800 m-auto flex justify-center items-center w-2/5 py-8 mx-auto">
      <div className="flex flex-col gap-4 w-full px-4">
        <div className="text-xl font-semibold">Approval Requests </div>
        <div>Last 60 Days</div>
        <div className="w-full grid grid-cols-4 justify-between">
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="text-xl">0</div>
            <div className="text-sm">Pending</div>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3 text-orange-500"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="text-xl">4</div>
            <div className="text-sm">Approved</div>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3 text-green-500"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="text-xl">0</div>
            <div className="text-sm">Rejected</div>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="h-3 w-3 text-red-500"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeWidth="2"
                d="M7,7 L17,17 M7,17 L17,7"
              ></path>
            </svg>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="text-xl">1</div>
            <div className="text-sm">Cancelled</div>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              version="1"
              viewBox="0 0 48 48"
              enableBackground="new 0 0 48 48"
              className="h-3 w-3 text-gray-800"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#D50000"
                d="M24,6C14.1,6,6,14.1,6,24s8.1,18,18,18s18-8.1,18-18S33.9,6,24,6z M24,10c3.1,0,6,1.1,8.4,2.8L12.8,32.4 C11.1,30,10,27.1,10,24C10,16.3,16.3,10,24,10z M24,38c-3.1,0-6-1.1-8.4-2.8l19.6-19.6C36.9,18,38,20.9,38,24C38,31.7,31.7,38,24,38 z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="bg-gray-700 px-4 py-2 mx-auto rounded-md text-gray-50 text-sm   w-fit">
          View All Approval Requests
        </div>
      </div>
    </div>
  );
};

export default Approvals;
