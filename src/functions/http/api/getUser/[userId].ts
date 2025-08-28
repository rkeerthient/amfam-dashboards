import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";

const getUser = async (
  request: PagesHttpRequest
): Promise<PagesHttpResponse> => {
  const { method, pathParams } = request;

  const { userId } = pathParams;
  const api_key = YEXT_PUBLIC_DEV_API_KEY as string;

  if (!userId) {
    return { body: "Missing entityId", headers: {}, statusCode: 400 };
  }

  const getFieldsResponse = await fetch(
    `https://sbx-api.yextapis.com/v2/accounts/me/users/${userId}?api_key=${api_key}&v=20250101`
  );
  const resp = await getFieldsResponse.json();

  return {
    body: JSON.stringify(resp),
    headers: {},
    statusCode: 200,
  };
};

export default getUser;
