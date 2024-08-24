import React, { useContext } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';

const AddFields = () => {
  const { addField } = useContext(GlobalContext);

  return (
    <div>
      <h3>Add Fields</h3>
      <button onClick={() => addField('TextArea')}>Text Area +</button>
      <button onClick={() => addField('NumericRating')}>Numeric Rating +</button>
      <button onClick={() => addField('StarRating')}>Star Rating +</button>
      <button onClick={() => addField('SmileyRating')}>Smiley Rating +</button>
      <button onClick={() => addField('SingleLineInput')}>Single Line Input +</button>
      <button onClick={() => addField('Radio')}>Radio +</button>
      <button onClick={() => addField('Categories')}>Categories +</button>
    </div>
  );
};

export default AddFields;

