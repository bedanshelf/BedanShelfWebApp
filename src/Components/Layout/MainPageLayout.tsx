import Navbar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function MainPageLayout() {
  return (
    <>
      <div className="h-dvh flex flex-col overflow-hidden">
        <Navbar></Navbar>
        <main className="scroller overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
          <Footer></Footer>
        </main>
      </div>
    </>
  );
}
