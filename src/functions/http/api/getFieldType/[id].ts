import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";
const getFieldType = async (
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

  const getFieldTypeResponse = await fetch(
    `https://sbx-api.yextapis.com/v2/accounts/me/config/resources/km/field-type/${id}?api_key=${api_key}&v=20250101`
  );

  const resp = await getFieldTypeResponse.json();

  return {
    body: JSON.stringify(resp),
    headers: {},
    statusCode: 200,
  };
};

export default getFieldType;
