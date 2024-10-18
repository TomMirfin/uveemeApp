import { create } from 'zustand';

interface GroupState {
  groupId: string;
  setGroupId: (groupId: string) => void;
}

const groupStore = create((set) => ({
  groupId: '',
  setGroupId: (groupId: string) => set({ groupId }),
}));

export default groupStore;
