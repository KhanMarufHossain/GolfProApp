// Frontend-phase mock for handicap calculation.
// Replace with real backend integration later.
export const calculate = async (payload) => {
  // simple mock: handicapIndex = (grossScore - courseRating) * 0.96
  await new Promise((r) => setTimeout(r, 400));
  const handicapIndex = ((payload.grossScore - payload.courseRating) * 0.96).toFixed(1);
  return { handicapIndex, details: { ...payload } };
};

export default { calculate };
