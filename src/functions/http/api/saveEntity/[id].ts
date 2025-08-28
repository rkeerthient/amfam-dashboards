import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";

const saveEntity = async (
  request: PagesHttpRequest
): Promise<PagesHttpResponse> => {
  const { method, pathParams, queryParams } = request;
  const { id } = pathParams;
  const { body, userType } = queryParams;
  const api_key = YEXT_PUBLIC_DEV_API_KEY as string;

  const isAdminBool = userType === "true";

  const parsedBody = typeof body === "string" ? JSON.parse(body) : body;

  const baseUrl = isAdminBool
    ? `https://sbx-api.yextapis.com/v2/accounts/me/entities/${id}`
    : `https://sbx-api.yextapis.com/v2/accounts/me/suggestions`;

  const saveEntityResponse = await fetch(
    `${baseUrl}?api_key=${api_key}&v=20250101`,
    {
      method: isAdminBool ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        isAdminBool ? parsedBody : buildBody(parsedBody, id)
      ),
    }
  );

  const resp = await saveEntityResponse.json();

  return {
    body: JSON.stringify(resp),
    headers: {},
    statusCode: saveEntityResponse.status,
  };
};

export default saveEntity;

const buildBody = (extData: any, entityId: any) => {
  return {
    entityFieldSuggestion: {
      entity: { id: entityId },
      suggestedContent: { ...extData },
    },
  };
};
