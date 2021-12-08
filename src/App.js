import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./Components/Authentication/AuthProvider";
import PrivateRoute from "./Components/Authentication/PrivateRoute";
import ResetPassword from "./Components/ResetPassword";
import SignupLogin from "./Components/SignupLogin";
import User from "./Components/User";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignupLogin />} />
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
          <Route path="/resetpassword/:id" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
