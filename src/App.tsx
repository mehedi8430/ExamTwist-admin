import { Navigate } from "react-router";

export default function App() {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to={"/dashboard"} />
      ) : (
        <Navigate to={"/admin/login"} />
      )}
    </>
  );
}
