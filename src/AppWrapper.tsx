import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";

function AppWrapper() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}

export default AppWrapper;
