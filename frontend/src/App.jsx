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

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/admin" element={<Admin />} />

        {/* Protected Dashboard Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="search" element={<Search />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="my-posts" element={<MyPosts />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
