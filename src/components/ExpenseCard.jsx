import { FaCalendar, FaGauge, FaPen, FaTrash } from "react-icons/fa6";
import moment from "moment";
import AddExpense from "./AddExpense";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUpdatingDate, deleteExpense } from "../store/api/ExpenseSlice";
import Swal from "sweetalert2";

const ExpenseCard = ({ expense }) => {
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
    <div>
      <div>
        <div className="shadow-md rounded-md p-4 ">
          <div className="space-y-2">
            <div className="flex justify-between">
              <h2>{expense.description}</h2>
              <div className="flex text-[12px] gap-2">
                <button
                  onClick={() => {
                    setShowUpdate(true);
                    dispatch(setUpdatingDate(expense));
                  }}
                >
                  <FaPen className="text-blue-600" />
                </button>
                <button onClick={() => handleDelete(expense.id)}>
                  <FaTrash className="text-red-600" />
                </button>
              </div>
            </div>
            <h4 className="font-bold text-xl">$ {expense.amount}</h4>
            <div className="flex items-center gap-2">
              <FaGauge className="text-gray-400" />
              <h2
                className={
                  expense.category === "Bills"
                    ? "px-1 rounded-xl bg-orange-200"
                    : expense.category === "Transport"
                    ? "px-1 rounded-xl bg-blue-200"
                    : expense.category === "Entertainment"
                    ? "px-1 rounded-xl bg-fuchsia-200"
                    : expense.category === "Food"
                    ? "px-1 rounded-xl bg-green-200"
                    : "px-1 rounded-xl bg-gray-200"
                }
              >
                {expense.category}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <FaCalendar />
              <p>{moment(expense.date).format("DD-MM-YYYY")}</p>
            </div>

            <div className="text-gray-400 bg-gray-50 rounded-md py-1 px-2">
              <p>{expense.note}</p>
            </div>
          </div>

          {showUpdate && <AddExpense onClose={() => setShowUpdate(false)} />}
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
