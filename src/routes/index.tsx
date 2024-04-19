import { Routes, Route } from "react-router-dom";
import PathRoutes from "./PathRoutes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
// import Profile from "../pages/Profile";
import { Flex } from "@chakra-ui/react";
// import Dependents from "../pages/Dependents";

const RoutesComponent = () => {
  return (
    <Flex
      backgroundColor="primary.500"
      alignItems="center"
      justifyContent="center"
      h={"100vh"}
      w={"100vw"}
    >
      <Routes>
          <Route path={PathRoutes.REGISTER} element={<Register />} />
          <Route path={PathRoutes.LOGIN} element={<Login />} />
          <Route path={PathRoutes.HOME} element={<Home />} />
      </Routes>
    </Flex>
  )
}

export default RoutesComponent