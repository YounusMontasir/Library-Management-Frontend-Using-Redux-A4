import { Outlet } from "react-router";
import Navbar from "../shared/Navbar.js"
import Footer from "@/shared/Footer.js";

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
          <div className="min-h-screen">
             <Outlet></Outlet>
          </div>
           <Footer></Footer>
        </div>
    );
};

export default MainLayout;