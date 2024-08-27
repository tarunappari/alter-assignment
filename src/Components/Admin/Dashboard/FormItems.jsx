import React from 'react'
import OpenModal from '../common/MUI/OpenModal';
import styled from 'styled-components';
import formLogoAnimation from '../../../assets/lottie/form-logo.json'
import Lottie from 'react-lottie';

const FormItems = ({ forms, handleFormClick,handleFormDelete,handleEditClick }) => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: formLogoAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }


    return (
        <FormItemContainer className='form-container'>
            <OpenModal title={'New Form'} />
            {forms.length > 0 ? (forms.map(form => (
                <div className='form-Item' key={form.id}>
                    <div className='form-item-logo'>
                        <Lottie
                            options={defaultOptions}
                            style={{
                                height: '2rem',
                                width: '2rem'
                            }}
                        />
                    </div>
                    <div className='form-item-title'>
                        <h3>{form.formName}</h3>
                    </div>
                    <div className='form-item-info-container'>
                        <div className='form-item-info'>
                            <div>
                                Submissions
                            </div>
                            <div>
                                {form.submissions}
                            </div>
                        </div>
                        <div className='form-item-info'>
                            <div>
                                Views
                            </div>
                            <div>
                                {form.views}
                            </div>
                        </div>
                        <div className='form-item-info'>
                            <div>
                                Published At
                            </div>
                            <div>
                                {form && form.publishedDate && form.publishedDate.toDate().toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                    <div className='form-item-btns-container'>
                        <div className="view-submission">
                            <button onClick={() => handleFormClick(form.id)}>VIEW SUBMISSION</button>
                        </div>
                        <div className="edit-delete-btns">
                            <div className="edit">
                                <button onClick={() => handleEditClick(form.id)}>EDIT</button>
                            </div>
                            <div className="delete">
                                <button onClick={() => handleFormDelete(form.id)}>DELETE</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))) : (<h1 style={{fontWeight:'600',paddingTop:'7rem'}}>Create Forms</h1>)}
        </FormItemContainer>
    )
}

export default FormItems;

let FormItemContainer = styled.div`
    .form-Item{
        background-color: #f0f0f0;
        border-radius: 0.5rem;
        box-shadow: 1px 1px 2px 1px #c4c2c2;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .form-item-logo{
            min-width: 116%;
            max-height: 3rem;
            padding: 1rem;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            top: -1rem;
            border-top-right-radius: 0.5rem;
            border-top-left-radius: 0.5rem;
            background-color: #f5d563;
        }
        .form-item-title{
            align-self: flex-start;
            margin-top: -1rem;
            h3{
                font-size: 1.1rem;
                font-weight: 600;
            }
        }
        .form-item-info-container{
            min-width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
        }
        .form-item-info{
            display: flex;
            justify-content: space-between;
            min-width: 100%;
            div{
                font-size: 0.75rem;
                font-weight: 600;
                color: #696868;
            }
        }
        .form-item-btns-container{
            min-width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            button{
                font-size: 0.8rem;
                padding: 0.6rem 1rem;
                color: #eaeaea;
                border-radius: 0.3rem;
            }
            .view-submission{
                display: flex;
                justify-content: center;
                align-items: center;
                button{
                    background-color: #9c27b0;
                    padding: 0.7rem 1.5rem;
                }
            }
            .edit-delete-btns{
                display: flex;
                min-width: 100%;
                justify-content: center;
                align-items: center;
                gap: 1.5rem;
                .edit{
                    button{
                        background-color: #2e7d32;
                    }
                }
                .delete{
                    button{
                        background-color: #2196f3;
                    }
                }
            }
        }
    }
`