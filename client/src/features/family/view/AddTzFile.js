import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllFamiliesQuery, useUpdateTzFileMutation } from "../familiesApiSlice"
import "./singleFamily.css"
import useAuth from "../../../hooks/useAuth";

const AddTzFile = ({ FamId }) => {
    const [updateTzFile, { isSuccess: isUpdateSuccess }] = useUpdateTzFileMutation()

    const navigate = useNavigate()

    const { data: familiesObj, isError, error, isSuccess, isLoading } = useGetAllFamiliesQuery()

    useEffect(() => {
        if (isUpdateSuccess) {
                navigate("/dash/")
        }
    }, [isUpdateSuccess])

    const family = familiesObj?.data?.find(fam => fam._id === FamId)

    if (isLoading)
        return <h1>Loading...</h1>
    if (isError)
        return <h1>{JSON.stringify(error)}</h1>
    if (!family)
        return <h1>No family found</h1>

    const formSubmit2 = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        updateTzFile(data)

    }

    return (
        <form onSubmit={formSubmit2} className="single-family-form">
            <label>צילום ת"ז</label>
            <input type="hidden" name="id" value={FamId} />
            <input type="file" name="tzFile" />
            <button type="submit">שלח</button>
        </form>
    )
}

export default AddTzFile;
