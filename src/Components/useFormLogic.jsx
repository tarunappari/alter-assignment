import { useEffect, useState, useCallback } from 'react';
import { getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import { formsCollection } from '../Firebase'; // Adjust the path based on your file structure

export const useFormLogic = () => {
  const [formToRender, setFormToRender] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  // Function to fetch forms and check logic conditions
  const checkLogicConditions = useCallback(async (currentUrl) => {
    try {
      const querySnapshot = await getDocs(formsCollection);
      const currentDate = new Date();

      let bestMatchForm = null;
      let timeoutDuration = null;
      let priorityForm = 0

      const forms = querySnapshot.docs.map(docSnapshot => ({
        data: docSnapshot.data(),
        id: docSnapshot.id,
        ref: doc(formsCollection, docSnapshot.id)
      }));

      for (const form of forms) {
        const { data: formData, id: formId, ref: formRef } = form;
        const { logicConditions, formRendered,published } = formData;

        // Skip if form has been rendered
        if (formRendered) {
          continue;
        }

        //skipping the form if it is not published
        if(published === false){
          continue;
        }

        //checking the logics
        const { matchUrl, matchDate, matchTime, logicMatches } = evaluateLogicConditions(
          logicConditions, currentUrl, currentDate
        );

        // Update best match form based on logic matches
        if (logicMatches > priorityForm) {
          priorityForm = logicMatches;
          bestMatchForm = { ...formData, id: formId, ref: formRef };
          timeoutDuration = logicConditions.time ? calculateTimeoutDuration(logicConditions.time, currentDate) : null;
        }
      }

      if (bestMatchForm) {
        await updateDoc(bestMatchForm.ref, { views: bestMatchForm.views + 1 });
        handleFormRendering(bestMatchForm, timeoutDuration);
      } else {
        console.log("No matching form found");
      }

    } catch (error) {
      console.error("Error checking logic conditions:", error);
    }
  }, []);

  const evaluateLogicConditions = (logicConditions, currentUrl, currentDate) => {
    let logicMatches = 0;
    let matchUrl = false, matchDate = false, matchTime = false;

    //if there is url but not matching with the current url no need of that so we are returning back
    if (logicConditions.url && logicConditions.url !== currentUrl) {
       return { matchUrl, matchDate, matchTime, logicMatches }
    }

    // Checking URL condition
    if (logicConditions.url && logicConditions.url === currentUrl) {
      matchUrl = true;
      logicMatches++;
    }

    // Checking Date condition
    if (logicConditions.date) {
      const formDate = new Date(logicConditions.date);
      if (formDate.toDateString() === currentDate.toDateString()) {
        matchDate = true;
        logicMatches++;
      }
    }

    // Checking Time condition
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

  //calculating the time duration between current time and logic time
  const calculateTimeoutDuration = (timeCondition, currentDate) => {
    const [hours, minutes] = timeCondition.split(":").map(Number);
    const targetTime = new Date();
    targetTime.setHours(hours, minutes, 0, 0);
    return targetTime.getTime() - currentDate.getTime();
  };

  //rendering the form at that time
  const handleFormRendering = (form, timeoutDuration) => {
    if (timeoutDuration && timeoutDuration > 0) {
      const id = setTimeout(() => {
        setFormToRender(form);
      }, timeoutDuration);

      setTimeoutId(id);
    } else {
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
  }, [checkLogicConditions, timeoutId]);

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
          await updateDoc(doc(formsCollection, formToRender.id), {
            formRendered: true,
          });

          setFormToRender(null);
        } catch (error) {
          console.error("Error closing form: ", error);
        }
      }
    },
  };
};
