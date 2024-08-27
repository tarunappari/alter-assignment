import React from 'react'
import styled from 'styled-components';

const Navbar = ({ title }) => {
  return (
    <NavbarContainer>
      <div className="title-container">
        <h3 className='title'>{title}</h3>
      </div>
    </NavbarContainer>
  )
}

export default Navbar;

let NavbarContainer = styled.div`
  padding: 1rem;
  position: sticky;
  top: 0rem;
  min-width: 100%;
  background-color: #ffffff;
  box-shadow: 2px 2px 3px 1px #c4c2c2;
  .title{
    font-weight: 600;
  }
`