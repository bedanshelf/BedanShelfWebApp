import Navbar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function MainPageLayout() {
  return (
    <>
      <Navbar></Navbar>
      <main>
        <Outlet />
      </main>
      <Footer></Footer>
    </>
  );
}
