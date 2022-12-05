import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function ProfilePart() {
  const { token } = useAuth();

  if (!token) return <Navigate to="/login" />;

  return (
    <div>
      <Outlet />
    </div>
  );
}
