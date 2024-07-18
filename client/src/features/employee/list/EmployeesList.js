import { Link, useSearchParams } from "react-router-dom"
import { useDeleteEmployeeMutation, useGetAllEmployeesQuery, useUpdateEmployeeMutation } from "../employeesApiSlice"
import "./EmployeesList.css"
import Search from "../../../components/search/Search"
import useAuth from "../../../hooks/useAuth"
import { FaCirclePlus, FaRegPenToSquare } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md"


const EmployeesList = () => {

    const { role ,_id} = useAuth()

    const { data: employeesObj, isError, error, isLoading, isSuccess } = useGetAllEmployeesQuery()
    const [updateEmployee, { isSuccess: isUpdateSuccess }] = useUpdateEmployeeMutation()
    const [deleteEmployee, { isSuccess: isDeleteSuccess, isError: isDeleteEror }] = useDeleteEmployeeMutation()
    const deleteClick = (employee) => {
        if (window.confirm("האם אתה בטוח שברצונך למחוק את העובד")) {
            deleteEmployee({ id: employee._id })
        }
    }

    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")

    if (isLoading)
        return <h1>Loading...</h1>
    if (isError)
        return <h1>{JSON.stringify(error)}helllo</h1>

    const filteredData = !q ? [...employeesObj.data] : employeesObj.data.filter(emp => emp.name.indexOf(q) > -1)

    return (
        <div className="employees-list">
            <div className="employees-list-top">
                <Search placeholder="חיפוש לפי שם נציג" />
                {role === 'מנהל' && <Link to="/dash/employees/add" className="employees-list-add-button"><FaCirclePlus />
                </Link>}
            </div>
            <table className="employees-list-table">
                <thead>
                    <tr>
                        <td>שם העובד</td>
                        <td>פלאפון</td>
                        <td>אימייל</td>
                        <td>מס משפחות שלי</td>
                    </tr>
                </thead>
                <tbody>
                    {filteredData?.map(employee => {
                        if (employee.role == 'נציג' && employee._id != _id) {
                            return <tr key={employee._id}>
                                <td>
                                    <div className="employees-list-employee">
                                        {employee.name}
                                    </div>
                                </td>
                                <td>
                                    {employee.phone}
                                </td>
                                <td>
                                    {employee.email}
                                </td>
                                {role === 'מנהל' && <td>
                                    <Link to={`/dash/employees/${employee._id}`} className="employees-list-button employees-list-view"><FaRegPenToSquare /></Link>
                                    <button onClick={() => { deleteClick(employee) }} className="employees-list-button employees-list-delete"><MdDeleteOutline/></button>
                                    <button onClick={() => { updateEmployee({ ...employee, role: "מנהל" }) }} className="employees-list-button employees-list-delete">הפוך למנהל</button>
                                </td>}
                            </tr>
                        }
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default EmployeesList
