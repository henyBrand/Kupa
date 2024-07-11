import { Outlet } from "react-router-dom"
import Navbar from "../../navbar/Navbar"
import SideBar from "../../sidebar/SideBar"
import Footer from "../../footer/Footer"
import "./dash-layout.css"
const DashLayout =()=>{
    return <div className="container">
        <div className="menu">
            <SideBar/>
        </div>
        <div className="content">
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    </div>
}
export default DashLayout