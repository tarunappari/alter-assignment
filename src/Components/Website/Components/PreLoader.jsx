

import React, { useEffect, useState } from "react";
import styled from "styled-components"
import gsap from 'gsap';


function PreLoader() {
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        function startLoader() {
            const counterElement = document.getElementById('counter');
            let currentValue = 1;
            const interval = 10;
            const totalDuration = 2000;
            const numberOfIntervals = 10;

            function updateCounter() {
                const remainingTime = totalDuration - (Date.now() - startTime);
                const timePerInterval = remainingTime / numberOfIntervals;
                const increment = Math.floor(Math.random() * interval) + 1;

                if (currentValue >= 100) {
                    if (counterElement) {
                        counterElement.textContent = '100';
                        return;
                    }
                }

                currentValue += increment;
                if (currentValue > Math.ceil(currentValue / 10) * 10) {
                    currentValue = Math.ceil(currentValue / 10) * 10;
                }

                if (counterElement) {
                    counterElement.textContent = currentValue.toString();
                }

                counterElement.textContent = currentValue.toString();

                if (Date.now() - startTime < totalDuration) {
                    setTimeout(updateCounter, timePerInterval);
                } else {
                    if (counterElement) {
                        counterElement.textContent = '100';
                    }
                }
            }

            const startTime = Date.now();
            updateCounter();
        }

        startLoader();

        const timer = setTimeout(() => {
            gsap.to('.counter', { duration: 1.25, opacity: 0 });
            gsap.to('.bar', { duration: 2.5, height: 0, stagger: { amount: 0.5 }, ease: 'power4.inOut' });
            gsap.from('.text-element', { duration: 2.5, y: 700, stagger: { amount: 0.5 }, ease: 'power4.inOut', onComplete: () => setLoader(false) });
        }, 2000);

        return () => clearTimeout(timer);

    }, []);


    return (
        <PreLoaderContainer>
            {
                loader && (
                    <div className="preloader">
                        <h1 className='counter' id="counter">0</h1>
                        <div className='overlay'>
                            {Array.from({ length: 10 }, (_, i) => <div key={i} className='bar'></div>)}
                        </div>
                    </div>
                )
            }
        </PreLoaderContainer>
    )
}

export default PreLoader;

let PreLoaderContainer = styled.div`
  position: relative;
  overflow: hidden !important;

  .overlay{
    position: fixed;
    width: 100vw;
    height: 115vh;
    top: -1rem;
    z-index: 99 !important;
    display: flex;
}

.bar{
    width: 10vw;
    height: 120vh;
    background: #1a1a1a;
    z-index: 999 !important;
}

.counter{
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    z-index: 150;
    font-weight: 800;
    color: #bcbcc4;
    padding: 0.2em 0.4em;
    font-size: 15vw;
}
`