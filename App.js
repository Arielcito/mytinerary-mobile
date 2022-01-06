import 'react-native-gesture-handler';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Navigator from "./navigation/NavStack.js";
import thunk from "redux-thunk";
import { NavigationContainer } from "@react-navigation/native";
import mainReducer from "./redux/reducers/mainReducer.js";
import FlashMessage from "react-native-flash-message";

const globalStore = createStore(mainReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={globalStore}>
      <NavigationContainer>
        <Navigator />
        <FlashMessage position="bottom" floating={true} icon="auto" />
      </NavigationContainer>
    </Provider>
  );
}

