import React, { useState, useEffect } from 'react';

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

    switch (field.type) {
      case 'TextArea':
        return (
          <div key={field.id}>
            <label>{field.label}</label>
            <textarea
              value={fieldData.content}
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
            {errors[field.id] && <span style={{ color: 'red' }}>{errors[field.id]}</span>}
          </div>
        );
      case 'NumericRating':
        return (
          <div key={field.id}>
            <label>{field.label}</label>
            <input
              type="number"
              value={fieldData.content}
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
            {errors[field.id] && <span style={{ color: 'red' }}>{errors[field.id]}</span>}
          </div>
        );
      case 'StarRating':
        return (
          <div key={field.id}>
            <label>{field.label}</label>
            <input
              type="number"
              max={5}
              min={1}
              value={fieldData.content}
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
            {errors[field.id] && <span style={{ color: 'red' }}>{errors[field.id]}</span>}
          </div>
        );
      case 'SmileyRating':
        return (
          <div key={field.id}>
            <label>{field.label}</label>
            <input
              type="number"
              max={5}
              min={1}
              value={fieldData.content}
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
            {errors[field.id] && <span style={{ color: 'red' }}>{errors[field.id]}</span>}
          </div>
        );
      case 'SingleLineInput':
        return (
          <div key={field.id}>
            <label>{field.label}</label>
            <input
              type="text"
              value={fieldData.content}
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
            {errors[field.id] && <span style={{ color: 'red' }}>{errors[field.id]}</span>}
          </div>
        );
      case 'Radio':
        return (
          <div key={field.id}>
            <label>{field.label}</label>
            {field.options.map((option, index) => (
              <div key={index}>
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
            {errors[field.id] && <span style={{ color: 'red' }}>{errors[field.id]}</span>}
          </div>
        );
      case 'Categories':
        return (
          <div key={field.id}>
            <label>{field.label}</label>
            <select
              value={fieldData.content}
              onChange={(e) => handleChange(field.id, e.target.value)}
            >
              {field.options.map((option, index) => (
                <option key={index} value={option}>
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
    <form onSubmit={handleSubmit}>
      <h2>{form.formName}</h2>
      {form.formFields.map((field) => renderField(field))}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
      <button type="button" onClick={onClose} disabled={isLoading}>
        Close
      </button>
    </form>
  );
};

export default FeedbackForm;
