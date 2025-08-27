import { FaGauge, FaPen, FaTrash } from "react-icons/fa6";
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
      title: "Delete Expense",
      html: `
        <p>Are you sure to delete this expense</p>
        <h1 class = "bg-gray-200 w-full p-2 rounded-md text-xl font-bold mt-2">${expense.description} !</h2>`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Delete",
      confirmButtonColor: "#d33",
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
        <td className="px-6 py-2">
          <h2 className="font-medium">{expense.description}</h2>
          <p className="text-[12px] text-gray-400"> {expense.note} </p>
        </td>
        <td className="font-normal text-gray-500">$ {expense.amount} </td>
        <td className="font-normal text-gray-500"> {expense.category} </td>
        <td className="font-normal text-gray-500"> {expense.date} </td>
        <td>
          <div className="flex text-[12px] gap-4">
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
