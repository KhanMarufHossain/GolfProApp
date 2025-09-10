export default {
  startRound: async (payload) => {
    return { ok: true, data: { ...payload, id: Math.floor(Math.random() * 100000) } };
  },
};
