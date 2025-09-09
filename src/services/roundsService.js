export default {
  startRound: async (payload) => {
    // simulate backend call
    await new Promise((r) => setTimeout(r, 200));
    return { ok: true, data: { ...payload, id: Math.floor(Math.random() * 100000) } };
  },
};
