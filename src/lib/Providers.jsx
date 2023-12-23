"use client";
import { NextUIProvider } from "@nextui-org/react";
import store from "@/redux/store";
import { Provider } from "react-redux";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <NextUIProvider>{children}</NextUIProvider>
    </Provider>
  );
};

export default Providers;
