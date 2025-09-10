// Handicap calculation service with dummy data.
export const calculate = async (payload) => {
  // simple mock: handicapIndex = (grossScore - courseRating) * 0.96
  const handicapIndex = ((payload.grossScore - payload.courseRating) * 0.96).toFixed(1);
  return { handicapIndex, details: { ...payload } };
};

export default { calculate };
