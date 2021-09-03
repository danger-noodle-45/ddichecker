import * as types from '../constants/actionTypes';

export const handleLoginUser = (userId, rxData) => ({
  type: types.HANDLE_LOGIN_USER,
  payload: { userId, rxData },
});

export const addRx = (rxInput) => ({
  type: types.ADD_RX,
  payload: rxInput,
});

export const deleteRx = (medData) => {
  return {
  type: types.DELETE_RX,
  payload: medData,
}};