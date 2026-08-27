export const getReportStats = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/reports`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch report statistics."
    );
  }

  return response.json();
};