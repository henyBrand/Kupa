import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllFamiliesQuery, useUpdateFamilyMutation } from "../familiesApiSlice"

import "./singleFamily.css"
import useAuth from "../../../hooks/useAuth";


const AddTzFile = ({FamId}) => {
    const [updateFamily, { isSuccess: isUpdateSuccess }] = useUpdateFamilyMutation()

    const { role } = useAuth()

    const navigate = useNavigate()
    const { familyId } = useParams()

    const { data: familiesObj, isError, error, isSuccess, isLoading } = useGetAllFamiliesQuery()

    // useEffect(() => {
    //     if (isUpdateSuccess) {
    //         if (role === "משפחה") {
    //             navigate("/dash")
    //         }
    //         else {
    //             navigate("/dash/families")
    //         }
    //     }
    // }, [isUpdateSuccess])


    const family = familiesObj?.data?.find(fam => fam._id === familyId)


    if (isLoading)
        return <h1>Loading...</h1>
    if (isError)
        return <h1>{JSON.stringify(error)}</h1>
    if (!family)
        return <h1>no family found</h1>
    const formSubmit2 = (e) => {

        console.log("data tzfile");
        console.log(data);

        e.preventDefault()
        const data = new FormData(e.target)
        updateFamily(data)


    }





    return <form onSubmit={formSubmit2} className="single-family-form">

        <label>צילום ת"ז</label>
        <input name="id" value={FamId}></input>
        <input type="file" name="tzFile" />
        <button>שלח</button>

    </form>
}

export default AddTzFile
