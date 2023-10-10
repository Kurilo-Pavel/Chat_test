import * as React from 'react';
import {Provider} from "react-redux";
import store from "./store";
import Chat from "./src/Chat";

export default function App() {
  return (
      <Provider store={store}>
       <Chat/>
      </Provider>
  );
};
