import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";

const getSugestions = async (
  request: PagesHttpRequest
): Promise<PagesHttpResponse> => {
  const { method, queryParams, pathParams } = request;

  const { id } = pathParams;
  const { pageToken } = queryParams;
  const api_key = YEXT_PUBLIC_DEV_API_KEY as string;

  if (!id) {
    return {
      body: "Missing entitygetFieldTypesId",
      headers: {},
      statusCode: 400,
    };
  }

  const getFieldsResponse = await fetch(
    `https://sbx-api.yextapis.com/v2/accounts/me/suggestions?entityIds=${id}&api_key=${api_key}&v=20230601&sortBy=[{"lastUpdatedDate":"descending"}]${
      pageToken ? `&pageToken=${pageToken}` : ``
    }`
  );

  const resp = await getFieldsResponse.json();

  return {
    body: JSON.stringify(resp),
    headers: {},
    statusCode: 200,
  };
};

export default getSugestions;
