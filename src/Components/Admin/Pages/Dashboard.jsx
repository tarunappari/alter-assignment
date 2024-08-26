import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Navbar from '../common/Navbar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../Firebase';
import { useNavigate } from 'react-router-dom';
import FormItems from '../Dashboard/FormItems';


const Dashboard = () => {

    const [forms, setForms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const formsRef = collection(db, 'forms');
                const formsSnapshot = await getDocs(formsRef);
                const formsList = formsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setForms(formsList);
            } catch (error) {
                console.error("Error fetching forms: ", error);
            }
        };

        fetchForms();
    }, []);

    const handleFormClick = (formId) => {
        navigate(`/admin/form-detail/${formId}`);
    };


    return (
        <DashboardContainer>
            <div className="navbar-container">
                <Navbar title={'Dashboard'} />
            </div>
            <div className="dashboard-info-container">
                <div className="form-details-container">
                    <FormItems forms={forms} handleFormClick={handleFormClick} />
                </div>
            </div>
        </DashboardContainer>
    )
}

export default Dashboard;

let DashboardContainer = styled.div`
    background-color: #f3f3f3;
    min-height: 100vh;
    .dashboard-info-container{
        padding: 3rem;

        .form-details-container{
            .form-container{
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            justify-content: space-between;
            min-width: 100%;
            gap: 2rem;
                .form-Item{
                    width: 15rem;
                    height: 18rem;
                }
            }
        }
    }
`