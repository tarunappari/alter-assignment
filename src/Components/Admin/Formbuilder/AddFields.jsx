import React, { useContext } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';
import styled from 'styled-components';
import { BsTextareaResize } from "react-icons/bs";
import { FaSortNumericDown } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaSmileWink } from "react-icons/fa";
import { RiInputField } from "react-icons/ri";
import { BsUiRadios } from "react-icons/bs";
import { TbCategoryFilled } from "react-icons/tb";
import plusAnimation from '../../../assets/lottie/plus.json'
import Lottie from 'react-lottie';

const AddFields = () => {
  const { addField } = useContext(GlobalContext);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: plusAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  return (
    <AddFieldContainer>
      <h3 className='title'> Add Fields</h3>
      <div className="addfields-btns-container">
        <button onClick={() => addField('TextArea')}> <div><BsTextareaResize style={{marginRight:'0.4rem'}}/> Text Area</div><div><Lottie options={defaultOptions} style={{height:'2rem',width:'2rem'}}/></div> </button>
        <button onClick={() => addField('NumericRating')}><div><FaSortNumericDown  style={{marginRight:'0.4rem'}}/>Numeric Rating</div> <div><Lottie options={defaultOptions} style={{height:'2rem',width:'2rem'}}/> </div></button>
        <button onClick={() => addField('StarRating')}><div><FaStarHalfAlt style={{marginRight:'0.4rem'}} />Star Rating</div> <div><Lottie options={defaultOptions} style={{height:'2rem',width:'2rem'}}/></div> </button>
        <button onClick={() => addField('SmileyRating')}><div><FaSmileWink style={{marginRight:'0.4rem'}}/>Smiley Rating</div> <div><Lottie options={defaultOptions} style={{height:'2rem',width:'2rem'}}/></div> </button>
        <button onClick={() => addField('SingleLineInput')}><div><RiInputField  style={{marginRight:'0.4rem'}}/>Single Line Input</div> <div><Lottie options={defaultOptions} style={{height:'2rem',width:'2rem'}}/></div> </button>
        <button onClick={() => addField('Radio')}><div><BsUiRadios  style={{marginRight:'0.4rem'}}/>Radio</div> <div><Lottie options={defaultOptions} style={{height:'2rem',width:'2rem'}}/></div> </button>
        <button onClick={() => addField('Categories')}><div><TbCategoryFilled  style={{marginRight:'0.4rem'}}/>Categories</div><div> <Lottie options={defaultOptions} style={{height:'2rem',width:'2rem'}}/> </div></button>
      </div>
    </AddFieldContainer>
  );
};

export default AddFields;

let AddFieldContainer = styled.div`
    background-color: #fff;
    min-height: 88vh;
    position: relative;
    top: 0.3rem;
    padding: 2.5rem;
    border-radius: 0.8rem;
    border: 0.1rem solid #d2d2d2;
    margin-right: 0.2rem;
    .title{
      font-weight: 600;
      padding-bottom: 0.5rem;
    }
    .addfields-btns-container{
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      button{
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 0.01rem solid grey;
        border-radius: 0.3rem;
        background-color: transparent;
        padding: 0.3rem 1rem;
        div{
          display: flex;
        }
      }
    }
`

