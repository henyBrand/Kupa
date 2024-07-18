import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllFamiliesQuery, useUpdateFamilyMutation, useUpdateTzFileMutation } from "../familiesApiSlice"
import "./singleFamily.css"
import useAuth from "../../../hooks/useAuth";
import ChangeEmployeeForFamily from "./ChangeEmployeeForFamily";


const SingleFamily = () => {
    const [updateTzFile] = useUpdateTzFileMutation()
    const { role } = useAuth()
    const navigate = useNavigate()
    const { familyId } = useParams()

    const { data: familiesObj, isError, error, isSuccess, isLoading } = useGetAllFamiliesQuery()
    const [updateFamily, { isSuccess: isUpdateSuccess }] = useUpdateFamilyMutation()
    //בשביל הילדים
    const [firstName, setfirst_name] = useState("")
    const [birthDate, setbirth_date] = useState("")
    const [tuitionS, settuition] = useState("")
    const [add, setAdd] = useState(false)
    const [chi, setChai] = useState([])

    useEffect(() => {
        if (isUpdateSuccess) {
            if (role === "משפחה") {
                navigate("/dash")
            }
            else {
                navigate("/dash/families")
            }
        }
    }, [isUpdateSuccess])

    const family = familiesObj?.data?.find(fam => fam._id === familyId)

    useEffect(() => {
        if (family) {
            setChai(family.child)
        }
    }, [family])

    if (isLoading)
        return <h1>Loading...</h1>
    if (isError)
        return <h1>{JSON.stringify(error)}</h1>
    if (!family)
        return <h1>no family found</h1>

    const formSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)

        const objFamily = Object.fromEntries(data.entries())
        
        const newObjFamily = {
            name: objFamily.familyname,
            id: familyId,
            username: objFamily.username,
            password: objFamily.password,
            address: {
                street: objFamily.street,
                neighborhood: objFamily.neighborhood,
                city: objFamily.city
            },
            employee: objFamily.employee || undefined,
            phone: objFamily.phone,
            email: objFamily.email,
            marital_status: objFamily.marital_status,
            parent1: {
                first_name: objFamily.first_name1,
                tz: objFamily.tz1,
                birth_date: objFamily.birth_date1,
                phone: objFamily.phone1,
                occupation: objFamily.occupation1
            },
            parent2: {
                first_name: objFamily.first_name2,
                tz: objFamily.tz2,
                birth_date: objFamily.birth_date2,
                phone: objFamily.phone2,
                occupation: objFamily.occupation2
            },
            child: chi,
            bank_details: {
                name: objFamily.name,
                bank_number: objFamily.bank_number,
                branch_number: objFamily.branch_number,
                account_number: objFamily.account_number
            },
            approved: family.approved,
            waiting: family.waiting,
            tzFule: family.tzFile
        }
        updateFamily(newObjFamily)
    }
    const formSubmitChaild = () => {
        setAdd(false)
        const objChaild = {
            first_name: firstName,
            birth_date: birthDate,
            tuition: tuitionS
        }
        setChai(prevChai => [...prevChai, objChaild]);
    }

    const addTzFile = async (file) => {
        await updateTzFile({ id: family._id, tzFile: file}) // עדכן את הקריאה לפונקציה updateTzFile
    }


    return (
        <div className="single-family-container">
            <div className="single-family-info">
                {`${family.name} ${family.parent1?.first_name} ${family.parent2?.first_name}`}
            </div>
            <div className="single-family-form-container">
                <form onSubmit={formSubmit} className="single-family-form">

                    <input type="text" defaultValue={family.name} required name="familyname" placeholder="שם משפחה" />
                    
                    <input type="text" defaultValue={family.username} required name="username" placeholder="שם משתמש" />
                    <input type="password" defaultValue={family.password} name="password" placeholder="סיסמה" />
                    <label name="parent1">
                        <h3>פרטי הורה 1</h3>
                        <input type="text" defaultValue={family.parent1?.first_name} name="first_name1" placeholder="שם" />
                        <input type="text" defaultValue={family.parent1?.tz} name="tz1" placeholder="ת.ז." />
                        <input type="date" defaultValue={family.parent1?.birth_date} name="birth_date1" placeholder="תאריך לידה" />
                        <input type="text" defaultValue={family.parent1?.phone} name="phone1" placeholder="פלאפון" />
                        <input type="text" defaultValue={family.parent1?.occupation} name="occupation1" placeholder="עיסוק" />
                    </label>
                    <label name="parent2">
                        <h3>פרטי הורה 2</h3>
                        <input type="text" defaultValue={family.parent2?.first_name} name="first_name2" placeholder="שם" />
                        <input type="text" defaultValue={family.parent2?.tz} name="tz2" placeholder="ת.ז." />
                        <input type="date" defaultValue={family.parent2?.birth_date} name="birth_date2" placeholder="תאריך לידה" />
                        <input type="text" defaultValue={family.parent2?.phone} name="phone2" placeholder="פלאפון" />
                        <input type="text" defaultValue={family.parent2?.occupation} name="occupation2" placeholder="עיסוק" />
                    </label>
                    <h3>ילדים</h3>
                    {chi?.map((c, index) => (
                        <label key={index} name="child">
                            <input type="text" defaultValue={c.first_name} name="first_name" placeholder="שם" onChange={(e) => { setfirst_name(e.target.value) }} />
                            <input type="date" defaultValue={c.birth_date} name="birth_date" placeholder="תאריך לידה" onChange={(e) => { setbirth_date(e.target.value) }} />
                            <input type="text" defaultValue={c.tuition} name="tuition" placeholder="עלות שכר לימוד" onChange={(e) => { settuition(e.target.value) }} />
                        </label>
                    ))}
                    <button type="button" onClick={() => { setAdd(true) }}>פלוס </button>
                    {add && <label name="child">
                        <h3>ילדים</h3>
                        <input type="text" name="first_name" placeholder="שם" onChange={(e) => { setfirst_name(e.target.value) }} />
                        <input type="date" name="birth_date" placeholder="תאריך לידה" onChange={(e) => { setfirst_name(e.target.value) }} />
                        <input type="text" name="tuition" placeholder="עלות שכר לימוד" onChange={(e) => { setfirst_name(e.target.value) }} />
                        <button type="button" onClick={formSubmitChaild}>הוסף</button>
                    </label>
                    }

                    <label name="address">
                        <input type="text" defaultValue={family.address?.street} name="street" placeholder="רחוב" />
                        <input type="text" defaultValue={family.address?.neighborhood} name="neighborhood" placeholder="שכונה" />
                        <input type="text" defaultValue={family.address?.city} name="city" placeholder="עיר" />
                    </label>

                    <input type="text" defaultValue={family.phone} name="phone" placeholder="טלפון" />
                    <input type="email" defaultValue={family.email} name="email" placeholder="אימייל" />

                    <select required name="marital_status">
                        <option value="">מצב משפחתי</option>
                        <option selected={family.marital_status === "נשוי/אה"} value="נשוי/אה">נשוי/אה</option>
                        <option selected={family.marital_status === "רווק/ה"} value="רווק/ה">רווק/ה</option>
                        <option selected={family.marital_status === "גרוש/ה"} value="גרוש/ה">גרוש/ה</option>
                        <option selected={family.marital_status === "פרוד/ה"} value="פרוד/ה">פרוד/ה</option>
                        <option selected={family.marital_status === "אלמן/נה"} value="אלמן/נה">אלמן/נה</option>
                    </select>

                    <label name="bank_details">
                        <h3>פרטי בנק</h3>
                        <input type="text" defaultValue={family.bank_details?.name} required name="name" placeholder="שם בעל החשבון" />
                        <input type="text" defaultValue={family.bank_details?.bank_number} required name="bank_number" placeholder="מספר בנק" />
                        <input type="text" defaultValue={family.bank_details?.branch_number} required name="branch_number" placeholder="מספר סניף" />
                        <input type="text" defaultValue={family.bank_details?.account_number} required name="account_number" placeholder="מספר חשבון" />
                    </label>

                    <label>צילום ת"ז</label>
                    <input type="file" name="tzFile" onChange={(e) => { addTzFile((e.target.files[0])) }} />

                    {role === 'מנהל' && <ChangeEmployeeForFamily family={family} />}
                    <button>שלח</button>
                </form>
            </div>
        </div>
    )
}

export default SingleFamily
