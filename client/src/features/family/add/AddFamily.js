import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAddFamilyMutation } from "../familiesApiSlice"
import "./addFamily.css"

const AddFamily = () => {
    const [addFamily, { data, isError, error, isSuccess, isLoading }] = useAddFamilyMutation()
    const [firstName, setfirst_name] = useState("")
    const [birthDate, setbirth_date] = useState("")
    const [tuitionS, settuition] = useState("")
    const [a, setA] = useState(false)
    const [chi, setChi] = useState([])

    const navigate = useNavigate()
    useEffect(() => {
        if (isSuccess) {
            navigate("/dash/families")
        }
    }, [isSuccess])



    const formSubmitChaild = () => {
        setA(false)
        const objChild = {
            first_name: firstName,
            birth_date: birthDate,
            tuition: tuitionS
        }
        setChi(prevChai => [...prevChai, objChild]);
    }


    const formSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const objFamily = Object.fromEntries(data.entries())

        const newObjFamily = {
            name: objFamily.name,
            username: objFamily.username,
            password: objFamily.password,
            address: {
                street: objFamily.street,
                neighborhood: objFamily.neighborhood,
                city: objFamily.city
            },
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
        }

        addFamily(newObjFamily)
    }
    return (
        <div className="add-family-container">
            {/* //////////////////// */}
            <form onSubmit={formSubmit} className="add-family-form">
                <input type="text" required name="name" placeholder="שם משפחה" />
                <input type="text" required name="username" placeholder="שם משתמש" />
                <input type="password" required name="password" placeholder="סיסמה" />
                <label name="parent1">
                    <h3>פרטי הורה 1</h3>
                    <input type="text" name="first_name1" placeholder="שם" />
                    <input type="text" name="tz1" placeholder="ת.ז." />
                    <input type="date" name="birth_date1" placeholder="תאריך לידה" />
                    <input type="text" name="phone1" placeholder="פלאפון" />
                    <input type="text" name="occupation1" placeholder="עיסוק" />
                </label>
                <label name="parent2">
                    <h3>פרטי הורה 2</h3>
                    <input type="text" name="first_name2" placeholder="שם" />
                    <input type="text" name="tz2" placeholder="ת.ז." />
                    <input type="date" name="birth_date2" placeholder="תאריך לידה" />
                    <input type="text" name="phone2" placeholder="פלאפון" />
                    <input type="text" name="occupation2" placeholder="עיסוק" />
                </label>
                <h3>ילדים</h3> 
                <button type="button" onClick={() => { setA(true) }} >פלוס </button>

                {chi?.map((c, index) => (
                    <label key={index} name="child">
                        <input type="text" defaultValue={c.first_name} name="first_name" placeholder="שם" onChange={(e) => { setfirst_name(e.target.value) }} />
                        <input type="date" defaultValue={c.birth_date} name="birth_date" placeholder="תאריך לידה" onChange={(e) => { setbirth_date(e.target.value) }} />
                        <input type="text" defaultValue={c.tuition} name="tuition" placeholder="עלות שכר לימוד" onChange={(e) => { settuition(e.target.value) }} />
                    </label>
                ))}
                {a && <form className="add-family-form">

                    <label name="child">
                        <input type="text" name="first_name" placeholder="שם" onChange={(e) => { setfirst_name(e.target.value) }} />
                        <input type="date" name="birth_date" placeholder="תאריך לידה" onChange={(e) => { setbirth_date(e.target.value) }} />
                        <input type="text" name="tuition" placeholder="עלות שכר לימוד" onChange={(e) => { settuition(e.target.value) }} />
                    </label>
                    <button type="button" onClick={formSubmitChaild}>הוסף</button>
                </form>}

                <label name="address">
                    <input type="text" name="street" placeholder="רחוב" />
                    <input type="text" name="neighborhood" placeholder="שכונה" />
                    <input type="text" name="city" placeholder="עיר" />
                </label>
                <input type="text" name="phone" placeholder="טלפון" />
                <input type="email" name="email" placeholder="אימייל" />

                <select required="true" name="marital_status">
                    <option value="">מצב משפחתי</option>
                    <option value="נשוי/אה">נשוי/אה</option>
                    <option value="רווק/ה">רווק/ה</option>
                    <option value="גרוש/ה">גרוש/ה</option>
                    <option value="פרוד/ה">פרוד/ה</option>
                    <option value="אלמן/נה">אלמן/נה</option>
                </select>
                <label name="bank_details">
                    <h3>פרטי בנק</h3>
                    <input type="text" required="true" name="name" placeholder="שם בעל החשבון" />
                    <input type="text" required="true" name="bank_number" placeholder="מספר בנק" />
                    <input type="text" required="true" name="branch_number" placeholder="מספר סניף" />
                    <input type="text" required="true" name="account_number" placeholder="מספר חשבון" />
                </label>

                <button type="submit">שלח</button>
            </form>

        </div>
    )
}

export default AddFamily
