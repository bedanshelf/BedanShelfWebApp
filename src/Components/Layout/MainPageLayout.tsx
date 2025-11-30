import Navbar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function MainPageLayout() {
  return (
    <>
      <div className="w-vw h-vh overflow-hidden">
        <Navbar></Navbar>
        <main className="scroller overflow-y-auto">
          <Outlet />
        </main>
        <Footer></Footer>
      </div>
    </>
  );
}
