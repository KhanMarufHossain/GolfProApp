// simple frontend mock for players
const players = [
  { id: 1, name: 'Kristin Watson', hcp: 17, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 2, name: 'Eleanor Pena', hcp: 17, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 3, name: 'Cody Fisher', hcp: 17, avatar: 'https://randomuser.me/api/portraits/men/12.jpg' },
  { id: 4, name: 'Devon Lane', hcp: 17, avatar: 'https://randomuser.me/api/portraits/men/8.jpg' },
];

export default {
  list: async () => {
    // simulate network delay
    await new Promise((r) => setTimeout(r, 150));
    return players;
  },
};
