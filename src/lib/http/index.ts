const BASE_URL = "http://45.12.238.18";

export async function http<T>(
  path: string,
  init: RequestInit & { parseJson?: boolean } = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}/${path.replace(/^\/+/,'')}`, {
    method: init.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    redirect: "follow",
    ...init,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText} ${text}`.trim());
  }

  if (init.parseJson !== false) return (await res.json()) as T;
  // @ts-expect-error
  return undefined;
}
