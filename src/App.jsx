//import { Link } from 'react-router-dom'
import React from 'react'
import { createBrowserRouter,RouterProvider, Route,Navigate,Outlet } from "react-router-dom";

import Home from './pages/home/Home';
import Login from './pages/login/Login'
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import Navbar from './components/navbar/Navbar';
import LeftBar from './components/leftbar/Leftbar'
import RightBar from './components/rightbar/Rightbar'
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
//import { AuthContext } from "./context/authContext";
import './style.scss'
function App() {
  const currentUser = true;
  //const {currentUser} = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
    <RouterProvider router={router} />
  </div>
  )
}

export default App
