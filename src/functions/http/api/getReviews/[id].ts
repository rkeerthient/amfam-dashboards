import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";

const getReviews = async (
  request: PagesHttpRequest
): Promise<PagesHttpResponse> => {
  const { method } = request;

  const api_key = YEXT_PUBLIC_DEV_API_KEY as string;

  if (method !== "GET") {
    return { body: "Method not allowed", headers: {}, statusCode: 405 };
  }

  const getReviewsResponse = await fetch(
    `https://sbx-api.yextapis.com/v2/accounts/me/reviews?entityIds=devon&api_key=${api_key}&v=20250101&limit=50`
  );

  const resp = await getReviewsResponse.json();

  return {
    body: JSON.stringify(resp),
    headers: {},
    statusCode: 200,
  };
};

export default getReviews;
