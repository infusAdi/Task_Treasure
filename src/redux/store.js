import todoReducer from "./reducer/todoReducer";
import { createStore } from "redux";

const store = createStore(todoReducer);

export default store;