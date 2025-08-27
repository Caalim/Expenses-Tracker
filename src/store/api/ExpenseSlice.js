import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// get data from api
export const fetchExpense = createAsyncThunk(
  "expense/fetchExpense",
  async () => {
    const res = await fetch("http://localhost:4001/expenses");
    return res.json();
  }
);

// Add expense

export const AddExpenses = createAsyncThunk(
  "expense/AddExpense",
  async (expense) => {
    const res = await fetch("http://localhost:4001/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });
    return res.json();
  }
);

// update expense

export const updateExpnse = createAsyncThunk(
  "expense/updateExpense",
  async ({ expenseId, updatedExpense }) => {
    const res = await fetch(`http://localhost:4001/expenses/${expenseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedExpense),
    });

    return res.json();
  }
);

// delete expense

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async ({ expenseId }) => {
    const res = await fetch(`http://localhost:4001/expenses/${expenseId}`, {
      method: "DELETE",
    });

    return expenseId;
  }
);

const initialState = {
  expenses: [],
  status: "idle",
  error: null,
  updatingExpense: null,
  updateToExpense: null,
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setUpdatingDate: (state, action) => {
      (state.updatingExpense = true), (state.updateToExpense = action.payload);
    },
    cleareEditin: (state) => {
      (state.updatingExpense = null), (state.updateToExpense = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpense.pending, (state) => {
        (state.status = "loading"), (state.error = null);
      })
      .addCase(fetchExpense.rejected, (state, action) => {
        (state.status = "failer"), (state.error = action.error.message);
      })
      .addCase(fetchExpense.fulfilled, (state, action) => {
        (state.status = "success"),
          (state.error = null),
          (state.expenses = action.payload);
      })
      .addCase(AddExpenses.fulfilled, (state, action) => {
        (state.status = "success"),
          (state.error = null),
          state.expenses.push(action.payload);
      })
      .addCase(updateExpnse.fulfilled, (state, action) => {
        (state.status = "success"), (state.error = null);
        const updatedExpense = action.payload;
        const existingUpdate = state.expenses.find(
          (expense) => expense.id === updatedExpense.id
        );

        if (existingUpdate) {
          (existingUpdate.description = updatedExpense.description),
            (existingUpdate.amount = updatedExpense.amount),
            (existingUpdate.category = updatedExpense.category),
            (existingUpdate.date = updatedExpense.date),
            (existingUpdate.note = updatedExpense.note);
        }

        (state.updatingExpense = null), (state.updateToExpense = null);
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        (state.status = "success"),
          (state.error = null),
          (state.expenses = state.expenses.filter(
            (expense) => expense.id !== action.payload
          ));
      });
  },
});
export const { setUpdatingDate, cleareEditin } = expenseSlice.actions;
export default expenseSlice.reducer;
