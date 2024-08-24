import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';

const FieldEditor = ({ field, setEditingField }) => {
    const { editField } = useContext(GlobalContext);
    const [label, setLabel] = useState(field.label || '');
    const [required, setRequired] = useState(field.required || false);
    const [errorMessage, setErrorMessage] = useState(field.errorMessage || '');
    const [options, setOptions] = useState(field.options || ['Option 1', 'Option 2', 'Option 3']);

    const handleSave = () => {
        console.log('Saving field:', { label, required, errorMessage, options });
        editField(field.id, { label, required, errorMessage, options });
        setEditingField(null);
    };


    const handleOptionChange = (index, newOption) => {
        const updatedOptions = [...options];
        updatedOptions[index] = newOption;
        setOptions(updatedOptions);
    };

    return (
        <div>
            <h3>Edit Field</h3>
            <div>
                <label>Label:</label>
                <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                />
            </div>
            <div>
                <label>Required:</label>
                <input
                    type="checkbox"
                    checked={required}
                    onChange={(e) => setRequired(e.target.checked)}
                />
            </div>
            {required && (
                <div>
                    <label>Error Message:</label>
                    <input
                        type="text"
                        value={errorMessage}
                        onChange={(e) => setErrorMessage(e.target.value)}
                        placeholder="Enter error message for required field"
                    />
                </div>
            )}
            {field.type === 'Radio' || field.type === 'Categories' ? (
                <div>
                    <label>Options:</label>
                    {options.map((option, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            ) : null}
            <div>
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setEditingField(null)}>Cancel</button>
            </div>
        </div>
    );
};

export default FieldEditor;
