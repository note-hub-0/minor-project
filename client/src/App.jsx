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
import NoteDetail from "./components/BrowseNotes/NoteDetail";
import PurchasedNotesPage from "./components/BrowseNotes/PurchasedNotesPage";
import SeeAllMyNotes from "./components/UserDashboard/SeeAllMyNotes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BuyPoints from "./components/Payment/BuyPoints";

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
        <Route path="/notes/:id" element = {<NoteDetail/>} />
        <Route path="/purchased-notes" element={<PurchasedNotesPage />} />
        <Route path="/user-notes" element={<SeeAllMyNotes />} />
        <Route path="/buy-points" element = {<BuyPoints/>} />
      </Route>
    )
  );
  return (
    <>
      <ThemeProvider>
        <RouterProvider router={router} />
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </ThemeProvider>
    </>
  );
}

export default App;
