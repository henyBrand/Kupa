import { MdCall, MdSearch } from "react-icons/md"
import { SiGmail } from "react-icons/si";
import { FaMapMarkerAlt } from "react-icons/fa";


import "./navbar.css"
const Navbar = () => {
    return <div className="Navbar">
        <div className="navbar-title">
            ראשי
        </div>
        <div className="navbar-menu">
            <div className="navbar-search">
                <MdSearch />
                <input type="text" placeholder="search" className="navbar-input" />
            </div>
            <div className="navbar-icons">
                <FaMapMarkerAlt size={30} title="נחל לוז 3 בית שמש" />
                <MdCall size={30} title="02-9951111" />
                <SiGmail size={30} title="a@gmail.com" />
            </div>
        </div>

    </div>
}
export default Navbar