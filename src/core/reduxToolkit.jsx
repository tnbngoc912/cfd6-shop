export default function reduxToolkit({ initialState, reducers = {}, name }) {
  let action = {};
  let TYPE = {};

  for (let i in reducers) {
    // login, logout ,error, register, update
    // name: auth
    /**
     * auth/login
     * auth/logout
     * auth/error
     * auth/update
     */
    let type = `${name}/${i}`;

    action[i] = data => {
      return {
        type,
        payload: data
      };
    };

    TYPE[i] = type;
  }

  function reducer(state = initialState, action) {
    let type = action.type.split("/")[1];

    let newState = { ...state };

    if (type in reducers) {
      let stateTemp = reducers[type](newState, action);
      if (stateTemp && stateTemp !== newState) {
        return stateTemp;
      }

      return newState;
    }

    return state;
  }

  return {
    action,
    reducer,
    TYPE
  };
}
