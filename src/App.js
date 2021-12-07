import AuthProvider from "./Components/Authentication/AuthProvider";
import SignupLogin from "./Components/SignupLogin";

function App() {
  return (
    <AuthProvider>
      <SignupLogin></SignupLogin>
    </AuthProvider>
  );
}

export default App;
