import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SigninPage } from "./pages/SigninPage";
import { SignupPage } from "./pages/SignupPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
