import { Link, useSearchParams } from "react-router-dom";
import { useGetAllFamiliesQuery, useUpdateFamilyMutation } from "../familiesApiSlice";
import "./FamiliesList.css";
import Search from "../../../components/search/Search";
import useGetFilePath from "../../../hooks/useGetFilePath";
import useAuth from "../../../hooks/useAuth";
import { FaFile, FaCirclePlus, FaRegPenToSquare } from "react-icons/fa6";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import { LuFileText, LuFileX2 } from "react-icons/lu";
import { useState, useEffect } from "react";

const FamiliesList = () => {
    const { role, _id } = useAuth();
    const { data: familiesObj, isError, error, isLoading } = useGetAllFamiliesQuery();
    const [updateFamily] = useUpdateFamilyMutation();
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q");

    const { getFilePath } = useGetFilePath();

    const [waitingS, setWaiting] = useState(false);
    const [allS, setAll] = useState(false);
    const [approvedS, setApproved] = useState(false);
    const [nazig, setNazig] = useState(false);

    // Initialize state for original and filtered data
    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (familiesObj?.data) {
            setOriginalData(familiesObj.data);
            setFilteredData(familiesObj.data); // Initialize filtered data
        }
    }, [familiesObj]);

    useEffect(() => {
        let data = [...originalData];

        // Apply search filter
        if (q) {
            data = data.filter(family =>
                (family.name?.toLowerCase() || '').includes(q.toLowerCase()) ||
                (family.parent1?.first_name?.toLowerCase() || '').includes(q.toLowerCase()) ||
                (family.parent2?.first_name?.toLowerCase() || '').includes(q.toLowerCase())
            );
        }

        // Apply additional filters
        if (nazig) {
            data = data.filter(fam => fam.employee?._id === _id);
        }

        if (waitingS) {
            data = data.filter(fam => fam.waiting);
        }

        if (approvedS) {
            data = data.filter(fam => fam.approved);
        }

        if (allS) {
            data = [...originalData]; // Reset to all families
        }

        setFilteredData(data);
    }, [originalData, q, waitingS, approvedS, nazig, _id, allS]);

    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <h1>{JSON.stringify(error)}</h1>;

    return (
        <div className="families-list">
            <div className="families-list-top">
                <Search placeholder="חיפוש לפי שם משפחה" />
                <button onClick={() => { setWaiting(true); setApproved(false); setNazig(false); setAll(false); }}>הצג רק משפחות ממתינות לטיפול</button>
                {role === 'נציג' && <button onClick={() => { setNazig(true); setWaiting(false); setApproved(false); setAll(false); }}>הצג רק משפחות שבטיפולי</button>}
                <button onClick={() => { setApproved(true); setWaiting(false); setNazig(false); setAll(false); }}>הצג רק משפחות מאושרות</button>
                <button onClick={() => { setAll(true); setWaiting(false); setNazig(false); setApproved(false); }}>הצג את כל המשפחות</button>

                <Link to="/dash/families/add" className="families-list-add-button"><FaCirclePlus size={30} /></Link>
            </div>
            <div className="families-cards">
                {filteredData?.map(family => (
                    <div key={family._id} className="family-card">
                        <div className="family-card-header">
                            <div className="family-name">{family.name} {family.parent1?.first_name} {family.parent2 ? "ו": ""}{family.parent2?.first_name}</div>
                        </div>
                        <div className="family-card-body">
                            <p>מספר ילדים - {family.child?.length}</p>
                            {family.employee && role === 'מנהל' && <p>נציג - {family.employee?.name}</p>}
                        </div>
                        <div className="family-card-actions">
                            <div className={`toggle-button ${family.waiting ? 'on' : 'off'} family-card-button`} onClick={() => { updateFamily({ ...family, id: family._id, waiting: !family.waiting }) }}>
                                <div className="toggle-circle">{family.waiting ? <MdCheckCircle size={20} /> : <MdCancel size={20} />}</div>
                            </div>
                            <div className={`toggle-button ${family.approved ? 'on' : 'off'} family-card-button`} onClick={() => { updateFamily({ ...family, id: family._id, approved: !family.approved }) }}>
                                <div className="toggle-circle">{family.approved ? <MdCheckCircle size={20} /> : <MdCancel size={20} />}</div>
                            </div>
                            {family.tzFile ? (
                                <a href={getFilePath(family.tzFile)} target="_blank" rel="noopener noreferrer" className="family-card-button"><LuFileText size={20} /></a>
                            ) : (
                                <LuFileX2 size={20} color="var(--textSoft" />
                            )}
                            <Link to={`/dash/families/${family._id}`} className="family-card-button"><FaRegPenToSquare size={20} /></Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FamiliesList;
