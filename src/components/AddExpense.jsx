import { useState, useEffect } from "react";
import {
  AddExpenses,
  updateExpnse,
  cleareEditin,
} from "../store/api/ExpenseSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const AddExpense = ({ onClose }) => {
  const [expenseDate, setExpenseDate] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
    note: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditing) {
      dispatch(AddExpenses(expenseDate));
      setExpenseDate({
        description: "",
        amount: "",
        category: "",
        date: "",
        note: "",
      });
    } else {
      dispatch(
        updateExpnse({
          expenseId: UpdatingtoEexpense.id,
          updatedExpense: expenseDate,
        })
      );
      setExpenseDate({
        description: "",
        amount: "",
        category: "",
        date: "",
        note: "",
      });
    }
  };

  dispatch(updateExpnse());

  const isEditing = useSelector((state) => state.expense.updatingExpense);
  const UpdatingtoEexpense = useSelector(
    (state) => state.expense.updateToExpense
  );

  useEffect(() => {
    if (isEditing && UpdatingtoEexpense) {
      setExpenseDate({
        ...expenseDate,
        description: UpdatingtoEexpense.description,
        amount: UpdatingtoEexpense.amount,
        category: UpdatingtoEexpense.category,
        date: moment(UpdatingtoEexpense.date).format("YYYY-MM-DD"),
        note: UpdatingtoEexpense.note,
      });
    }
  }, [UpdatingtoEexpense]);

  return (
    <div>
      <div>
        <div className="fixed inset-0 flex items-center justify-center  bg-gray-200/40">
          <div className=" bg-white w-[400px] shadow-md rounded-md px-8 py-3 mx-3">
            <form onSubmit={handleSubmit}>
              <h2 className="text-center font-bold text-xl">
                {isEditing ? "Update expnse" : "Add New expnse"}
              </h2>
              <div className="py-4">
                <label className="font-semibold">Description *</label>
                <input
                  className="w-full outline-none border-1 border-gray-400 px-4 py-2 rounded-md mt-2"
                  type="text"
                  value={expenseDate.description}
                  placeholder="Enter description expense"
                  required
                  onChange={(e) =>
                    setExpenseDate({
                      ...expenseDate,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="font-semibold">Amount *</label>
                <input
                  className="w-full outline-none border-1 border-gray-400 px-4 py-2 rounded-md mt-2"
                  type="number"
                  value={expenseDate.amount}
                  name=""
                  placeholder="$ 0.00"
                  required
                  onChange={(e) =>
                    setExpenseDate({
                      ...expenseDate,
                      amount: e.target.value,
                    })
                  }
                />
              </div>

              <div className="py-4">
                <label className="font-semibold">category *</label>
                <select
                  className="w-full outline-none border-1 border-gray-400 px-4 py-2 rounded-md mt-2"
                  required
                  value={expenseDate.category}
                  onChange={(e) =>
                    setExpenseDate({
                      ...expenseDate,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="">All</option>
                  <option value="Bills">Bills</option>
                  <option value="Transport">Transport</option>
                  <option value="Food">Food</option>
                  <option value="Other">Other</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
              </div>

              <div>
                <label className="font-semibold">Date *</label>
                <input
                  className="w-full outline-none border-1 border-gray-400 px-4 py-2 rounded-md mt-2"
                  type="date"
                  value={expenseDate.date}
                  placeholder="$ 0.00"
                  required
                  onChange={(e) =>
                    setExpenseDate({ ...expenseDate, date: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="font-semibold">Note * (optinao)</label>
                <textarea
                  className="w-full outline-none border-1 border-gray-400 px-4 py-1 rounded-md mt-2"
                  name=""
                  placeholder="Description"
                  required
                  value={expenseDate.note}
                  onChange={(e) =>
                    setExpenseDate({ ...expenseDate, note: e.target.value })
                  }
                ></textarea>
              </div>

              {!isEditing ? (
                <div className="pt-6 flex justify-end">
                  <button
                    type="button"
                    className="py-2 px-4 bg-blue-50 rounded-md font-semibold"
                    onClick={() => {
                      onClose(true);
                    }}
                  >
                    cencel
                  </button>
                  <button
                    className="py-2 px-4 bg-blue-700 rounded-md font-semibold text-white ml-4"
                    type="submit"
                  >
                    Save expense
                  </button>
                </div>
              ) : (
                <div className="pt-6 flex justify-end">
                  <button
                    type="button"
                    className="py-2 px-4 bg-blue-50 rounded-md font-semibold"
                    onClick={() => {
                      onClose(true);
                      dispatch(cleareEditin());
                    }}
                  >
                    cencel
                  </button>
                  <button
                    className="py-2 px-4 bg-blue-700 rounded-md font-semibold text-white ml-4"
                    type="submit"
                  >
                    Update expense
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
