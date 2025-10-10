import { Navigate } from "react-router";
import useCurrentUser from "./hooks/useCurrentUser";

export default function App() {
  const userData = useCurrentUser();
  console.log({ userData });

  return (
    <>
      {userData?.id ? (
        <Navigate to={"/dashboard"} />
      ) : (
        <Navigate to={"/admin/login"} />
      )}
    </>
  );
}
