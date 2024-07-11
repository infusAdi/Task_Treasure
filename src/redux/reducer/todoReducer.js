import {
  REMOVE_ITEM,
  EDIT_ITEM,
  ADD_ITEM,
  STATUS_COMPLETE,
  STATUS_ONGOING,
  STATUS_PAUSED,
} from "../actions/actionsTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initialState = [];

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.payload];
    case EDIT_ITEM:
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, title: action.payload.title }
          : item
      );
    case REMOVE_ITEM:
      return state.filter((item) => item.id !== action.payload);
    case STATUS_COMPLETE:
      return state.map((item) =>
        item.id === action.payload ? { ...item, status: "Complete" } : item
      );
    case STATUS_ONGOING:
      const isAnyOngoing = state.some((item) => item.status === "Ongoing");

      if (isAnyOngoing) {
        toast.warn("Please pause or end the current ongoing activity before starting a new one.")
        // alert(
        //   "If there's already an ongoing activity, please pause or end it before starting another one."
        // );
        return state; // Return unchanged state if there's already an ongoing activity
      }

      return state.map((item) =>
        item.id === action.payload ? { ...item, status: "Ongoing" } : item
      );
    case STATUS_PAUSED:
      return state.map((item) =>
        item.id === action.payload ? { ...item, status: "Paused" } : item
      );
    default:
      return state;
  }
};

export default todoReducer;
