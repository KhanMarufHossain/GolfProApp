// Courses service with dummy data.
const mockCourses = [
  { id: 1, name: 'Steelwood Golf Club', par: 72, courseRating: 72.5, slopeRating: 113 },
  { id: 2, name: 'Riverbend Course', par: 71, courseRating: 71.2, slopeRating: 115 },
  { id: 3, name: 'Lakeside Course', par: 70, courseRating: 70.8, slopeRating: 110 },
];

export const list = async () => {
  return mockCourses;
};

export default { list };
