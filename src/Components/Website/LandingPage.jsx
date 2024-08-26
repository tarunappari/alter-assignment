import React, { useEffect, useState } from 'react';
import { getDocs, updateDoc, doc } from 'firebase/firestore';
import { formsCollection } from '../../Firebase';
import FeedbackForm from './FeedbackForm';

const LandingPage = () => {
  const [formToRender, setFormToRender] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  // Function to fetch forms and check logic conditions
  const checkLogicConditions = async () => {
    try {
      const querySnapshot = await getDocs(formsCollection);
      const currentDate = new Date();
      const currentUrl = window.location.pathname;

      let bestMatchForm = null;
      let highestPriority = -1; // 0: 3 matches, 1: 2 matches, 2: 1 match
      let timeoutDuration = null; // Initialize timeoutDuration

      querySnapshot.forEach((docSnapshot) => {
        const formData = docSnapshot.data();
        const formId = docSnapshot.id; // Get the document ID from the snapshot
        const { logicConditions, views } = formData;

        let logicMatches = 0;
        let matchUrl = false, matchDate = false, matchTime = false;

        // Check URL condition
        if (logicConditions.url && logicConditions.url === currentUrl) {
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
          const [hours, minutes] = logicConditions.time.split(":").map(Number); // Parse the time
          const currentHours = currentDate.getHours();
          const currentMinutes = currentDate.getMinutes();

          if (hours === currentHours && minutes === currentMinutes) {
            matchTime = true;
            logicMatches++;
          } else {
            // Calculate the difference in milliseconds until the target time
            const targetTime = new Date();
            targetTime.setHours(hours, minutes, 0, 0);
            const timeDifference = targetTime - currentDate;

            if (timeDifference > 0 && (timeoutDuration === null || timeDifference < timeoutDuration)) {
              timeoutDuration = timeDifference;
            }
          }
        }

        // Skip rendering the form if the conditions are not met
        if (!matchUrl && !matchDate && !matchTime) {
          console.log(`Skipping form ${formData.formName} due to unmet conditions`);
          return; // Skip this form
        }

        // Check if this form has already been rendered
        const formRendered = localStorage.getItem(`formRendered_${formId}`);
        if (formRendered) {
          console.log(`Form ${formId} has already been rendered, skipping...`);
          return; // Skip this form since it has been rendered
        }

        // Determine the highest priority form to render
        if (logicMatches > highestPriority) {
          highestPriority = logicMatches;
          bestMatchForm = { ...formData, id: formId }; // Include the document ID
        }
      });

      console.log("Best match form:", bestMatchForm);

      // Render the best match form if conditions are met
      if (bestMatchForm) {
        const formId = bestMatchForm.id;
        console.log("Best match is:", bestMatchForm.formName, "with ID:", formId);

        if (!formId) {
          console.error("Form ID is missing");
          return; // Exit early if no valid ID
        }

        const formSubmitted = localStorage.getItem(`formSubmitted_${formId}`);
        const formClosed = localStorage.getItem(`formClosed_${formId}`);

        if (!formSubmitted && !formClosed) {
          const formRef = doc(formsCollection, formId);

          // Increment view count
          await updateDoc(formRef, { views: bestMatchForm.views + 1 });

          // Handle form rendering based on timeout duration
          if (timeoutDuration) {
            const id = setTimeout(async () => {
              const formSubmitted = localStorage.getItem(`formSubmitted_${formId}`);
              const formClosed = localStorage.getItem(`formClosed_${formId}`);

              if (!formSubmitted && !formClosed) {
                // Increment view count
                await updateDoc(formRef, { views: bestMatchForm.views + 1 });
                setFormToRender(bestMatchForm);

                // Mark the form as rendered in localStorage
                localStorage.setItem(`formRendered_${formId}`, true);
              }
            }, timeoutDuration);

            // Store the timeout ID to clear it if needed
            setTimeoutId(id);
          } else {
            // Directly render the form if no timeout is needed
            setFormToRender(bestMatchForm);

            // Mark the form as rendered in localStorage
            localStorage.setItem(`formRendered_${formId}`, true);
          }
        }
      }
    } catch (error) {
      console.error("Error checking logic conditions:", error);
    }
  };

  useEffect(() => {
    checkLogicConditions(); // Check conditions when the page loads

    // Cleanup function to clear timeout if component unmounts
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]); // Depend on timeoutId to handle cleanup

  const handleSubmit = async (submittedData) => {
    if (formToRender) {
      const formRef = doc(formsCollection, formToRender.id);

      // Save submission data to Firestore
      await updateDoc(formRef, {
        submissions: formToRender.submissions + 1,
        [`submissionsData.${Date.now()}`]: submittedData,
      });

      localStorage.setItem(`formSubmitted_${formToRender.id}`, true);
    }
  };

  const handleFormClose = () => {
    if (formToRender) {
      localStorage.setItem(`formClosed_${formToRender.id}`, true);
    }
  };

  if (
    (formToRender && localStorage.getItem(`formSubmitted_${formToRender?.id}`)) ||
    (formToRender && localStorage.getItem(`formClosed_${formToRender?.id}`))
  ) {
    return <div>Landing</div>;
  }

  return (
    <div>
      <h1>Landing Page</h1>
      {formToRender && (
        <FeedbackForm form={formToRender} onSubmit={handleSubmit} onClose={handleFormClose} />
      )}
    </div>
  );
};

export default LandingPage;
