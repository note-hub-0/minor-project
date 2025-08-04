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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="/login" element = {<Login/>}/>
        <Route path="/notes" element = {<BrowseNotes/>}/>
        <Route path="/uploadNotes" element = {<UploadNotes/>}/>
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
