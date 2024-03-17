import { lazy } from "react";
import { RouteObject } from "react-router";
import { errorsRoutes } from "./constants";

const Error403 = lazy(() => import("./pages/Error403"));

const errorsRouter: RouteObject[] = [
  {
    path: errorsRoutes["403"].path,
    element: <Error403 />
  }
];

export default errorsRouter;
