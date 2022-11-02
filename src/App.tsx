import "./App.css";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Account from "./components/pages/Account";
import ChangePassword from "./components/pages/ResetPassword/ChangePassword";
import Dashboard from "./components/pages/Dashboard";
import Footer from "./components/parts/Footer";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Navbar from "./components/parts/Navbar";
import NotFound from "./components/pages/NotFound";
import ProtectedRoute from "./utils/ProtectedRoute";
import React, {useState} from "react";
import Register from "./components/pages/Register";
import ResetPassword from "./components/pages/ResetPassword";
import Tamago from "./components/pages/Tamago";
import Terms from "./components/pages/Terms";
import {ToastContainer} from "react-toastify";
import ContactForm from "./components/pages/Home/ContactForm";


const App = () => {
  const [fullScreen, setFullScreen] = useState(false);

  const onOffFullScreen = () => {
    fullScreen
      ? setFullScreen(false)
      : setFullScreen(true);
  };

  const offFullScreenOnLocationChange = () => {
    setFullScreen(false);
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <ToastContainer
          autoClose={5000}
          limit={1}
          pauseOnFocusLoss={false}
          position="top-center"
          rtl={false}
        />
        <Navbar
          fullScreen={fullScreen}
          offFullScreenOnLocationChange={offFullScreenOnLocationChange} />
        <main className="bg-gradient-to-b from-blue-medium to-blue-dark grow">
          <Routes>
            <Route
              element={<Home />}
              path="/"
            />
            <Route
              element={<Login />}
              path="/login"
            />
            <Route
              element={<Register />}
              path="/signin"
            />
            <Route
              element={<ResetPassword />}
              path="/password-reset"
            />
            <Route
              element={<ChangePassword />}
              path="/password-change"
            />
            <Route
              element={<Terms />}
              path="/terms-and-condition"
            />
            <Route
              element={<ContactForm />}
              path="/contact-form"
            />
            {/* Authentification needed */}
            <Route
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
              path="/account"
            />
            <Route
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
              path="/dashboard"
            />
            <Route
              element={
                <ProtectedRoute>
                  <Tamago
                    fullScreen={fullScreen}
                    onOffFullScreen={onOffFullScreen} />
                </ProtectedRoute>
              }
              path="/tamagotchi/:id"
            />
            <Route
              element={<NotFound />}
              path="*"
            />
          </Routes>
        </main>
        <Footer fullScreen={fullScreen} />
      </div>
    </BrowserRouter>
  );
};

export default App;
