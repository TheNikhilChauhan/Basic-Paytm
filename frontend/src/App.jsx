import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SigninPage } from "./pages/SigninPage";
import { SignupPage } from "./pages/SignupPage";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
