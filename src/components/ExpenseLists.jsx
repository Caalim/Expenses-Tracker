import {
  FaWifi,
  FaFilter,
  FaSearchengin,
  FaCalendar,
  FaList,
  FaTableList,
} from "react-icons/fa6";
import ExpenseList from "./ExpenseList";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchExpense } from "../store/api/ExpenseSlice";

const ExpenseLists = () => {
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setTomDate] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExpense());
  }, [dispatch]);

  const totalExpenses = useSelector((state) => state.expense.expenses.length);

  const expenseList = useSelector((state) => state.expense.expenses);

  const filtred = expenseList.filter((expense) => {
    const searchText = expense.description.toLowerCase();
    const inputSearch = !filter.trim() || searchText.includes(filter);
    const categoryInput = !category || expense.category === category;
    const fromDateInput =
      !fromDate || new Date(expense.date) >= new Date(fromDate);
    const toDateInput = !toDate || new Date(expense.date) <= new Date(toDate);

    return inputSearch && categoryInput && fromDateInput && toDateInput;
  });

  return (
    <div className="contailner">
      <div className="w-[90%] mx-auto">
        <div className="flex items-center  gap-2 text-green-400 justify-end  my-5">
          <FaWifi />
          <span>Connected</span>
        </div>

        <div className="shadow p-6 my-4 bg-white">
          <div className="flex gap-2 items-center pb-3">
            <FaFilter className="text-blue-600" />
            <h2 className="font-medium">Filters</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <h2 className="pb-2 font-normal">Search Description</h2>
              <div className="flex items-center gap-3 px-4 py-2 border-2 border-gray-300 rounded-md">
                <FaSearchengin />
                <input
                  className="outline-none w-full"
                  type="text"
                  placeholder="Search Expense..."
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h2 className="pb-2 font-normal">Category</h2>
              <div className="">
                <select
                  className="w-full font-normal outline-none  px-4 py-2 border-2 border-gray-300 rounded-md"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Bills">Bills</option>
                  <option value="Transport">Transport</option>
                  <option value="Food">Food</option>
                  <option value="Other">Other</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
              </div>
            </div>

            <div>
              <h2 className="pb-2 font-normal">From Date</h2>
              <div className="flex items-center gap-3 px-4 py-2 border-2 border-gray-300 rounded-md ">
                <FaCalendar className="text-gray-400" />
                <input
                  className="outline-none w-full font-normal"
                  type="date"
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h2 className="pb-2 font-normal">To Date</h2>
              <div className="flex items-center gap-3 px-4 py-2 border-2 border-gray-300 rounded-md">
                <FaCalendar className="text-gray-400" />
                <input
                  className="outline-none w-full font-normal"
                  type="Date"
                  onChange={(e) => setTomDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="shadow-md mt-6 bg-white">
          <div className="flex justify-between items-center border-b-1 border-b-gray-400 p-4">
            <div>
              <h2 className=" font-bold text-[22px]">Expense List</h2>
              <p className="font-mono text-[14px]">{`${totalExpenses} Expenses Found`}</p>
            </div>

            <div className="flex gap-3">
              <NavLink to="/expense/expenseCard" className="  text-xl p-2">
                <FaTableList />
              </NavLink>

              <NavLink
                to="/expense/expenseList"
                className="text-xl p-2 text-blue-600 bg-blue-100  rounded-lg"
              >
                <FaList />
              </NavLink>
            </div>
          </div>

          <div>
            <div className="shadow-md rounded-md mb-4">
              <table className="border-collapse w-full text-left">
                <thead>
                  <tr className="border-b-1 border-gray-300 bg-gray-50 text-gray-300 text-[14px] font-normal">
                    <th className="md:px-6 py-2 text-left">DESCRIPTION</th>
                    <th className="text-left pl-8 md:pl-0">AMOUNT</th>
                    <th className="text-left pl-7 md:pl-0">CATEGORY</th>
                    <th className="hidden md:table-cell text-left">DATE</th>
                    <th className="hidden md:table-cell text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filtred &&
                    filtred.map((expense, index) => (
                      <ExpenseList expense={expense} key={index} />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseLists;
