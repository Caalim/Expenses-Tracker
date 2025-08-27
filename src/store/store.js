import { configureStore } from "@reduxjs/toolkit";
import { expenseSlice } from "./api/ExpenseSlice";
export const store = configureStore({
  reducer: {
    expense: expenseSlice.reducer,
  },
});
