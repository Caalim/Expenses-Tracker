import {
  FaGauge,
  FaPen,
  FaTrash,
  FaTriangleExclamation,
} from "react-icons/fa6";
import moment from "moment";
import AddExpense from "./AddExpense";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUpdatingDate, deleteExpense } from "../store/api/ExpenseSlice";
import Swal from "sweetalert2";
const ExpenseList = ({ expense }) => {
  const [showUpdate, setShowUpdate] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = (expenseId) => {
    Swal.fire({
      title: `<div class= "flex items-center gap-2">
      <div class="bg-red-200 p-2 flex items-center justify-center  rounded-full "><i class="fa-solid fa-triangle-exclamation text-[18px] text-red-400"></i></div>
      <h2 class= "font-medium text-[14px]  ">Delete Expense</h2>
      </div>`,
      html: `
        <p>Are you sure to delete this expense</p>
        <h1 class = "bg-gray-200 w-full p-2 rounded-md text-xl font-bold mt-2">${expense.description} !</h2>`,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Delete",
      confirmButtonColor: "#2563EB",
      width: "350px",
      padding: "0px",
    }).then((event) => {
      if (event.isConfirmed) {
        dispatch(deleteExpense({ expenseId: expense.id }));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Expense deleted successfully",
          html: `<h1 class = "bg-gray-200 w-full p-2 rounded-md text-xl font-bold">${expense.description} !</h2>`,
          confirmButtonColor: "#0046FF",
        });
      }
    });
  };

  return (
    <>
      <tr className="border-b-1 border-gray-300">
        <td className="px-2 md:px-6 py-2 w-26 md:w-auto  break-words text-left">
          <h2 className=" font-medium">{expense.description}</h2>
          <p className="text-[12px] text-gray-400"> {expense.note} </p>
        </td>
        <td className="font-normal text-gray-500 pl-8 md:pl-0">
          $ {expense.amount}{" "}
        </td>
        <td className="font-normal text-gray-500 px-6 md:px-0 ">
          <h2
            className={`inline-block px-2 rounded-xl  ${
              expense.category === "Bills"
                ? "px-1 py-1 rounded-xl bg-orange-200"
                : expense.category === "Transport"
                ? "bg-blue-200"
                : expense.category === "Entertainment"
                ? "bg-fuchsia-200"
                : expense.category === "Food"
                ? "bg-green-200"
                : "bg-gray-200"
            }`}
          >
            {expense.category}
          </h2>
        </td>
        <td className="hidden md:table-cell font-normal text-gray-500">
          {expense.date}
        </td>
        <td className="hidden  md:table-cell ">
          <div className="flex text-[12px] gap-4 ">
            <button
              onClick={() => {
                setShowUpdate(true);
                dispatch(setUpdatingDate(expense));
              }}
            >
              <FaPen className="text-blue-600" />
            </button>
            <button>
              <FaTrash
                className="text-red-600"
                onClick={() => handleDelete(expense.id)}
              />
            </button>
          </div>
        </td>

        {showUpdate && <AddExpense onClose={() => setShowUpdate(false)} />}
      </tr>
    </>
  );
};

export default ExpenseList;
