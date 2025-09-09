// Frontend-only profile service with mock data; backend-ready shape.
let _profile = {
  id: 'me',
  name: 'John Blake',
  handicap: 9.2,
  location: 'Washington, DC',
  avatar: require('../../assets/man.png'),
  cover: require('../../assets/golffield1.jpg'),
  bio: 'Weekend golfer. Love short game practice.',
  followers: 128,
  following: 87,
  rounds: 42,
  badges: [
    { id: 'b1', label: 'Ace' },
    { id: 'b2', label: 'Birdie x10' },
    { id: 'b3', label: 'Eagle' },
  ],
  recentCourses: [
    { id: 'c1', name: 'East Potomac GC', image: require('../../assets/golfField.png') },
    { id: 'c2', name: 'Langston', image: require('../../assets/golfField.png') },
  ],
};

let _posts = [
  {
    id: 'pp1',
    user: { id: 'me', name: _profile.name, avatar: _profile.avatar },
    text: 'Personal best today! 78! 🎉',
    image: require('../../assets/golfField.png'),
    likes: 23,
    liked: false,
    comments: [],
  },
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function getProfile() {
  await delay(200);
  return { ok: true, data: JSON.parse(JSON.stringify(_profile)) };
}

export async function updateProfile(patch) {
  await delay(200);
  _profile = { ..._profile, ...patch };
  return { ok: true, data: JSON.parse(JSON.stringify(_profile)) };
}

export async function getMyPosts() {
  await delay(200);
  return { ok: true, data: JSON.parse(JSON.stringify(_posts)) };
}

export async function getMyScorecards() {
  await delay(200);
  return { ok: true, data: [
    { id: 'r1', course: 'East Potomac', date: new Date().toISOString(), gross: 82, net: 78 },
    { id: 'r2', course: 'Langston', date: new Date().toISOString(), gross: 85, net: 80 },
  ] };
}
