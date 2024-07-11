import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
