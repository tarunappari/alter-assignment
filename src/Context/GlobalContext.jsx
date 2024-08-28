import React, { createContext, useState, useEffect } from 'react';
import { db } from '../Firebase';
import { doc, setDoc, addDoc, getDoc, updateDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [formFields, setFormFields] = useState([]);
  const [formName, setFormName] = useState('Untitled Form');
  const [popupMessage, setPopupMessage] = useState('');
  const [logicConditions, setLogicConditions] = useState({ url: '', date: '', time: '' });
  const [published, setPublished] = useState(false); // To track publish status

  //adding fields to the form 
  const addField = (fieldType, label) => {
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


  //removing field on delete
  const removeField = (id) => {
    setFormFields(prevFields => prevFields.filter(field => field.id !== id));
  };


  //updating the firld
  const editField = (id, updatedField) => {
    console.log('Updating field with id:', id, 'with data:', updatedField);
    setFormFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, ...updatedField } : field
      )
    );
  };

  // we are saving the form without publishing it
  const saveForm = async (formId = null) => {
    if (formFields.length === 0) {
      showToastMessage('At least add one input field', 'warning');
      return false;
    }

    if (!logicConditions.url && !logicConditions.date && !logicConditions.time) {
      showToastMessage('Please apply at least one logic condition', 'warning');
      return false;
    }

    try {
      const formDoc = {
        formName,
        formFields,
        logicConditions,
      };

      if (formId) {
        // Update existing form
        const formRef = doc(db, 'forms', formId);
        const formSnap = await getDoc(formRef);

        if (formSnap.exists()) {
          // Merge existing fields with new data
          const existingData = formSnap.data();
          const updatedData = {
            ...existingData,
            ...formDoc, // Merge new data into existing data
          };

          await setDoc(formRef, updatedData); 
        } else {
          showToastMessage('Form does not exist', 'warning');
          return false;
        }
      } else {
        // Add new form
        await addDoc(collection(db, 'forms'), {
          ...formDoc,
          published: false,
          views: 0,
          submissions: 0,
        });
      }

      setFormFields([])
      setFormName('Untitled Form')
      setLogicConditions({ url: '', date: '', time: '' })
      showToastMessage('Form saved successfully', 'success');
      return true;
    } catch (error) {
      showToastMessage(`Error saving form: ${error.message}`, 'error');
    }
  };

  //publishing the form
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
        views: 0, 
        submissions: 0, 
        publishedDate: new Date(), 
      };

      await addDoc(collection(db, 'forms'), formDoc);
      setPublished(true); 
      showToastMessage('Form published successfully', 'success')
      return true;
    } catch (error) {
      showToastMessage(`Error publishing form ${error.message}`, 'error')
    }
  
  };




  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(''), 3000);
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
