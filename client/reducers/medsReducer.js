import * as types from '../constants/actionTypes';

const initialState = {
  userId: '',
  rxData: [],
};

const medsReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.HANDLE_LOGIN_USER: {
      return {
        ...state,
        userId: action.payload.userId,
        rxData: action.payload.rxData
      }
    }
    case types.ADD_RX: {
      return {
        ...state,
        rxData: [...state.rxData, action.payload]
      }
    }
    case types.DELETE_RX: {
      console.log('got into delete action');
      const newArr = state.rxData.filter((el) => {
        return (el.name !== action.payload);
      })
      return {
        ...state,
        rxData: newArr
      }
    }
    default:
        return state;
  }
}

export default medsReducer;