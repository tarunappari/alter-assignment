import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../../../Context/GlobalContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #404040',
  boxShadow: 24,
  borderRadius: '1rem',
  p: 4,
};

export default function OpenModal({title}) {

  let {setFormName,formName} =  React.useContext(GlobalContext);

  let [inputValue,setInputValue] = React.useState(formName)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreate = () => {
    setFormName(inputValue); // Update the global state with the input value
    navigate('/admin/create-form'); // Navigate to the form builder page
    handleClose()
  };

  let navigate = useNavigate()

  return (
    <div>
      <Button onClick={handleOpen}>{title}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" style={{fontWeight:'500'}} component="h2">
            Create Feedback Form
          </Typography>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} // Update local state with input value
          />
          <div>
          <button onClick={handleCreate}>Create</button>
          <button onClick={handleClose}>Cancel</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
