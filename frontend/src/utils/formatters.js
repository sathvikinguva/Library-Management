export const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString();
};

export const availabilityLabel = (available) => (available ? "Available" : "Issued");
