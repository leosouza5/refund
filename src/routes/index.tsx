import { BrowserRouter } from "react-router";

import { AuthRoutes } from "./AuthRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";


export const Routes = () => {
  return (
    <BrowserRouter>
      {/* <AuthRoutes /> */}
      <EmployeeRoutes />
    </BrowserRouter>
  )
}