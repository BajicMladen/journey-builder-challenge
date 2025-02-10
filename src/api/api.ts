export async function fetchActionBlueprint() {
  try {
    const response = await fetch(
      "http://localhost:3000/api/v1/user123/actions/blueprints/blueprint456/graph"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching action blueprint:", error);
    throw error;
  }
}
