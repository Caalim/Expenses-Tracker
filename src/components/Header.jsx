import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { FaChartColumn, FaList } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import AddExpense from "./AddExpense";
import { useState } from "react";

const Header = () => {
  const linkNav = ({ isActive }) =>
    isActive
      ? "flex items-center md:w-35 gap-2 p-2  bg-blue-100 md:border-2 md:border-black rounded-lg text-blue-600 text-xl"
      : "flex items-center md:w-35 gap-2 p-2 md:px-2  text-xl";

  const [showForm, setShowForm] = useState(false);

  // const showForm = () => {};

  return (
    <div className="flex justify-around items-center h-20 shadow">
      <div className="flex items-center gap-3">
        <RiMoneyDollarBoxLine className="text-4xl bg-blue-600 p-1 rounded-lg text-white" />
        <h2 className="font-semibold md:font-bold md:text-xl">
          Expense Tracker
        </h2>
      </div>

      <div className="flex gap-2 ">
        <div>
          <NavLink to="/" className={linkNav}>
            <FaChartColumn />
            <span className="hidden md:block">Dashboard</span>
          </NavLink>
        </div>

        <div className="">
          <NavLink to="/expense" className={linkNav}>
            <FaList />
            <span className="hidden md:block">Expense</span>
          </NavLink>
        </div>
      </div>

      <div>
        <button
          className="hidden md:block bg-blue-600 text-white py-2 px-3 rounded-md font-medium cursor-pointer"
          onClick={() => setShowForm(true)}
        >
          + Add Expense
        </button>

        <button
          className="md:hidden bg-blue-600 text-white py-2 px-3 rounded-md font-medium cursor-pointer"
          onClick={() => setShowForm(true)}
        >
          +
        </button>

        <div>
          {showForm && <AddExpense onClose={() => setShowForm(false)} />}
        </div>
      </div>
    </div>
  );
};

export default Header;
