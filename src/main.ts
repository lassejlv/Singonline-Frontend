import "./styles/index.scss";

export const API_URL = "http://localhost:8080";

interface FetchResponse<T> {
  status: number;
  statusText: string;
  error: boolean;
  data: T;
}

async function useFetch<T>(url: string, options: RequestInit = {}): Promise<FetchResponse<T>> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`${response.status}-${response.statusText}`);

    const data = await response.json();
    if (typeof data !== "object") throw new Error("Invalid data type");

    return { status: response.status, statusText: response.statusText, error: false, data } as FetchResponse<T>;
  } catch (error: any) {
    return { status: 500, statusText: error.message, error: true } as FetchResponse<T>;
  }
}
export { useFetch };
