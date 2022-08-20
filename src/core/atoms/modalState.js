import { atom } from 'recoil';
export const loginModalState = atom({
  key: 'loginModalState',
  default: false,
});

export const registerModalState = atom({
  key: 'registerModalState',
  default: false,
});
