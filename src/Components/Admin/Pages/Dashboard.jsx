import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../common/Navbar';
import { collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../Firebase';
import { useNavigate } from 'react-router-dom';
import FormItems from '../Dashboard/FormItems';
import { GlobalContext } from '../../../Context/GlobalContext';

const Dashboard = () => {

    const { setFormFields, setLogicConditions, setPublished } = useContext(GlobalContext);

    const [forms, setForms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        //here we are fetching the forms froms from the firestore and setting them for Forms state
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


    //this will navigate us to that particular form details page we are making dynamic rendering with dynamic id
    const handleFormClick = (formId) => {
        navigate(`/admin/form-detail/${formId}`);
    };

    //deleting the form from the firestore
    const handleFormDelete = async (formId) => {
        try {
            const formDocRef = doc(db, 'forms', formId);
            await deleteDoc(formDocRef);

            // Remove the deleted form from the state
            setForms(forms.filter(form => form.id !== formId));
        } catch (error) {
            console.error(`Error deleting form with ID: ${formId}`, error);
        }
    };

    //editing the existing form
    const handleEditClick = async (formId) => {
        try {
            // fetching the specific form document
            const formDocRef = doc(db, 'forms', formId);
            const formSnapshot = await getDoc(formDocRef);

            if (formSnapshot.exists()) {
                const formData = formSnapshot.data();

                //here im extract form fields and logicConditions from the document
                const { formFields, logicConditions, published } = formData;


                // setting the state for formFields and logicConditions
                setFormFields(formFields || []); // Ensure it's an array
                setLogicConditions(logicConditions || { url: '', date: '', time: '' }); // Ensure it's an object
                setPublished(published || false);
                navigate(`/admin/create-form/${formId}`);
            } else {
                console.error("No such form document!");
            }
        } catch (error) {
            console.error("Error fetching form data: ", error);
        }
    };


    return (
        <DashboardContainer>
            <div className="navbar-container">
                <Navbar title={'Dashboard'} />
            </div>
            <div className="dashboard-info-container">
                <div className="form-details-container">
                    <FormItems forms={forms} handleFormClick={handleFormClick} handleFormDelete={handleFormDelete} handleEditClick={handleEditClick} />
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