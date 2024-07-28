import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  fullBox: false,
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,

  isShow: localStorage.getItem("isShow")
    ? JSON.parse(localStorage.getItem("isShow"))
    : "",

  isHome: localStorage.getItem("isHome")
    ? JSON.parse(localStorage.getItem("isHome"))
    : true,
};
function reducer(state, action) {
  switch (action.type) {
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "USER_SIGNOUT":
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: "",
        },
        active: "",
        isShow: true,
      };

    case "IS_SHOW":
      localStorage.setItem("isShow", JSON.stringify(action.payload));
      return { ...state, isShow: action.payload };

    case "IS_HOME":
      localStorage.setItem("isHome", JSON.stringify(action.payload));
      return { ...state, isHome: action.payload };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}
