import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Welcome from './Welcome';
import Error from './modules/shares/Error';
import UserLogin from './modules/users/UserLogin';
import UserRegister from './modules/users/UserRegister';
import UserForget from './modules/users/UserForget';
import AdminLogin from './modules/admin/AdminLogin';
import LandingPage from './modules/users/userDashboard/LandingPage';

function App() {
  return (
  <BrowserRouter>
      <Routes>
        <Route path="" element={<Welcome />}></Route>
        <Route path="user-login" element={<UserLogin />}></Route>
        <Route path="user-register" element={<UserRegister />}></Route>
        <Route path="forgot-password" element={<UserForget />}></Route>
        <Route path="admin-login" element={<AdminLogin />}></Route>
        <Route path="landing" element={<LandingPage />}>
        
        </Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
