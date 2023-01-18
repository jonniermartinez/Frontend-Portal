import { Route } from "wouter";
import Register from "./register";
import Login from "./login";
import Inicio from "../views/inicio";
import Logger from "./Logger";
export default function Navigation() {
  return (
    <>
      <Route path="/register" component={Register}></Route>
      <Route path="/" component={Login}></Route>
      <Route path="/inicio" component={Inicio}></Route>
      <Route path="/logger" component={Logger}></Route>
    </>
  );
}
