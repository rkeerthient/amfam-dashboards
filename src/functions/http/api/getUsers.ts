import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";

const getUsers = async (
  request: PagesHttpRequest
): Promise<PagesHttpResponse> => {
  const { method } = request;

  const api_key = YEXT_PUBLIC_DEV_API_KEY as string;

  const getFieldsResponse = await fetch(
    `https://sbx-api.yextapis.com/v2/accounts/me/users?api_key=${api_key}&v=20250101`
  );
  const resp = await getFieldsResponse.json();

  return {
    body: JSON.stringify(resp),
    headers: {},
    statusCode: 200,
  };
};

export default getUsers;
