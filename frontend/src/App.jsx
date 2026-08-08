import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/authentication/signup";
import Signin from "./components/authentication/signin";
import Admin from "./components/authentication/admin";
import ProtectedRoute from "./components/authentication/protectedRoute";
import Dashboard from "./components/Dashboard/userDashboard";
import Profile from "./components/Dashboard/pages/profile";
import Search from "./components/Dashboard/pages/search";
import CreatePost from "./components/Dashboard/pages/createpost";
import MyPosts from "./components/Dashboard/pages/myPost";
import UserProfile from "./components/Dashboard/pages/userProfile";
import AdminDashboard from "./components/AdminDashboard/adminDashboard";
import AdminOverview from "./components/AdminDashboard/pages/adminOverview";
import AdminUsers from "./components/AdminDashboard/pages/adminUsers";
import AdminUserProfile from "./components/AdminDashboard/pages/adminUserProfile";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/admin" element={<Admin />} />


        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="search" element={<Search />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="my-posts" element={<MyPosts />} />
            <Route path="user/:username" element={<UserProfile />} />
          </Route>
        </Route>

        <Route element ={<ProtectedRoute/>}>
          <Route path="/admindash" element={<AdminDashboard/>}>
            <Route index element={<AdminOverview />} />
            <Route path="overview" element={<AdminOverview />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="user/:username" element={<AdminUserProfile />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
