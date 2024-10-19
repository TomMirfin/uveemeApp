import axios from 'axios';

export const API_URL = 'http://ec2-54-246-237-164.eu-west-1.compute.amazonaws.com:3000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const getAllUsers = async () => {
  const res = await api.get('/users');
  return res.data;
};
export const getUserById = async (userId: string) => {
  const res = await api.get(`/users/${userId}`);
  return res.data;
};
export const getAllGroups = async () => {
  const res = await api.get('/groups');
  return res.data;
};

export const getGroupsForUser = async (userId: string) => {
  const res = await api.get(`/groups/users/${userId}`);
  return res.data;
};

export const getGroupById = async (groupId: string) => {
  const res = await api.get(`/groups/${groupId}`);
  return res.data;
};

export const createGroup = async (data: any) => {
  const res = await api.post('/groups', data);
  return res.data;
};

export const updateGroup = async (data: any) => {
  const { groupId, ...rest } = data;
  const res = await api.put(`/groups/${groupId}`, rest);
  return res.data;
};

export const deleteGroup = async (groupId: string) => {
  const res = await api.delete(`/groups/${groupId}`);
  return res.data;
};
