import React, { createContext, useState, useEffect } from 'react';
import { db } from '../Firebase';
import { collection, addDoc, setDoc, doc, updateDoc } from 'firebase/firestore';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [formFields, setFormFields] = useState([]);
  const [formName, setFormName] = useState('Untitled Form');
  const [popupMessage, setPopupMessage] = useState('');
  const [logicConditions, setLogicConditions] = useState({ url: '', date: '', time: '' });
  const [published, setPublished] = useState(false); // To track publish status


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

  const saveForm = async () => {
    if (!logicConditions.url && !logicConditions.date && !logicConditions.time) {
      showPopup("Please apply at least one logic condition before saving.");
      return;
    }

    try {
      const formDoc = {
        formName,
        formFields,
        logicConditions,
      };

      console.log('Saving form:', { formName, formFields, logicConditions });
      await addDoc(collection(db, 'forms'), formDoc);


      // Replace with appropriate Firestore collection path
      await addDoc(collection(db, 'forms'), formDoc);
      showPopup("Form saved successfully.");
    } catch (error) {
      showPopup("Error saving form: " + error.message);
    }
  };

  const publishForm = async () => {
    if (!logicConditions.url && !logicConditions.date && !logicConditions.time) {
      showPopup("Please apply at least one logic condition before publishing.");
      return;
    }
  
    try {
      const formDoc = {
        formName,
        formFields,
        logicConditions,
        published: true,
        views: 0, // Initialize view count
        submissions: 0 // Initialize submissions count
      };
  
      await addDoc(collection(db, 'forms'), formDoc);
      setPublished(true); // Update publish status
      showPopup("Form published successfully.");
    } catch (error) {
      showPopup("Error publishing form: " + error.message);
    }
  };


  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(''), 3000); // Automatically hide popup after 3 seconds
  };

  return (
    <GlobalContext.Provider value={{
      setFormFields,
      formFields,
      addField,
      removeField,
      editField,
      formName,
      setFormName,
      popupMessage,
      showPopup,
      logicConditions,
      setLogicConditions,
      saveForm,
      publishForm,
      published
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
