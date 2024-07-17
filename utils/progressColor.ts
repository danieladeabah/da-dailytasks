export const getProgressColor = (progress: number) => {
  if (progress >= 75) {
    return "#8677fa"; // Green color for high progress
  } else if (progress >= 50) {
    return "#FDCA40"; // Orange color for medium progress
  } else {
    return "#F17105"; // Red color for low progress
  }
};
