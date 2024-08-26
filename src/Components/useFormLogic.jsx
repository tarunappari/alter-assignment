import { useEffect, useState } from 'react';
import { getDocs, updateDoc, doc } from 'firebase/firestore';
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
      let highestPriority = -1; // 0: 3 matches, 1: 2 matches, 2: 1 match
      let timeoutDuration = null;

      querySnapshot.forEach((docSnapshot) => {
        const formData = docSnapshot.data();
        const formId = docSnapshot.id;
        const { logicConditions, views } = formData;

        let logicMatches = 0;
        let matchUrl = false, matchDate = false, matchTime = false;

        // Check URL condition
        if (logicConditions.url && logicConditions.url === currentUrl) {
          matchUrl = true;
          logicMatches++;
        } else if (logicConditions.url && logicConditions.url !== currentUrl) {
          return; // Skip form if URL does not match
        }

        // Check Date condition
        if (logicConditions.date) {
          const formDate = new Date(logicConditions.date);
          if (formDate.toDateString() === currentDate.toDateString()) {
            matchDate = true;
            logicMatches++;
          } else {
            return; // Skip form if Date does not match
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
          } else {
            const targetTime = new Date();
            targetTime.setHours(hours, minutes, 0, 0);
            const timeDifference = targetTime - currentDate;

            if (timeDifference > 0 && (timeoutDuration === null || timeDifference < timeoutDuration)) {
              timeoutDuration = timeDifference;
            }
          }
        }

        // Set the best match form if conditions are met
        if (matchUrl && matchDate && matchTime) {
          if (logicMatches > highestPriority) {
            highestPriority = logicMatches;
            bestMatchForm = { ...formData, id: formId };
          }
        }
      });

      if (bestMatchForm) {
        const formId = bestMatchForm.id;

        const formSubmitted = localStorage.getItem(`formSubmitted_${formId}`);
        const formClosed = localStorage.getItem(`formClosed_${formId}`);

        if (!formSubmitted && !formClosed) {
          const formRef = doc(formsCollection, formId);

          await updateDoc(formRef, { views: bestMatchForm.views + 1 });

          if (timeoutDuration) {
            const id = setTimeout(async () => {
              const formSubmitted = localStorage.getItem(`formSubmitted_${formId}`);
              const formClosed = localStorage.getItem(`formClosed_${formId}`);

              if (!formSubmitted && !formClosed) {
                await updateDoc(formRef, { views: bestMatchForm.views + 1 });
                setFormToRender(bestMatchForm);
                localStorage.setItem(`formRendered_${formId}`, true);
              }
            }, timeoutDuration);

            setTimeoutId(id);
          } else {
            setFormToRender(bestMatchForm);
            localStorage.setItem(`formRendered_${formId}`, true);
          }
        }
      }
    } catch (error) {
      console.error("Error checking logic conditions:", error);
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
  }, [timeoutId]);

  return {
    formToRender,
    handleSubmit: async (submittedData) => {
      if (formToRender) {
        const formRef = doc(formsCollection, formToRender.id);

        await updateDoc(formRef, {
          submissions: formToRender.submissions + 1,
          [`submissionsData.${Date.now()}`]: submittedData,
        });

        localStorage.setItem(`formSubmitted_${formToRender.id}`, true);
      }
    },
    handleFormClose: () => {
      if (formToRender) {
        localStorage.setItem(`formClosed_${formToRender.id}`, true);
      }
    },
  };
};
