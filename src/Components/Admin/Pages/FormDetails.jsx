import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../../Firebase';

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
        console.log('Fetching form with ID:', formId); // Check formId value
        const formRef = doc(db, 'forms', formId);
        const formSnap = await getDoc(formRef);
    
        if (formSnap.exists()) {
          console.log('Form data:', formSnap.data());
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
    <div>
      {form ? (
        <>
          <h2>{form.formName}</h2>
          <p>Views: {form.views || 0}</p>
          <p>Submissions: {form.submissions || 0}</p>

          <h3>Feedback:</h3>
          <ul>
            {submissions.length > 0 ? (
              submissions.map((submission, index) => (
                <li key={index}>
                  {JSON.stringify(submission)} {/* Adjust to display submission data */}
                </li>
              ))
            ) : (
              <h1>No submissions yet</h1>
            )}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FormDetails;
