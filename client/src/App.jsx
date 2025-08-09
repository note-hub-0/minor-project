import { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Home from "./components/Home/Home";
import Layout from "./Layout";
import "./App.css";
import { ThemeProvider } from "./Hooks/ContextApi/Theme/ThemeProvider";
import Login from "./components/Login/Login";
import BrowseNotes from "./components/BrowseNotes/BrowseNotes";
import UploadNotes from "./components/UploadNotes/UploadNotes";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import PointHistory from "./components/UserDashboard/PointHistory";
import Signup from "./components/Signup/Signup";
import AboutUsPage from "./components/AboutUs/AboutUsPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="/login" element = {<Login/>}/>
        <Route path="/notes" element = {<BrowseNotes/>}/>
        <Route path="/uploadNotes" element = {<UploadNotes/>}/>
        <Route path="/profile" element = {<UserDashboard/>} />
        <Route path="/point-history" element = {<PointHistory/>}/>
        <Route path="/signup" element = {<Signup/>} />
        <Route path="/about" element ={ <AboutUsPage/> }/>
      </Route>
    )
  );
  return (
    <>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
