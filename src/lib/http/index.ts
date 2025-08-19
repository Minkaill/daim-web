const baseURL = "http://45.12.238.18/";

interface ApiFetchOptions extends RequestInit {
  parseJson?: boolean;
}

export async function http<T = unknown>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const url = `${baseURL}${endpoint}/`;
  const { parseJson = true, ...fetchOptions } = options;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...fetchOptions,
  });

  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status}`);
  }

  return parseJson ? response.json() : (response as unknown as T);
}
