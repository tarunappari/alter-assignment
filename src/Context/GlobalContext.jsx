import React, { createContext, useState, useEffect } from 'react';
import { db } from '../Firebase';
import { collection, addDoc, setDoc, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [formFields, setFormFields] = useState([]);
  const [formName, setFormName] = useState('Untitled Form');
  const [popupMessage, setPopupMessage] = useState('');
  const [logicConditions, setLogicConditions] = useState({ url: '', date: '', time: '' });
  const [published, setPublished] = useState(false); // To track publish status

  const addField = (fieldType,label) => {
    if (formFields.length >= 7) {
      showToastMessage('You cannot add more than 7 fields', 'warning')
      return;
    }

    const newField = {
      id: Date.now(),
      type: fieldType,
      label: label,
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
    if (formFields.length == 0) {
      showToastMessage('Atleast add one input field', 'warning')
      return false;
    }
    if (!logicConditions.url && !logicConditions.date && !logicConditions.time) {
      showToastMessage('Please apply at least one logic condition', 'warning')
      return false;
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
      showToastMessage('Form saved successfully', 'success')
      return true;
    } catch (error) {
      showToastMessage(`Error saving form: ${error.message}`, 'error')
    }

  };

  const publishForm = async () => {
    if (formFields.length == 0) {
      showToastMessage('Atleast add one input field', 'warning')
      return false;
    }
    
    if (!logicConditions.url && !logicConditions.date && !logicConditions.time) {
      showToastMessage('Please apply at least one logic condition', 'warning')
      return false;
    }

    try {
      const formDoc = {
        formName,
        formFields,
        logicConditions,
        published: true,
        views: 0, // Initialize view count
        submissions: 0, // Initialize submissions count
        publishedDate: new Date(), // Add the published date
      };

      await addDoc(collection(db, 'forms'), formDoc);
      setPublished(true); // Update publish status
      showToastMessage('Form published successfully', 'success')
      return true;
    } catch (error) {
      showToastMessage(`Error publishing form ${error.message}`, 'error')
    }
  
  };



  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(''), 3000); // Automatically hide popup after 3 seconds
  };

  const showToastMessage = (message, type) => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    } else if (type === 'info') {
      toast.info(message);
    } else if (type === 'warning') {
      toast.warning(message);
    }
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
      published,
      showToastMessage,
      setPublished
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
