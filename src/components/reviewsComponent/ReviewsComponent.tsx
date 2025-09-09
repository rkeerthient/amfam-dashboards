import { useState } from "react";
import { useQuery } from "react-query";
import StarRating from "./StarRating";
import Pagination from "./Pagination";

export interface ReviewResponse {
  meta: Meta;
  response: ResponseShape;
}
export interface Meta {
  uuid: string;
  errors: any[];
}
export interface ResponseShape {
  reviews: Review[];
  nextPageToken: string;
  averageRating: number;
  count: number;
}
export interface Review {
  id: number;
  rating: number;
  content: string;
  authorName: string;
  authorEmail: string;
  url: string;
  publisherDate: number;
  locationId: string;
  accountId: string;
  publisherId: string;
  title: string;
  lastYextUpdateTime: number;
  comments: any[];
  status: string;
  externalId: string;
  flagStatus: string;
  reviewLanguage: string;
  apiIdentifier: string;
}

const PAGE_SIZE = 10;

function useReviews(page: number, entityId: string) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(PAGE_SIZE),
  });

  return useQuery<ReviewResponse, Error>({
    queryKey: ["reviews", page, PAGE_SIZE],
    queryFn: async () => {
      const res = await fetch(
        `/api/getReviews/${entityId}?${params.toString()}`
      );
      if (!res.ok) throw new Error(`Failed to fetch reviews (${res.status})`);
      return res.json();
    },
    keepPreviousData: true,
  });
}

const ReviewsComponent = ({
  entityId,
  uid,
}: {
  entityId: string;
  uid: string;
}) => {
  const [page, setPage] = useState<number>(1);
  const { data, error, isFetching } = useReviews(page, entityId);

  const totalCount = data?.response.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const avg = data?.response.averageRating ?? 0;
  const reviews = data?.response.reviews ?? [];

  return (
    <>
      {isFetching ? (
        <div className="px-4 py-8 flex justify-center items-center h-full">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"
            role="status"
          />
        </div>
      ) : (
        <div className="px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="text-sm text-red-600 border border-red-200 bg-red-50 rounded-md p-3 mb-4">
              {error.message}
            </div>
          )}

          {data && (
            <div className="bg-white">
              <div className="mx-auto px-4 py-8  lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 ">
                <div className="lg:col-span-3">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Customer Reviews
                  </h2>
                  <div className="flex flex-col gap-4 mt-4">
                    <div className="flex gap-2 items-baseline">
                      <div className="text-5xl font-bold">{avg.toFixed(1)}</div>
                      <div className="text-2xl font-bold">out of</div>
                      <div className="text-5xl font-bold">5</div>
                    </div>
                    <div className="text-2xl flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        <StarRating selectedStars={avg} />
                      </div>
                      <span>({totalCount})</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <dl className="space-y-3"></dl>
                    <a
                      target="_blank"
                      href={`https://sandbox.yext.com/s/3356618/reviews#p0=uep&p0=status&p0=response-status&p1=includes&p1=1%7C3&p1=1%7C3%7C2%7C4&p2=${uid}&p2=includes&p2=includes&p3=entities&p3=&p3=`}
                      className="inline-flex w-fit mx-auto justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      My Reviews
                    </a>
                  </div>
                </div>

                <div className="mt-8 lg:col-span-8 lg:col-start-4 ">
                  <h3 className="sr-only">Recent reviews</h3>

                  <div className="flow-root">
                    <div className="-my-12 divide-y divide-gray-200">
                      <div className="flex gap-12">
                        {Array.isArray(reviews) && reviews.length > 0 ? (
                          <section className="divide-y divide-gray-200 border-b border-t border-gray-200 border p-8 m-8">
                            {reviews.map((review) => (
                              <ReviewsRow review={review} key={review.id} />
                            ))}

                            <Pagination
                              page={page}
                              totalPages={totalPages}
                              clickedPage={setPage}
                            />
                          </section>
                        ) : (
                          <div className="text-sm text-gray-500 py-6">
                            No reviews found.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ReviewsComponent;

const ReviewsRow = ({ review }: { review: Review }) => {
  const date = new Date(review.publisherDate);

  return (
    <article className="py-6 md:py-4 lg:grid lg:grid-cols-12 lg:gap-x-8">
      <div className="flex flex-col md:flex-row md:items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
        <p className="font-medium">{review.authorName}</p>
        <time
          dateTime={date.toISOString()}
          className="md:ml-4 md:border-l border-gray-200 md:pl-4 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
        >
          {date.toLocaleDateString()}
        </time>
      </div>

      <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:gap-x-8">
        <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0 space-y-2">
          <span className="flex items-center gap-2">
            <p className="font-bold">{review.rating}</p>
            <span className="gap-0.5 flex">
              <StarRating selectedStars={review.rating} />
            </span>
          </span>

          <div className="mt-3 space-y-6 text-sm">{review.content}</div>
        </div>
      </div>
    </article>
  );
};
