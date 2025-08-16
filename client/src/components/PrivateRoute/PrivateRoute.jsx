import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../Hooks/ContextApi/AuthContext/AuthContext";
import Spinner from "../Loader/Spinner"
import {Navigate, Outlet} from "react-router"

export default function PrivateRoute() {
  const { user, loading } = useContext(AuthContext);
    if (loading) return <Spinner/>
  return user ? <Outlet/> : <Navigate to="/login" replace />
}
