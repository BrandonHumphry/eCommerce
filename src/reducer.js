// this is how we will be able to manipulate and play with the data from DataLayer

export const initialState = {
  // basket starts empty
  basket: [],
  user: null
};

// Selector
export const getBasketTotal = basket =>
  basket?.reduce((amount, item) => item.price + amount, 0);

// reducer pushes/pulls (completes) the action into the data layer, its always listening for a dispatch
const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        //   whatever basket currently was
        ...state,
        // whatever the basket currently was plus whatever action.item is, in this case we added to our basket
        basket: [...state.basket, action.item]
      };

    case "EMPTY_BASKET":
      // below means keep the state but empty the basket
      return {
        ...state,
        basket: []
      };

    case "REMOVE_FROM_BASKET":
      // get the state and find the index (go through basket items and finds the first match to action.id)
      //   whatever basket currently was
      const index = state.basket.findIndex(
        basketItem => basketItem.id === action.id
      );
      // make a copy of current basket
      let newBasket = [...state.basket];

      if (index >= 0) {
        // go newBasket and splice at whichever element you click "remove from Basket" (remove by 1)
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in the basket.`
        );
      }

      return {
        ...state,
        basket: newBasket
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user
      };

    default:
      return state;
  }
};

export default reducer;
