import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Table from "./pages/Table";
import AuthLayout from "./components/Layout/AuthLayout";
import GuestLayout from "./components/Layout/GuestLayout";
import Login from "./pages/auth/Login";
import Blank from "./pages/Blank";
import Form from "./pages/Form";
import RegisterIndex from "./pages/auth/Register";
import DashboardPassageiro from "./pages/DashboardPassageiro";
import TablePassageiro from "./pages/TablePassageiro";
import PassageiroLayout from "./components/Layout/PassageiroLayout";
import HistoryPassageiro from "./pages/HistoryPassageiro";
import HistoryMotorista from "./pages/HistoryMotorista";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/table" element={<Table />}></Route>
        <Route path="/blank" element={<Blank />}></Route>
        <Route path="/historico" element={<HistoryMotorista />}></Route>
        <Route path="/form" element={<Form />}></Route>
        <Route path="/profile" element={<Blank />}></Route>
      </Route>
      <Route path="/auth" element={<GuestLayout />}>
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/auth/register" element={<RegisterIndex />}></Route>
      </Route>
      <Route path="/passageiro" element={<PassageiroLayout />}>
        <Route path="/passageiro/" element={<DashboardPassageiro />}></Route>
        <Route path="/passageiro/table" element={<TablePassageiro />}></Route>
        <Route path="/passageiro/historico" element={<HistoryPassageiro />}></Route>
        <Route path="/passageiro/profile" element={<Blank />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
