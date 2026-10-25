import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Welcome from "./Welcome";
import Error from "./modules/shares/Error";
import UserLogin from "./modules/users/UserLogin";
import UserRegister from "./modules/users/UserRegister";
import UserForget from "./modules/users/UserForget";
import AdminLogin from "./modules/admin/AdminLogin";
import AdminRegister from "./modules/admin/AdminRegister";
import AdminForgotPassword from "./modules/admin/AdminForgotPassword";
import LandingPage from "./modules/users/userDashboard/LandingPage";
import MainPage from "./modules/users/userDashboard/MainPage";
import ExploreEvents from "./modules/users/userDashboard/ExploreEvents";
import Calendar from "./modules/users/userDashboard/Calendar";
import Registrations from "./modules/users/userDashboard/Registrations";
import MyBookings from "./modules/users/userDashboard/MyBookings";
import MyTickets from "./modules/users/userDashboard/MyTickets";
import Gallery from "./modules/users/userDashboard/Gallery";
import Wishlist from "./modules/users/userDashboard/Wishlist";
import Feedbacks from "./modules/users/userDashboard/Feedbacks";
import About from "./modules/shares/About";
import MyProfile from "./modules/users/userDashboard/MyProfile";
import Settings from "./modules/users/userDashboard/Settings";
import AdminLanding from "./modules/admin/adminDashboard/AdminLanding";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Welcome />}></Route>
        <Route path="user-login" element={<UserLogin />}></Route>
        <Route path="user-register" element={<UserRegister />}></Route>
        <Route path="forgot-password" element={<UserForget />}></Route>
        <Route path="admin-login" element={<AdminLogin />}></Route>
        <Route path="admin-register" element={<AdminRegister />}></Route>
        <Route path="admin-forgot-password" element={<AdminForgotPassword />}></Route>
        <Route path="user-dashboard" element={<LandingPage />}>
          <Route path="" element={<MainPage />}></Route>
          <Route path="explore-events" element={<ExploreEvents />}></Route>
          <Route path="calendar" element={<Calendar />}></Route>
          <Route path="registrations" element={<Registrations />}></Route>
          <Route path="my-bookings" element={<MyBookings />}></Route>
          <Route path="my-tickets" element={<MyTickets />}></Route>
          <Route path="gallery" element={<Gallery />}></Route>
          <Route path="wishlist" element={<Wishlist />}></Route>
          <Route path="feedback" element={<Feedbacks />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="my-profile" element={<MyProfile />}></Route>
          <Route path="settings" element={<Settings />}></Route>
        </Route>
        <Route path="admin-dashboard" element={<AdminLanding />}>
          <Route path="*" element={<Error />}></Route>

        </Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
