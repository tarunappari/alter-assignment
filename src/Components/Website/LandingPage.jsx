import React, { useEffect, useState } from 'react';
import FeedbackForm from './FeedbackForm';
import { useFormLogic } from '../useFormLogic';
import styled from 'styled-components';

const LandingPage = () => {
  let { formToRender, handleSubmit, handleFormClose } = useFormLogic();

  console.log(formToRender);
  

  if (
    (formToRender && localStorage.getItem(`formSubmitted_${formToRender?.id}`)) ||
    (formToRender && localStorage.getItem(`formClosed_${formToRender?.id}`))
  ) {
    return <div>Landing</div>;
  }

  return (
    <LandingPageContainer>
      <h1>Landing Page</h1>
      { formToRender && (
        <div className="form-container">
          <FeedbackForm form={formToRender} onSubmit={handleSubmit} onClose={handleFormClose} />
        </div>
      ) }

    </LandingPageContainer>
  );
};

export default LandingPage;

let LandingPageContainer = styled.div`
    .form-container{
      position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(62, 61, 61, 0.5); /* Add semi-transparent background */
  backdrop-filter: blur(1px); /* Apply blur effect to the background */
  z-index: 999;
    }
`
