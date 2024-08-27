import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../../../Context/GlobalContext';
import Lottie from 'react-lottie';
import addAnimation from '../../../../assets/lottie/addForm.json'
import styled from 'styled-components';

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

export default function OpenModal({ title }) {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: addAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  let { setLogicConditions,setFormFields,setFormName, formName } = React.useContext(GlobalContext);

  let [inputValue, setInputValue] = React.useState(formName)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreate = () => {
    setFormName(inputValue);
    setFormFields([])
    setLogicConditions({ url: '', date: '', time: '' })
    navigate('/admin/create-form'); // Navigate to the form builder page
    handleClose()
  };

  let navigate = useNavigate()

  return (
    <ModalContainer>
      <button className='newform-button' onClick={handleOpen}>
        <Lottie
          options={defaultOptions}
          style={{
            height:'12rem',
            width:'12rem'
          }}
        />
        <h2>{title}</h2>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='modal-box' style={{padding:'1rem',display:'flex',flexDirection:'column',justifyContent:'space-between',gap:'1.5rem'}}>
            <div id="modal-modal-title" style={{fontWeight:'600',fontSize:'1.5rem'}}>
              Create Feedback Form
            </div>
            <div className="input-field">
            <input
              type="text"
              value={inputValue}
              className='input'
              onChange={(e) => setInputValue(e.target.value)} // Update local state with input value
            />
            </div>
            <div className='modal-btn-container'>
              <button className='modal-button green-btn' onClick={handleCreate}>CREATE</button>
              <button className='modal-button grey-btn' onClick={handleClose}>CANCEL</button>
            </div>
          </div>
        </Box>
      </Modal>
    </ModalContainer>
  );
}


let ModalContainer = styled.div`
  .newform-button{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 1px 1px 2px 1px #c4c2c2;
    h2{
      font-weight: 700;
    }
  }
`