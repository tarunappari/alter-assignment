import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';
import styled from 'styled-components';

const FormDisplay = ({ setEditingField }) => {
    const { formFields, setFormFields, removeField, formName, setFormName } = useContext(GlobalContext);
    const [isEditingName, setIsEditingName] = useState(false);

    console.log(formFields);


    const handleBlockClick = (field, value) => {
        const updatedFields = formFields.map(f =>
            f.id === field.id ? { ...f, value: value } : f
        );
        setFormFields(updatedFields);
    };

    const renderField = (field) => {
        switch (field.type) {
            case 'TextArea':
                return (
                    <div>
                        <label>{field.label}</label>
                        <textarea
                            value={field.value || ''}
                            onChange={(e) => handleBlockClick(field, e.target.value)}
                        />
                    </div>
                );
            case 'NumericRating':
                return (
                    <div>
                        <label>{field.label}</label>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            {[...Array(10).keys()].map(num => (
                                <div
                                    key={num + 1}
                                    style={{
                                        width: '30px',
                                        height: '30px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid #ccc',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        backgroundColor: field.value === num + 1 ? '#007bff' : '#fff',
                                        color: field.value === num + 1 ? '#fff' : '#000'
                                    }}
                                    onClick={() => handleBlockClick(field, num + 1)}
                                >
                                    {num + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'StarRating':
                return (
                    <div>
                        <label>{field.label}</label>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            {[...Array(5).keys()].map(num => (
                                <span
                                    key={num + 1}
                                    style={{
                                        fontSize: '24px',
                                        cursor: 'pointer',
                                        color: field.value >= num + 1 ? '#ffd700' : '#ccc'
                                    }}
                                    onClick={() => handleBlockClick(field, num + 1)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>
                );
            case 'SmileyRating':
                return (
                    <div>
                        <label>{field.label}</label>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            {['😊', '🙂', '😐', '🙁', '😞'].map((smiley, index) => (
                                <span
                                    key={index}
                                    style={{
                                        fontSize: '24px',
                                        cursor: 'pointer',
                                        backgroundColor: field.value === index + 1 ? '#ffeb3b' : '#fff',
                                    }}
                                    onClick={() => handleBlockClick(field, index + 1)}
                                >
                                    {smiley}
                                </span>
                            ))}
                        </div>
                    </div>
                );
            case 'SingleLineInput':
                return (
                    <div>
                        <label>{field.label}</label>
                        <input
                            type="text"
                            value={field.value || ''}
                            onChange={(e) => handleBlockClick(field, e.target.value)}
                        />
                    </div>
                );
            case 'Radio':
                return (
                    <div>
                        <label>{field.label}</label>
                        <div>
                            {field.options.map((option, index) => (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        name={field.id}
                                        value={option}
                                        checked={field.value === option}
                                        onChange={() => handleBlockClick(field, option)}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>
                );
            case 'Categories':
                return (
                    <div>
                        <label>{field.label}</label>
                        <select
                            value={field.value || ''}
                            onChange={(e) => handleBlockClick(field, e.target.value)}
                        >
                            {field.options.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <FormDisplayContainer>
            {isEditingName ? (
                <div>
                    <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                    />
                    <button onClick={() => setIsEditingName(false)}>Save</button>
                    <button onClick={() => setIsEditingName(false)}>Cancel</button>
                </div>
            ) : (
                <h2>{formName} <button onClick={() => setIsEditingName(true)}>✏️</button></h2>
            )}

            {formFields.length > 0 ? (
                formFields.map((field) => (
                    <div key={field.id}>
                        {renderField(field)}
                        <button onClick={() => removeField(field.id)}>Delete</button>
                        <button onClick={() => setEditingField(field)}>Edit</button>
                    </div>
                ))
            ) : (
                <p>No fields added yet</p>
            )}
        </FormDisplayContainer>
    );
};

export default FormDisplay;

let FormDisplayContainer = styled.div`
    border: 1px solid red;
`
