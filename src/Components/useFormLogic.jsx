import { useEffect, useState } from 'react';
import { getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import { formsCollection } from '../Firebase'; // Adjust the path based on your file structure

export const useFormLogic = () => {
  const [formToRender, setFormToRender] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  // Function to fetch forms and check logic conditions
  const checkLogicConditions = async (currentUrl) => {
    try {
      const querySnapshot = await getDocs(formsCollection);
      const currentDate = new Date();

      let bestMatchForm = null;
      let highestPriority = -1;
      let timeoutDuration = null;

      // First, find the best matching form
      const forms = querySnapshot.docs.map(docSnapshot => ({
        data: docSnapshot.data(),
        id: docSnapshot.id,
        ref: doc(formsCollection, docSnapshot.id)
      }));

      for (const form of forms) {
        const { data: formData, id: formId, ref: formRef } = form;
        const { logicConditions, views, formRendered } = formData;

        // Skip if form has been rendered
        if (formRendered) {
          console.log(`Skipping form: ${formId} (already rendered)`);
          continue;
        }

        const { matchUrl, matchDate, matchTime, logicMatches } = evaluateLogicConditions(
          logicConditions, currentUrl, currentDate
        );

        console.log(`Evaluating form: ${formId}`, { matchUrl, matchDate, matchTime, logicMatches });

        // Update best match form based on logic matches
        if (logicMatches > highestPriority) {
          highestPriority = logicMatches;
          bestMatchForm = { ...formData, id: formId, ref: formRef };
          timeoutDuration = logicConditions.time ? calculateTimeoutDuration(logicConditions.time, currentDate) : null;
        }
      }

      if (bestMatchForm) {
        console.log(`Rendering form: ${bestMatchForm.id}`);
        await updateDoc(bestMatchForm.ref, { views: bestMatchForm.views + 1 });
        handleFormRendering(bestMatchForm, timeoutDuration);
      } else {
        console.log("No matching form found");
      }

    } catch (error) {
      console.error("Error checking logic conditions:", error);
    }
  };

  const evaluateLogicConditions = (logicConditions, currentUrl, currentDate) => {
    let logicMatches = 0;
    let matchUrl = false, matchDate = false, matchTime = false;

    // Check URL condition
    if (logicConditions.url === currentUrl) {
      matchUrl = true;
      logicMatches++;
    }

    // Check Date condition
    if (logicConditions.date) {
      const formDate = new Date(logicConditions.date);
      if (formDate.toDateString() === currentDate.toDateString()) {
        matchDate = true;
        logicMatches++;
      }
    }

    // Check Time condition
    if (logicConditions.time) {
      const [hours, minutes] = logicConditions.time.split(":").map(Number);
      const currentHours = currentDate.getHours();
      const currentMinutes = currentDate.getMinutes();

      if (hours === currentHours && minutes === currentMinutes) {
        matchTime = true;
        logicMatches++;
      }
    }

    return { matchUrl, matchDate, matchTime, logicMatches };
  };

  const handleFormRendering = (form, timeoutDuration) => {
    if (timeoutDuration) {
      const id = setTimeout(() => {
        console.log(`Form timeout reached: Rendering form ${form.id}`);
        setFormToRender(form);
      }, timeoutDuration);

      setTimeoutId(id);
    } else {
      console.log(`Rendering form immediately: ${form.id}`);
      setFormToRender(form);
    }
  };

  useEffect(() => {
    const currentUrl = window.location.pathname;
    checkLogicConditions(currentUrl);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []); // Empty dependency array

  return {
    formToRender,
    handleSubmit: async (submittedData) => {
      if (formToRender) {
        const formRef = doc(formsCollection, formToRender.id);

        try {
          const formSnap = await getDoc(formRef);

          if (formSnap.exists()) {
            const formData = formSnap.data();
            const currentSubmissionsData = formData.submissionsData || [];

            const updatedSubmissionsData = [
              ...currentSubmissionsData,
              {
                timestamp: Date.now(),
                data: submittedData,
              },
            ];

            // Update form with submissions and set formRendered to true
            await updateDoc(formRef, {
              submissions: formToRender.submissions + 1,
              submissionsData: updatedSubmissionsData,
              formRendered: true, // Set form as rendered
            });

            setFormToRender(null);
          }
        } catch (error) {
          console.error("Error updating document: ", error);
        }
      }
    },

    handleFormClose: async () => {
      if (formToRender) {
        try {
          // Set formRendered to true when form is closed
          await updateDoc(doc(formsCollection, formToRender.id), {
            formRendered: true,
          });

          console.log('Form closed:', formToRender.id);
          setFormToRender(null); // This hides the form from the UI
        } catch (error) {
          console.error("Error closing form: ", error);
        }
      }
    },
  };
};
