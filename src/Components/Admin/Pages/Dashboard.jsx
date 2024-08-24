import React from 'react'
import styled from 'styled-components';
import Navbar from '../common/Navbar';
import OpenModal from '../common/MUI/OpenModal';

const Dashboard = () => {
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
                    previous forms
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
    }
`