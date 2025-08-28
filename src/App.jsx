import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ExpensesCardPage from "./pages/ExpensesCardPage";
import ExpensesListPage from "./pages/ExpensesListPage";
import ExpenseCards from "./components/ExpenseCard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/expense" element={<ExpensesCardPage />} />
          <Route path="/expense/expenseCard" element={<ExpensesCardPage />} />
          <Route path="/expense/expenseList" element={<ExpensesListPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
