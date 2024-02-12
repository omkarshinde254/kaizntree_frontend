import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "./components/toast/toaster"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route element={<ProtectedRoute />} >
            <Route path="/dashboard" element={<Dashboard />} exact />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
