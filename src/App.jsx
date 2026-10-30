import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './assets/Toast.css';

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
import Event from "./modules/users/userDashboard/Event";

import AdminLanding from "./modules/admin/adminDashboard/AdminLanding";
import AdminMain from "./modules/admin/adminDashboard/AdminMain";
import AdminEvents from "./modules/admin/adminDashboard/AdminEvents";
import AdminCategories from "./modules/admin/adminDashboard/AdminCategories";
import AdminUsers from "./modules/admin/adminDashboard/AdminUsers";
import AdminRegistrations from "./modules/admin/adminDashboard/AdminRegistrations";
import AdminBookings from "./modules/admin/adminDashboard/AdminBookings";
import AdminPayments from "./modules/admin/adminDashboard/AdminPayments";
import AdminReports from "./modules/admin/adminDashboard/AdminReports";
import AdminNotifications from "./modules/admin/adminDashboard/AdminNotifications";
import AdminProfile from "./modules/admin/adminDashboard/AdminProfile";
import AdminSettings from "./modules/admin/adminDashboard/AdminSettings";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        toastClassName="eventora-toast"
        progressClassName="eventora-toast-progress"
      />
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
          <Route path="explore-events/event-details/:id" element={<Event />}></Route>
          <Route path="calendar" element={<Calendar />}></Route>
          <Route path="registrations/:id" element={<Registrations />}></Route>
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
          <Route path="" element={<AdminMain />}></Route>
          <Route path="events" element={<AdminEvents />}></Route>
          <Route path="categories" element={<AdminCategories />}></Route>
          <Route path="users" element={<AdminUsers />}></Route>
          <Route path="registrations" element={<AdminRegistrations />}></Route>
          <Route path="bookings" element={<AdminBookings />}></Route>
          <Route path="payments" element={<AdminPayments />}></Route>
          <Route path="reports" element={<AdminReports />}></Route>
          <Route path="reports" element={<AdminReports />}></Route>
          <Route path="notifications" element={<AdminNotifications />}></Route>
          <Route path="my-profile" element={<AdminProfile />}></Route>
          <Route path="settings" element={<AdminSettings />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
