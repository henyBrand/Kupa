import { Link, useSearchParams } from "react-router-dom"
import { useGetAllFamiliesQuery, useUpdateFamilyMutation } from "../familiesApiSlice"
import "./FamiliesList.css"
import Search from "../../../components/search/Search"
import useGetFilePath from "../../../hooks/useGetFilePath"
import useAuth from "../../../hooks/useAuth"
import { FaFile, FaCirclePlus, FaRegPenToSquare } from "react-icons/fa6";
import { MdCancel, MdCheckCircle } from "react-icons/md"
import { LuFileText, LuFileX2 } from "react-icons/lu";

const FamiliesList = () => {
    const { role, _id } = useAuth()
    const { data: familiesObj, isError, error, isLoading } = useGetAllFamiliesQuery()
    const [updateFamily, { isSuccess: isUpdateSuccess }] = useUpdateFamilyMutation()

    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")

    const { getFilePath } = useGetFilePath()

    if (isLoading)
        return <h1>Loading...</h1>
    if (isError)
        return <h1>{JSON.stringify(error)}</h1>



    //להוסיף תנאים לפילטור (שם הבעל,האשה וכו)
    const namesArr = q && q.split(" ")

    let filteredData = !q ? [...familiesObj.data] : familiesObj.data.filter(family =>
        family.name.indexOf(q) > -1 ||
        family.parent1.first_name.indexOf(q) > -1 ||
        family.parent2.first_name.indexOf(q) > -1
    )


    if (role == "נציג") {

        filteredData = filteredData.filter(fam => fam.employee?._id === _id)
    }

    return (

        <div className="families-list">
            <div className="families-list-top">
                <Search placeholder="חיפוש לפי שם משפחה" />
                <Link to="/dash/families/add" className="families-list-add-button"><FaCirclePlus />
                </Link>
            </div>
            <table className="families-list-table">
                <thead>
                    <tr>
                        <td>שם משפחה</td>
                        <td>שם הבעל</td>
                        <td>שם האישה</td>
                        <td>מספר ילדים</td>
                        {role === 'מנהל' && <td>נציג</td>}
                        <td>ממתין</td>
                        <td>מאושר</td>
                        <td>לצילום ת"ז</td>
                        <td>עדכון</td>
                    </tr>
                </thead>
                <tbody>
                    {filteredData?.map(family =>
                        <tr key={family._id}>
                            <td>
                                <div className="families-list-family">
                                    {family.name}
                                </div>
                            </td>
                            <td>
                                {family.parent1?.first_name}
                            </td>
                            <td>
                                {family.parent2?.first_name}
                            </td>
                            <td>
                                {family.child?.length}
                            </td>
                            {role === 'מנהל' && <td>
                                {family.employee?.name}
                            </td>}
                            <td>
                                <div className={`toggle-button ${family.waiting ? 'on' : 'off'}`} onClick={() => { updateFamily({ ...family, id: family._id, waiting: !family.waiting }) }}>
                                    <div style={{ color: "red" }} className="toggle-circle">{family.waiting ? <MdCheckCircle /> : <MdCancel />}</div>
                                </div>


                            </td>
                            <td>
                                <div className={`toggle-button ${family.approved ? 'on' : 'off'}`} onClick={() => { updateFamily({ ...family, id: family._id, approved: !family.approved }) }}>
                                    <div style={{ color: "red" }} className="toggle-circle">{family.approved ? <MdCheckCircle /> : <MdCancel />}</div>
                                </div>
                            </td>
                            <td>
                                {family.tzFile ?<a href={getFilePath(family.tzFile)} target="_blank" rel="noopener noreferrer"><LuFileText /></a> :<LuFileX2 />                           }

                                <Link to={`/dash/families/${family._id}`} className="families-list-button families-list-view"><FaRegPenToSquare />
                                </Link>

                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div >
    )
}

export default FamiliesList


