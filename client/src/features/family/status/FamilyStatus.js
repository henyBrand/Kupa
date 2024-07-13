import useAuth from "../../../hooks/useAuth"
import { useGetAllFamiliesQuery } from "../familiesApiSlice"

const FamilyStatus = () => {
    const { _id } = useAuth()

    const { data: familiesObj, isError, error, isSuccess, isLoading } = useGetAllFamiliesQuery()

    if (isLoading)
        return <h1>Loading...</h1>
    if (isError)
        return <h1>{JSON.stringify(error)}</h1>

    const family = familiesObj?.data?.find(fam => fam._id === _id)

    if (!family)
        return <h1>no family found</h1>

    // את השורות הבאות יש להפעיל בהתאם לצורך
    // useEffect(() => {
    //     if () {
    //         if (role === "משפחה") {
    //             navigate("/dash")
    //         }
    //         else {
    //             navigate("/dash/families")
    //         }
    //     }
    // }, [])

    return (
        <>
            FamilyStatus

            <h1>שלום משפחת {family.name} </h1>


        </>
    )
}

export default FamilyStatus
