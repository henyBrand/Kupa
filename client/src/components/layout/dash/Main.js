import { Md3P, MdAccountBox, MdAccountCircle, MdAdd, MdAddPhotoAlternate, MdAddToPhotos, MdAlternateEmail, MdCall, MdCancel, MdCheckCircle, MdChecklist, MdContactMail, MdCopyright, MdDeleteOutline, MdDensitySmall, MdDesktopWindows, MdFamilyRestroom, MdFmdGood, MdGroupAdd, MdOutlineAccessTimeFilled } from "react-icons/md"
import { BsFillPersonVcardFill, BsPersonSquare } from "react-icons/bs"
import { IoPerson, IoPersonAdd } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";

import useAuth from "../../../hooks/useAuth"

const Main = () => {
    const { _id, username, role, name } = useAuth()

    return <div>
        <h1>{name}</h1>
        <MdCall />
        <MdDensitySmall />
        <MdDeleteOutline />
        <MdCopyright />
        <MdContactMail />
        <MdChecklist />
        <MdAlternateEmail />
        <MdAddToPhotos />
        <MdAddPhotoAlternate />
        <MdAdd />
        <MdAccountCircle />
        <MdAccountBox />
        <Md3P />
        <MdCheckCircle />
        <MdCancel />
        <BsPersonSquare />
        <BsFillPersonVcardFill />
        <IoPerson />
        <IoPersonAdd />
        <IoMdSettings />
        <MdOutlineAccessTimeFilled />
        <MdGroupAdd />
        <MdFmdGood />
        <MdFamilyRestroom />
        <MdDesktopWindows />
        <FaCirclePlus />
        <img src="logoKupa.png" />
        <img src="logoKupa-removebg-preview.png" />

    </div>
}

export default Main
