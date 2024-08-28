import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoIosCloseCircleOutline } from "react-icons/io";

const FeedbackForm = ({ form, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(
    () =>
      JSON.parse(localStorage.getItem(`formData_${form.id}`)) ||
      form.formFields.map(field => ({ id: field.id, label: field.label, content: field.content || '' }))
  );
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Save form data to localStorage whenever it changes
    localStorage.setItem(`formData_${form.id}`, JSON.stringify(formData));
  }, [formData, form.id]);

  const handleChange = (id, value) => {
    setFormData(prevData =>
      prevData.map(field => (field.id === id ? { ...field, content: value } : field))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = {};
    

    form.formFields.forEach(field => {
      const fieldData = formData.find(f => f.id === field.id);

      // Check if the field is required and empty
      if (field.required && !fieldData.content) {
        valid = false;
        newErrors[field.id] = field.errorMessage || 'This field is required';
      }
    });

    setErrors(newErrors);

    // If the form is valid, submit the data
    if (valid) {
      setIsLoading(true); // Start loading
      try {
        
        await onSubmit(formData); // This will include both id, label, and content
        setFormData(form.formFields.map(field => ({ id: field.id, label: field.label, content: '' }))); // Clear form
        localStorage.removeItem(`formData_${form.id}`); // Clear localStorage data for this form
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    } else {
      console.log('Form contains errors');
    }
  };

  const renderField = (field) => {
    const fieldData = formData.find(f => f.id === field.id);

    if (!fieldData) return null; // Ensure fieldData exists

    switch (field.type) {
      case 'TextArea':
        return (
          <div className='field-container' key={field.id}>
            <label>{field.label}</label>
            <textarea
              rows="4"
              value={fieldData.content}
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
            {errors[field.id] && <span style={{ color: 'red' }}>{errors[field.id]}</span>}
          </div>
        );
      case 'NumericRating':
        return (
          <div className='field-container' key={field.id}>
            <label>{field.label}</label>
            <div style={{ display: 'flex' }}>
              {[...Array(10).keys()].map(num => (
                <div
                  key={num + 1}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.4rem 0.9rem',
                    border: '1px solid #ccc',
                    cursor: 'pointer',
                    backgroundColor: fieldData.content === num + 1 ? '#575757' : '#f3f3f3',
                    color: fieldData.content === num + 1 ? '#fff' : '#000'
                  }}
                  onClick={() => handleChange(field.id, num + 1)}
                >
                  {num + 1}
                </div>
              ))}
            </div>
            {errors[field.id] && <span style={{ color: 'red' }}>{errors[field.id]}</span>}
          </div>
        );
      case 'StarRating':
        return (
          <div className='field-container' key={field.id}>
            <label>{field.label}</label>
            <div style={{ display: 'flex', gap: '5px' }}>
              {[...Array(5).keys()].map(num => (
                <span
                  key={num + 1}
                  style={{
                    fontSize: '29px',
                    cursor: 'pointer',
                    fontWeight: '900',
                    paddingLeft: '0.7rem',
                    color: fieldData.content >= num + 1 ? '#ffd700' : '#ccc'
                  }}
                  onClick={() => handleChange(field.id, num + 1)}
                >
                  ★
                </span>
              ))}
            </div>
            {errors[field.id] && <span style={{ color: 'red' }}>{errors[field.id]}</span>}
          </div>
        );
      case 'SmileyRating':
        return (
          <div className='field-container' key={field.id}>
            <label>{field.label}</label>
            <div style={{ display: 'flex', gap: '9px', paddingLeft: '0.7rem' }}>
              {['😞', '🙁', '😐', '🙂', '😊'].map((smiley, index) => (
                <span
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    cursor: 'pointer',
                    backgroundColor: fieldData.content === index + 1 ? '#ffeb3b' : '#fff',
                  }}
                  onClick={() => handleChange(field.id, index + 1)}
                >
                  {smiley}
                </span>
              ))}
            </div>
            {errors[field.id] && <span style={{ color: 'red' }}>{errors[field.id]}</span>}
          </div>
        );
      case 'SingleLineInput':
        return (
          <div className='field-container' key={field.id}>
            <label>{field.label}</label>
            <input
              type="text"
              value={fieldData.content}
              style={{
                borderBottom:'0.1rem solid #c7c7c7'
              }}
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
            {errors[field.id] && <span style={{ color: 'red' }}>{errors[field.id]}</span>}
          </div>
        );
      case 'Radio':
        return (
          <div className='field-container' key={field.id}>
            <label>{field.label}</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', }}>
              {field.options && field.options.map((option, index) => (
                <div key={index} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="radio"
                    name={field.id}
                    value={option}
                    checked={fieldData.content && fieldData.content === option}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>

            {errors[field.id] && <span style={{ color: 'red' }}>{errors[field.id]}</span>}
          </div>
        );
      case 'Categories':
        return (
          <div className='field-container' key={field.id}>
            <label>{field.label}</label>
            <select
              style={{ padding: '0.5rem', backgroundColor: 'transparent', borderRadius: '0.3rem' }}
              value={fieldData.content}
              onChange={(e) => handleChange(field.id, e.target.value)}
            >
              {field.options && field.options.map((option, index) => (
                <option style={{ padding: '0.5rem' }} key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors[field.id] && <span style={{ color: 'red' }}>{errors[field.id]}</span>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <FeedbackFormContainer onSubmit={handleSubmit}>
      <div className='feedback-form-title'>
      <h2>{form.formName}</h2>
      </div>
      <div className="field-mainContainer">
        {form.formFields.map((field) => renderField(field))}
      </div>
      <div className="btns-container">
        <button className="submit-btn blue" type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
        <button className="close-btn" type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </FeedbackFormContainer>
  );
};

export default FeedbackForm;



let FeedbackFormContainer = styled.form`
      display: flex;
      background-color: white;
      flex-direction: column;
      gap: 1rem;
      justify-content: space-between;
      padding: 2rem;
      border-radius: 0.4rem;
      min-height: 60vh;
      box-shadow: 1px 1px 2px 1px #c4c2c2;
      max-height: 80vh;
      max-width:50% !important;
      overflow-y: scroll;
      overflow-x: hidden;
      position: relative;
      .field-container{
            display: flex;
            flex-direction: column;
            padding: 0.8rem;
            box-shadow: 1px 1px 2px 1px #c4c2c2;
            border-radius: 0.3rem;
            gap: 0.5rem;
            margin-top: 1rem;
            .field-container{
                display: flex;
                flex-direction: column;
                gap: 0.9rem;
                label{
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: #494949;
                }
            }
            .field-edit-del-btns-container{
                    align-self: flex-end;
            }
                
        }
        .feedback-form-title{
            min-width: 125%;
            max-height: 3rem;
            padding: 1rem;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            top: -2rem;
            left: -2rem;
            border-top-right-radius: 0.5rem;
            border-top-left-radius: 0.5rem;
            background-color: #5578f4;
        h2{
          font-size: 1rem;
          color: #fff;
          font-weight: 600;
        }
      }
      .btns-container{
        display: flex;
        gap: 0.5rem;
        button{
            font-size: 0.9rem;
            padding: 0.5rem 1.3rem;
        }
    }
`

let Close = styled(IoIosCloseCircleOutline)`
  color: white !important;
  background-color: white !important;
  border-radius: 50%;
  transform: scale(3);
`
