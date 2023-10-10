const BASE_URL = "http://localhost:8080/static";

export const fetchEntities = async () => {
  const response = await fetch(`${BASE_URL}/entities.json`);
  if (!response.ok) {
    throw new Error("Failed to fetch entities");
  }
  return await response.json();
};

export const fetchCoords = async () => {
  const response = await fetch(`${BASE_URL}/coords.json`);
  if (!response.ok) {
    throw new Error("Failed to fetch coordinates");
  }
  return await response.json();
};
