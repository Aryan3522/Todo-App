"use client";

import axios from "axios";
import { createContext, useReducer } from "react";

// Initial state
let initialState = {};

if (typeof window !== "undefined") {
  initialState = JSON.parse(localStorage.getItem("TodoAuth")) || {
    Username: "",
    email: "",
    jwtToken: "",
    name: "",
    userId: "",
  };
} else {
  initialState = {
    Username: "",
    email: "",
    jwtToken: "",
    name: "",
    userId: "",
  };
}

// Create Context
export const TodoAuthContext = createContext(initialState);

// Reducers
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "SIGN_IN":
      const signinState = action.payload;
      localStorage.setItem("TodoAuth", JSON.stringify(signinState));
      return signinState;
    default:
      return state;
  }
};

// Provider component
export const TodoAuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Authenticator methods
  const SignUp = async (body) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/SignUp`,
        body,
      );
      console.log(res.data);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  // SignIn method
  const SignIn = async (body) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/SignIn`,
        body,
      );

      const { Username, email, jwtToken, userId } = res.data;

      let todoAuthdata = { Username, email, jwtToken, userId };
      dispatch({ type: "SIGN_IN", payload: todoAuthdata });

      return { success: true, data: res.data };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.response?.data ||
          "Something went wrong",
      };
    }
  };

  return (
    <TodoAuthContext.Provider
      value={{
        AuthData: state,
        dispatch,
        SignUp,
        SignIn,
      }}
    >
      {children}
    </TodoAuthContext.Provider>
  );
};
