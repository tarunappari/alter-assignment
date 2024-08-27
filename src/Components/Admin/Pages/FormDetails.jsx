import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../../Firebase';
import styled from 'styled-components';
import Navbar from '../common/Navbar';
import AccordionUsage from '../common/MUI/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FormDetails = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [submissions, setSubmissions] = useState([]);


  useEffect(() => {
    if (!formId) {
      console.error('No formId provided');
      return;
    }

    const fetchFormDetails = async () => {
      try {
        const formRef = doc(db, 'forms', formId);
        const formSnap = await getDoc(formRef);

        if (formSnap.exists()) {
          setForm(formSnap.data());

          const submissionsCollection = collection(db, `forms/${formId}/submissions`);
          const submissionSnap = await getDocs(submissionsCollection);
          setSubmissions(submissionSnap.docs.map(doc => doc.data()));
        } else {
          console.error('No such form!');
        }
      } catch (error) {
        console.error("Error fetching form details: ", error);
      }
    };


    fetchFormDetails();
  }, [formId]);

  return (
    <FormDetailsContainer>
      <Navbar title={'Form Details'} />
      {form ? (
        <div className='form-detals-container'>
          <div className='form-detail-title'>
            <h2>{form.formName}</h2>
            <h4>Created Date : {form.publishedDate.toDate().toLocaleDateString()}</h4>
          </div>
          <div className='views-subms-container'>
            <div><h1>{form.views || 0}</h1><p>Views</p></div>
            <div><h1>{form.submissions || 0}</h1><p>Submissions</p></div>
          </div>
          <div className="logicinfo-container">
            <div className="url">Page URL : {form.logicConditions.url || 'Null'}</div>
            <div className="date">Date : {form.logicConditions.date || 'Null'} </div>
            <div className="time">Time : {form.logicConditions.time || 'Null'}</div>
          </div>

          <div className='feedbacks-container'>
            <h3 className='title'>Feedbacks List :</h3>
            <div>
              {form && form.submissionsData && Object.keys(form.submissionsData).length > 0 ? (
                Object.entries(form.submissionsData).map(([timestamp, dataArray], index) => (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <div style={{
                        color:'#545454',
                        fontWeight:'600'
                      }}>FeedBack {index + 1}</div>
                      <div style={{
                        position: 'relative',
                        left: '59rem',
                        color:'grey',
                        fontSize:'0.8rem',
                        fontWeight:'600'
                      }}>{new Date(parseInt(timestamp)).toLocaleDateString()}</div>
                    </AccordionSummary>
                    <AccordionDetails>
                      {dataArray.map((item, itemIndex) => (
                        <div className='field-container'>
                          <div className='label'>{item.label}</div>
                          <div className='content'>{item.content}</div>
                        </div>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : (
                <h2 className='no-submissions'>No submissions yet</h2>
              )}

            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </FormDetailsContainer>
  );
};

export default FormDetails;


let FormDetailsContainer = styled.div`
    .form-detals-container{
      padding: 2rem;
      min-height: 85vh;
      border-radius: 0.4rem;
      margin: 1rem;
      box-shadow: 1px 1px 2px 1px #c4c2c2;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      .form-detail-title{
            min-width: 105.5%;
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
          font-size: 1.3rem;
          color: #fff;
          font-weight: 600;
        }
        h4{
          font-size: 0.8rem;
          color: #fff;
          font-weight: 600;
        }
      }
      .views-subms-container{
      display: flex;
      gap: 4rem;
      margin-top: -1rem;
      padding-left: 3rem;
      div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h1{
          font-weight: 600;
          font-size: 2.5rem;
        }
        p{
          color: grey;
          font-weight: 600;
          font-size: 0.9rem;
        }
      }
    }
      .logicinfo-container{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        div{
          font-size: 0.85rem;
          font-weight: 600;
        }
      }
      .feedbacks-container{
        .title{
          font-weight: 700;
          font-size: 1.5rem;
          padding-bottom: 0.9rem;
        }
      }
      .field-container{
        padding: 0.7rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        .label{
          font-size: 1rem;
          font-weight: 500;
        }
        .content{
          color: grey;
          font-size: 0.9rem;
        }
      }
    }

`