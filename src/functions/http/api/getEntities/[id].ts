import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";

const getEntities = async (
  request: PagesHttpRequest
): Promise<PagesHttpResponse> => {
  const { method, pathParams } = request;

  const { id } = pathParams;
  const api_key = YEXT_PUBLIC_DEV_API_KEY as string;

  if (method !== "GET") {
    return { body: "Method not allowed", headers: {}, statusCode: 405 };
  }

  if (!id) {
    return { body: "Missing entityId", headers: {}, statusCode: 400 };
  }

  const getEntitiesResponse = await fetch(
    `https://sbx-api.yextapis.com/v2/accounts/me/entities?entityTypes=${id}&api_key=${api_key}&v=20250101&limit=10&sortBys=[{"name":"ASCENDING"}`
  );

  const resp = await getEntitiesResponse.json();

  return {
    body: JSON.stringify(resp),
    headers: {},
    statusCode: 200,
  };
};

export default getEntities;
