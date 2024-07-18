import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useGetAllFamiliesQuery } from "../familiesApiSlice";
import { MdAlternateEmail, MdCall } from "react-icons/md";
import './emploeeDetails.css';
import { SiGmail } from "react-icons/si";

const EmploeeDetails = () => {
    const { _id } = useAuth();
    const { data: familiesObj, isError, error, isLoading } = useGetAllFamiliesQuery();

    if (isLoading)
        return <h1>Loading...</h1>;
    if (isError)
        return <h1>{JSON.stringify(error)}</h1>;

    const family = familiesObj?.data?.find(fam => fam._id === _id);

    if (!family)
        return <h1>No family found</h1>;

    return (
        <div className="employee-details-container">
            <h1>שלום משפחת {family.name}</h1>

            <p>הנציג שלכם: {family.employee?.name}</p>

            <p>ילווה אתכם ויתמוך בכם בכל מצב -בזמני שמחה ובזמני קושי. </p>

            <p>אל תהססו לפנות לנציג שלכם בכל שאלה או בקשה. הוא כאן כדי לעזור לכם.</p>

            <h2>פרטי התקשרות:</h2>
            <p>
                <a href={`mailto:${family.employee?.email}`}>
                    <SiGmail title={family.employee?.email}/>  מייל: {family.employee?.email}
                </a>
            </p>
            <p>
                <a href={`tel:${family.employee?.phone}`}>
                    <MdCall title={family.employee?.phone}/> פלאפון: {family.employee?.phone}
                </a>
            </p>

        </div>
    );
};

export default EmploeeDetails;
