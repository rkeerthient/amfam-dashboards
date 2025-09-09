import { useQuery } from "react-query";
import { ReviewResponse } from "../../reviewsComponent/ReviewsComponent";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

type ApprovalProps = {
  entityId: string;
  uid: string;
};

const Approvals = ({ entityId, uid }: ApprovalProps) => {
  const { data, error, isFetching } = useReviews(entityId);
  const {
    data: data1,
    error: error1,
    isFetching: isFetching1,
  } = useListings(entityId);
  const { data: data2, error: error2, isFetching: isFetching2 } = useUsers();

  const avg = data?.response.averageRating ?? 0;
  const count = data1?.response?.count ?? 0;
  const usersCount = data2?.response?.count ?? 0;
  return (
    <div className="bg-white text-center text-gray-800 m-auto flex justify-center items-center w-1/5 px-4 py-8 mx-auto rounded-md">
      <div className="flex flex-col gap-4 w-full ">
        <div className="text-xl font-semibold">Entity Summary</div>
        <div className="w-full grid grid-cols-2 gap-4 justify-between">
          <a
            href={`https://sandbox.yext.com/s/3356618/listings/all-listings#p0=specific&p1=contains&p2=${uid}&p3=-1&s0=0&l0=25&sortCol=default&sortDir=asc`}
            className="flex flex-col gap-2 items-center justify-center"
          >
            {isFetching1 ? (
              <div className=" flex justify-center items-center h-full">
                <div
                  className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"
                  role="status"
                />
              </div>
            ) : (
              <div className="text-xl">
                {error1 && (
                  <div className="text-sm text-red-600 border border-red-200 bg-red-50 rounded-md p-3 mb-4">
                    {error1.message}
                  </div>
                )}
                {data1 && <span className="font-light">{count}</span>}
              </div>
            )}
            <div className="text-sm">Live Listings</div>
          </a>
          <a
            href={`https://sandbox.yext.com/s/3356618/reviews#p0=uep&p0=status&p0=response-status&p1=includes&p1=1%7C3&p1=1%7C3%7C2%7C4&p2=${uid}&p2=includes&p2=includes&p3=entities&p3=&p3=`}
            className="flex flex-col gap-2 items-center justify-center"
          >
            {isFetching ? (
              <div className=" flex justify-center items-center h-full">
                <div
                  className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"
                  role="status"
                />
              </div>
            ) : (
              <div className="text-xl">
                {error && (
                  <div className="text-sm text-red-600 border border-red-200 bg-red-50 rounded-md p-3 mb-4">
                    {error.message}
                  </div>
                )}
                {data && <span className="font-light">{avg.toFixed(2)}</span>}
              </div>
            )}

            <div className="text-sm">Average Rating</div>
          </a>

          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="text-xl">
              <CheckCircleIcon className="h-8 w-8" />
            </div>
            <div className="text-sm">Pages Live</div>
          </div>
          <a
            href={`https://sandbox.yext.com/s/3356618/user/userManagement#p0=scope&p1=contains&p2=entityId${uid}&p3=`}
            className="flex flex-col gap-2 items-center justify-center"
          >
            {isFetching2 ? (
              <div className=" flex justify-center items-center h-full">
                <div
                  className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"
                  role="status"
                />
              </div>
            ) : (
              <div className="text-xl">
                {error2 && (
                  <div className="text-sm text-red-600 border border-red-200 bg-red-50 rounded-md p-3 mb-4">
                    {error2.message}
                  </div>
                )}
                {data2 && <span className="font-light">{usersCount}</span>}
              </div>
            )}
            <div className="text-sm">Users with Access</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Approvals;

function useReviews(id: string) {
  return useQuery<ReviewResponse, Error>({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await fetch(`/api/getReviews/${id}`);
      if (!res.ok) throw new Error(`Failed to fetch reviews (${res.status})`);

      return res.json();
    },
    keepPreviousData: true,
  });
}

function useListings(id: string) {
  return useQuery<String, Error>({
    queryKey: ["listings"],
    queryFn: async () => {
      const res = await fetch(`/api/getLiveListingsCount/${id}`);

      if (!res.ok) throw new Error(`Failed to fetch reviews (${res.status})`);

      return res.json();
    },
    keepPreviousData: true,
  });
}

function useUsers() {
  return useQuery<String, Error>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`/api/getUsers`);

      if (!res.ok) throw new Error(`Failed to fetch reviews (${res.status})`);

      return res.json();
    },
    keepPreviousData: true,
  });
}
