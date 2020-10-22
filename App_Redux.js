import React from "react";
import AudioApp from "./src/components/AudioApp";
import { Provider } from "react-redux";
import configureStore from "./src/store/configureStore";
import reducer from "./src/store/reducers/reducer";

const store = configureStore(reducer);

const App = () => {
  console.log("APP", store.getState());

  return (
    <Provider store={store}>
      <AudioApp />
    </Provider>
  );
};

export default App;
