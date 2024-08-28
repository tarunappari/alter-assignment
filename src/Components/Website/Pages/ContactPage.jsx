import React, { useEffect, useState } from 'react';
import FeedbackForm from '../Components/FeedbackForm';
import { useFormLogic } from '../../useFormLogic';
import styled from 'styled-components';
import ContactContent from '../Components/ContactContent';

const ContactPage = () => {
  let { formToRender, handleSubmit, handleFormClose } = useFormLogic();
  

  if (
    (formToRender && localStorage.getItem(`formSubmitted_${formToRender?.id}`)) ||
    (formToRender && localStorage.getItem(`formClosed_${formToRender?.id}`))
  ) {
    return <div><ContactContent /></div>;
  }

  return (
    <ContactPageContainer>
      <ContactContent />
      { formToRender && (
        <div className="form-container">
          <FeedbackForm form={formToRender} onSubmit={handleSubmit} onClose={handleFormClose} />
        </div>
      ) }
    </ContactPageContainer>
  );
};

export default ContactPage;

let ContactPageContainer = styled.div`
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
