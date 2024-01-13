"use client";
import { NextUIProvider } from "@nextui-org/react";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
const Providers = ({ children }) => {
  
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
