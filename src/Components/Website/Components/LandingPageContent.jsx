import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styled from "styled-components";
import PreLoader from "./PreLoader";
import { useNavigate } from "react-router-dom";

const LandingPageContent = () => {

  const subHeaders = [
    "top-notch web designing",
    "forging ahead with elite web designs",
    "take the fast lane to mastery",
    "bring your project to life, quicker than ever",
  ];

  const placeholderRef = useRef(null);
  const subheaderRef = useRef(null);

  let navigate = useNavigate()

  useEffect(() => {
    const items = document.querySelectorAll('.nav-item');


    function changeColors() {
      gsap.to('.container', { backgroundColor: "#000", duration: 0.5 });
      gsap.to('.placeholder, nav, footer, p', { color: "#fff", duration: 0.5 });
    }

    function revertColors() {
      gsap.to('.container', { backgroundColor: "#e3e3e3", duration: 0.5 });
      gsap.to('.placeholder, nav, footer, p', { color: "#000", duration: 0.5 });
    }

    function animateScale(element, scaleValue) {
      gsap.fromTo(element, { scale: 1 }, { scale: scaleValue, duration: 2, ease: 'power1.out' });
    }

    function wrapLetters(text) {
      if (placeholderRef.current) {
        placeholderRef.current.innerHTML = '';
        [...text].forEach(letter => {
          const span = document.createElement('span');
          span.style.filter = 'blur(8px)';
          span.textContent = letter;
          placeholderRef.current.appendChild(span);
        });
      }
    }

    function animateBlueEffect() {
      const letters = placeholderRef.current?.children;
      if (!letters) return;
      let index = 0;

      function clearNextLetter() {
        if (index < letters.length) {
          gsap.to(letters[index], { filter: 'blur(0px)', duration: 0.5 });
          index++;
          if (index < letters.length) {
            setTimeout(clearNextLetter, 100);
          }
        }
      }

      setTimeout(clearNextLetter, 0);
    }

    function shuffleLetters(finalText) {
      wrapLetters(finalText.replace(/./g, ' '));

      let textArray = finalText.split('');
      let shufflingCounter = 0;
      let intervalHandles = [];

      function shuffle(index) {
        if (shufflingCounter < 30) {
          textArray[index] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
          if (placeholderRef.current) {
            placeholderRef.current.children[index].textContent = textArray[index];
          }
        } else {
          if (placeholderRef.current) {
            placeholderRef.current.children[index].textContent = finalText.charAt(index);
          }
          clearInterval(intervalHandles[index]);
        }
      }

      for (let i = 0; i < finalText.length; i++) {
        intervalHandles[i] = setInterval(shuffle, 80, i);
      }

      setTimeout(() => {
        shufflingCounter = 30;
        if (placeholderRef.current) {
          for (let i = 0; i < finalText.length; i++) {
            placeholderRef.current.children[i].textContent = finalText.charAt(i);
            clearInterval(intervalHandles[i]);
          }
        }
        animateBlueEffect();
      }, 1000);
    }

    function updatePlaceholderText(event) {
      const newText = event.target.textContent.toUpperCase();
      const itemIndex = Array.from(items).indexOf(event.target);
      const newSubHeaderText = subHeaders[itemIndex].toUpperCase();

      if (subheaderRef.current) {
        subheaderRef.current.textContent = newSubHeaderText;
      }
      animateScale(placeholderRef.current, 1.25);
      shuffleLetters(newText);
    }

    function resetPlaceholderText() {
      const defaultText = 'ALTER';
      const defaultSubHeaderText = "THE ALTER OFFICE ASSIGNMENT.";

      if (subheaderRef.current) {
        subheaderRef.current.textContent = defaultSubHeaderText;
      }
      animateScale(placeholderRef.current, 1.25);
      shuffleLetters(defaultText);
    }

    items.forEach((item) => {
      item.addEventListener('mouseover', updatePlaceholderText);
      item.addEventListener('mouseout', resetPlaceholderText);
    });

    return () => {
      items.forEach((item) => {
        item.removeEventListener('mouseover', updatePlaceholderText);
        item.removeEventListener('mouseout', resetPlaceholderText);
      });
    };
  }, []);

  return (
    <Container>
      <PreLoader />
      <div className="container">
        <nav>
          <div id="item-1" className="nav-item" onClick={() => navigate('/home')}>Home</div>
          <div id="item-2" className="nav-item" onClick={() => navigate('/about')}>about</div>
        </nav>
        <footer>
          <div id="item-3" className="nav-item" onClick={() => navigate('/services')}>services</div>
          <div id="item-4" className="nav-item" onClick={() => navigate('/contact')}>contact</div>
        </footer>

        <div className="header">
          <h3 onClick={() => navigate('/admin')} style={{ zIndex: '99',fontWeight:'600',textAlign:'center',cursor:'pointer',display:'inline-block' }}>Admin Panel</h3>
          <div className="placeholder" ref={placeholderRef}>ALTER</div>
          <p id="subheader" ref={subheaderRef}>The Alter Office Assignment.</p>
        </div>
      </div>
    </Container>
  );
};

export default LandingPageContent;


let Container = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .container{
    width: 100%;
    height: 100%;
    font-family:'Courier New', Courier, monospace;
    text-transform: uppercase;
    background: #e3e3e3;
}

nav,footer{
    position: absolute;
    padding: 2em;
    width: 100%;
    display: flex;
    justify-content: space-between;
}

footer{
    bottom: 0;
}


nav > div, footer > div{
    padding: 2em;
    cursor: pointer;
}

.header{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 75%;
}

p{
    text-align: center;
    font-size: 12px;
}

.placeholder{
    text-align: center;
    font-family: 'Times New Roman', Times, serif;
    font-size: 80px;
    line-height: 2.25;
}

.nav-items{
  font-weight: 600;
}

`