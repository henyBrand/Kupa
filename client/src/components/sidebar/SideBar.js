import { MdChecklist, MdDensitySmall, MdDeselect, MdDesktopWindows, MdFamilyRestroom, MdLogout, MdSearch } from "react-icons/md"
import { useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";

import "./sidebar.css"
import MenuLink from "./MenuLink"
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import useAuth from "../../hooks/useAuth";
import { IoPerson } from "react-icons/io5";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";

const SideBar = () => {


    const { username, name, role, _id } = useAuth()
    const [logout, { isSuccess }] = useSendLogoutMutation()
    const navigate = useNavigate()


    const employeeMenuItems = [
                {
                    title: "ראשי",
                    path: "/dash",
                    icon: <RxDashboard size={35}/>,
                },
                {
                    title: "משפחות",
                    path: "/dash/families",
                    icon: <MdFamilyRestroom size={35}/>,
                }, {
                    title: "נציגים",
                    path: "/dash/employees",
                    icon: <IoPerson size={35}/>,
                }, {
                    title: "מנהלים",
                    path: "/dash/admins",
                    icon: <BsFillPersonVcardFill size={35}/>,
                }, {
                    title: "עדכון פרטים",
                    path: role === "נציג" ? `/dash/employees/${_id}` : `/dash/admins/${_id}`,
                    icon: <MdChecklist size={35}/>,
                },
            
                {
                    title: "הגדרות",
                    path: "/dash/settings",
                    icon: <IoMdSettings size={35}/>,
                },
                {
                    title: "אודות",
                    path: "/dash/about",
                    icon: <MdDensitySmall size={35}/>,
                }
            ]


 
    const familyMenuItems = [
             {
                    title: "ראשי",
                    path: "/dash",
                    icon: <RxDashboard size={35}/>,
                }, {
                    title: "עדכון פרטים אישיים",
                    path: `/dash/families/${_id}`,
                    icon: <MdChecklist size={35}/>,
                }, {
                    title: "סטטוס",
                    path: `/dash/families/status`,
                    icon: <MdChecklist size={35}/>,
                }, {
                    title: "פרטי נציג",
                    path: `/dash/families/emploeeDetails`,
                    icon: <IoPerson size={35}/>,
                },
                {
                    title: "הגדרות",
                    path: "/dash/settings",
                    icon: <IoMdSettings size={35}/>,
                },
                {
                    title: "אודות",
                    path: "/dash/about",
                    icon: <MdDensitySmall size={35}/>,
                }
            ]

    const menuItems = role === "מנהל" || role === "נציג" ? employeeMenuItems : familyMenuItems

  
    const logoutClick = () => {
        logout()
        navigate("/login")

    }
    return <div className="side-bar">
        <div className="side-bar-user">
                {role === "מנהל" ? <BsFillPersonVcardFill  size={20}/> : role === "נציג" ? <IoPerson size={20}/> : <MdFamilyRestroom size={20}/>}
                <span className="side-bar-user-fullname">{name}</span>
                <span className="side-bar-user-role">{role}</span>

        </div>
        <div >
        <ul className="side-bar-menu-list" >{menuItems.map(item => (
                <MenuLink item={item} key={item.title} />
            ))}
        </ul>
        </div>
        <div>
        <button onClick={logoutClick} className="side-bar-logout">
            <MdLogout size={20}/>
            יציאה
        </button>
        </div>

    </div>
}
export default SideBar