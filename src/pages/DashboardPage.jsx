import { FaWifi, FaCalendarWeek, FaDollarSign, FaGauge } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchExpense } from "../store/api/ExpenseSlice";

const DashboardPage = () => {
  const dispach = useDispatch();

  useEffect(() => {
    dispach(fetchExpense());
  }, [dispach]);

  const expenses = useSelector((state) => state.expense.expenses.length);

  const TotalExpenses = useSelector((state) => state.expense.expenses);

  const TotalAmount = TotalExpenses.reduce(
    (total, expense) => total + parseFloat(expense.amount),
    0
  );
  return (
    <div>
      <div>
        <div className="flex items-center  gap-2 text-green-400 justify-end mr-16 my-5">
          <FaWifi />
          <span>Connected</span>
        </div>
        <div>
          <div className="text-center">
            <h2 className="text-3xl font-bold py-2">Expense Dashboard</h2>
            <p>Track and manage your daily expenses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mx-4 lg:mx-14">
            <div className="flex justify-between items-center  bg-blue-600 py-4 px-4 rounded-lg">
              <div>
                <h3 className="text-white py-2 font-medium">This Month</h3>
                <h4 className="text-white font-bold text-2xl">$0.00</h4>
              </div>
              <div>
                <FaCalendarWeek className="text-white text-3xl" />
              </div>
            </div>
            <div className="flex justify-between items-center  bg-green-600 py-4 px-4 rounded-lg">
              <div>
                <h3 className="text-white py-2 font-medium">Total Expenses</h3>
                <h4 className="text-white font-bold text-2xl">
                  $ {TotalAmount}
                </h4>
              </div>
              <div>
                <FaDollarSign className="text-white text-3xl" />
              </div>
            </div>

            <div className="flex justify-between items-center  bg-fuchsia-600 py-4 px-4 rounded-lg">
              <div>
                <h3 className="text-white py-2 font-medium">Caategories</h3>
                <h4 className="text-white font-bold text-2xl">{expenses}</h4>
              </div>
              <div>
                <FaGauge className="text-white text-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
