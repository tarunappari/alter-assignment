import React, { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [formFields, setFormFields] = useState([]);
  const [formName, setFormName] = useState('Untitled Form');
  const [popupMessage, setPopupMessage] = useState('');
  

  // useEffect(() => {
  //   const savedFields = JSON.parse(localStorage.getItem('formFields')) || [];
  //   const savedFormName = localStorage.getItem('formName') || 'Untitled Form';

  //   console.log('Loaded fields from localStorage:', savedFields);
  //   console.log('Loaded form name from localStorage:', savedFormName);

  //   setFormFields(savedFields);
  //   setFormName(savedFormName);
  // }, []);


  // // Save form data to localStorage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem('formFields', JSON.stringify(formFields));
  //   localStorage.setItem('formName', formName);
  //   console.log('Saved fields to localStorage:', formFields);
  //   console.log('Saved form name to localStorage:', formName);

  // }, [formFields, formName]);

  const addField = (fieldType) => {
    if (formFields.length >= 7) {
      showPopup("You cannot add more than 7 fields.");
      return;
    }
    
    const newField = { 
        id: Date.now(), 
        type: fieldType, 
        label: fieldType, 
        content: '', 
        required: false, 
        errorMessage: '', 
        options: fieldType === 'Radio' || fieldType === 'Categories' 
            ? ['Option 1', 'Option 2', 'Option 3'] 
            : [] 
    };

    setFormFields(prevFields => [...prevFields, newField]);
};


  const removeField = (id) => {
    setFormFields(prevFields => prevFields.filter(field => field.id !== id));
  };


  const editField = (id, updatedField) => {
    console.log('Updating field with id:', id, 'with data:', updatedField);
    setFormFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, ...updatedField } : field
      )
    );
  };
  

  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(''), 3000); // Automatically hide popup after 3 seconds
  };

  return (
    <GlobalContext.Provider value={{ setFormFields, formFields, addField, removeField, editField, formName, setFormName, popupMessage, showPopup }}>
      {children}
    </GlobalContext.Provider>
  );
};
