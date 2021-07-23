import { Suspense } from "react";
// import { Router as ReachRouter, Redirect } from "@types/reach__router";

// logged out

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

// const Route = ({ children }) => <>{children}</>;

const Router = () => {
  return <Suspense></Suspense>;
};

export default Router;
