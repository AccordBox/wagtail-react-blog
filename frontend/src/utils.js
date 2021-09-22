import camelcaseKeys from "camelcase-keys";
import querystring from "query-string";
import snakecaseKeys from "snakecase-keys";

const API_BASE = process.env.REACT_APP_API_BASE;

export async function getPage(path, params, options) {
  params = params || {};
  let relativePath = path;
  if (relativePath.indexOf("/") !== 0) {
    relativePath = `/${relativePath}`;
  }

  return await getRequest(`${API_BASE}${relativePath}`, params, options);
}

export async function getPagePreview(contentType, token, params, options) {
  params = params || {};
  params = {
    contentType,
    token,
    ...params,
  };

  return await getRequest(
    `${API_BASE}/api/v1/cms/page_preview/`,
    params,
    options
  );
}

export async function getRequest(url, params, options) {
  params = params || {};
  params = snakecaseKeys(params, { deep: true });

  let headers = options?.headers || {};
  headers = {
    "Content-Type": "application/json",
    ...headers,
  };
  const queryString = querystring.stringify(params);
  const res = await fetch(`${url}?${queryString}`, { headers });

  const data = await res.json();
  return camelcaseKeys(data, { deep: true });
}

export async function postRequest(url, params, options) {
  params = params || {};
  params = snakecaseKeys(params, { deep: true });

  let headers = options?.headers || {};
  headers = {
    "Content-Type": "application/json",
    ...headers,
  };
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(params),
  });

  const data = await res.json();
  return camelcaseKeys(data, { deep: true });
}

export function convertWagtailUrlToRelative(url){
  return url.replace(API_BASE, '')
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
