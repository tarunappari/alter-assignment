import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const AboutContent = () => {
    const linksRef = useRef([]);
    const cursorRef = useRef(null);

    useEffect(() => {
        const links = linksRef.current;
        const cursor = cursorRef.current;

        const animate = (e) => {
            const span = e.currentTarget.querySelector('span');
            const { offsetX: x, offsetY: y } = e;
            const { offsetWidth: width, offsetHeight: height } = e.currentTarget;

            const move = 25;
            const xMove = (x / width) * (move * 2) - move;
            const yMove = (y / height) * (move * 2) - move;

            span.style.transform = `translate(${xMove}px, ${yMove}px)`;

            if (e.type === 'mouseleave') {
                span.style.transform = '';
            }
        };

        const editCursor = (e) => {
            const { clientX: x, clientY: y } = e;
            cursor.style.left = `${x}px`;
            cursor.style.top = `${y}px`;
        };

        links.forEach((link) => {
            link.addEventListener('mousemove', animate);
            link.addEventListener('mouseleave', animate);
        });

        window.addEventListener('mousemove', editCursor);

    }, []);

    return (
        <Container>
            <div className="wrapper">
                <nav>
                    <h3
                        className="hover-this"
                        ref={(el) => (linksRef.current[0] = el)}
                        onClick={() => console.log('home')}
                        style={{fontSize:'2rem'}}
                    >
                        <span>This</span>
                    </h3>
                    <h3 className="hover-this" ref={(el) => (linksRef.current[1] = el)}>
                        <span style={{fontSize:'2rem'}}>is </span>
                    </h3>
                    <h3 className="hover-this" ref={(el) => (linksRef.current[2] = el)}>
                        <span style={{fontSize:'2rem'}}>the</span>
                    </h3>
                    <h3 className="hover-this" ref={(el) => (linksRef.current[3] = el)}>
                        <span style={{fontSize:'6rem'}}>About</span>
                    </h3>
                    <div className="cursor" ref={cursorRef}></div>
                </nav>
            </div>
        </Container>
    );
};

export default AboutContent;

let Container = styled.div`

  cursor:none;
.wrapper{
    width: 100%;
    height: 100vh;
    background: #161616;
    display: flex;
    justify-content: center;
    align-items: center;
}

nav{
    width: 80%;
    margin: 0 auto;
    text-align: center;
    position: absolute;
    top: 50%;
}

.hover-this{
    transition: all 0.3s;
}

span{
    display: inline-block;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 300;
    color: #fff;
    font-size: 36px;
    text-transform: uppercase;
    pointer-events: none;
    transition: transform 0.1s linear;
}

.cursor{
    pointer-events: none;
    position: fixed;
    padding: 0.3rem;
    background-color: #fff;
    border-radius: 50%;
    mix-blend-mode: difference;
    transition: transform 0.3s ease;
}

.hover-this:hover ~ .cursor{
    transform: translate(-50%, -50%) scale(8);
}

@media(min-width : 900px){
    nav{
        display: flex;
        justify-content: space-around;
    }

    .hover-this{
        width: 100%;
        padding: 20px 0;
        display: inline-block;
    }
}

`