export const formatDueToDisplay = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

export const formatDateToInsert = (date) => {
  return new Date(date).toISOString();
};
