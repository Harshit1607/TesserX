import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import societyAuthReducer from "./Society/authReducer";
import companyAuthReducer from "./Company/authReducer";

const rootReducer = combineReducers({
  societyAuthReducer,
  companyAuthReducer
})

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;