// this is how we will be able to manipulate and play with the data from DataLayer

export const initialState = {
  // basket starts empty
  basket: []
};

// reducer pushes/pulls (completes) the action into the data layer, its always listening for a dispatch
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        //   whatever basket currently was
        ...state,
        // whatever the basket currently was plus whatever action.item is, in this case we added to our basket
        basket: [...state.basket, action.item]
      };
    default:
      return state;
  }
};

export default reducer;
