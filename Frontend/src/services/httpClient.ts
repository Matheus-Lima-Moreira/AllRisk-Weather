import { appConfig } from "../config/appConfig";

export async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${appConfig.apiBaseUrl}${path}`);

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return response.json() as Promise<T>;
}

async function getErrorMessage(response: Response) {
  try {
    const payload = await response.json();
    return payload.message ?? "Não foi possível carregar os dados.";
  } catch {
    return "Não foi possível carregar os dados.";
  }
}
