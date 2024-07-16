export const getProgressColor = (progress: number) => {
  if (progress >= 75) {
    return "#4CAF50"; // Green color for high progress
  } else if (progress >= 50) {
    return "#FFC107"; // Orange color for medium progress
  } else {
    return "#F44336"; // Red color for low progress
  }
};
