import { combineReducers } from "redux";
import dataReducers from "./dataReducers";

export const rootReducers = combineReducers({
  dataReducers,
});

export type RootState = ReturnType<typeof rootReducers>;
