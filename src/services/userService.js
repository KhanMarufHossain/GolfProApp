import api from './api';
import storage from './storage';

const setRoleLocal = async (role) => {
  await storage.setItem('role', role);
};

const getRoleLocal = async () => {
  return storage.getItem('role');
};

const sendRoleToBackend = async (role) => {
  return api.post('/user/role', { role });
};

export default {
  setRoleLocal,
  getRoleLocal,
  sendRoleToBackend,
};
