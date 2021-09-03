import medsReducer from '../client/reducers/medsReducer';

xdescribe('meds reducer', () => {
  let state;

  beforeEach(() => {
      state = {
        userId: '',
        rxData: [],
      };
  });

  describe('initial state', () => {
    it('it should default to the original state if no state is passed in', () => {
      expect(medsReducer(undefined, {type: undefined})).toEqual(state);
    });

    it('unrecognized action types', () => {
      const action = { type: 'aajsbicawlbejckr' };
      expect(medsReducer(state, action)).toBe(state);
    });
  });

  describe('HANDLE_LOGIN_USER', () => {
    const action = { 
      type: "HANDLE_LOGIN_USER", 
      payload: {
        userId: 'user123',
        rxData: [{name: 'chuck', id: '12345'}],
      }
    }  

    it('both userId and rxData should populate passed in data', () => {
      expect(medsReducer(state, action)).toEqual({
        userId: 'user123',
        rxData: [{name: 'chuck', id: '12345'}],
      })
    });
  });

  describe('ADD_RX', () => {
    const action = { 
      type: "ADD_RX", 
      payload: {name: 'advil', id: '54321'},
    }  

    it('adds a drug into the rxData array in state', () => {
      const { rxData } = medsReducer(state, action);
      expect(rxData).toEqual([{name: 'advil', id: '54321'}])
    });
  });

});

xdescribe('DELETE_RX', () => {
  let state;

  beforeEach(() => {
    state = {
      userId: 'user123',
      rxData: [{name: 'tylenol', id: '890'}],
    }
  });

  describe('DELETE_RX', () => {
    const action = { 
      type: "DELETE_RX", 
      payload: 'tylenol',
    }  

    it('tylenol should be removed from state', () => {
      const { rxData } = medsReducer(state, action);
      expect(rxData).toEqual([])
    });
  });

})