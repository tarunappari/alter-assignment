import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Navbar from '../common/Navbar';
import OpenModal from '../common/MUI/OpenModal';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../Firebase';
import { useNavigate } from 'react-router-dom';

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
                <div className="create-formbtn-container">
                    <OpenModal title={'create form'} />
                </div>
                <div className='form-details-container'>
                    {forms.length > 0 ?( forms.map(form => (
                        <div className='form-container' key={form.id} onClick={() => handleFormClick(form.id)}>
                            {form.formName}
                        </div>
                    )) ):( <h1>empty</h1> )}
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
        border: 1px solid red;
        display: flex;
        padding: 3rem;
        gap: 1rem;
        .create-formbtn-container,.form-details-container{
            padding: 1rem;
            border: 1px solid blue;

        }

        .form-details-container{
            .form-container{
                padding: 2rem;
                border: 2px solid green;
            }
        }
    }
`