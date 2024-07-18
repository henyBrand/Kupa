const { NavLink } = require("react-router-dom")

const MenuLink = ({ item }) => {
    return (
        <NavLink to={item.path} className="side-bar-menu-link">
           <p className="icon">{item.icon}</p> 
           <p className="title">{item.title}</p>
        </NavLink>
    )
}

export default MenuLink