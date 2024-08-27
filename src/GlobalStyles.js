import { createGlobalStyle } from "styled-components";


export const GlobalStyles = createGlobalStyle`

   @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

   *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    color: #000000;
   }

   button{
      border: none;
      padding: 0.5rem 0.5rem;
      cursor: pointer;
      border-radius: 0.3rem;
      font-weight: 600;
   }
    .save{
      background-color: #2e7d32;
    }
    .blue{
      background-color: #2196f3;
      color: #fff;
    }

    input{
                border: none;
                padding: 0.5rem;
                font-size: 1rem;
            }
   
   textarea{
      border: 1px solid grey;
      border-radius: 0.3rem;
      padding: 0.3rem;
      font-size: 0.9rem;
      background-color: transparent;
   }

   textarea:focus{
      outline: none;
   }

   select:focus{
      outline: none;
   }

   /* modal styles */
   .input{
      min-width: 100%;
      border-bottom: 1px solid #000000;
   }

   input:focus{
      outline: none;
   }

   .modal-btn-container{
      align-self: flex-end;
      display: flex;
      gap: 0.5rem;
      .modal-button{
         font-weight: 600;
         background-color: transparent;
         cursor: pointer;
      }
      .green-btn{
         color: #189657;
      }
      .grey-btn{
         color: #b2b2b2;
      }
   }
   /* modal styles */

       /* Styling the main scrollbar */
       ::-webkit-scrollbar {
        width: 0.3rem;  /* Width of the scrollbar */
    }

/* Styling the thumb part of the scrollbar */
::-webkit-scrollbar-thumb {
  background-color: grey;  /* Color of the scrollbar thumb */
  border-radius: 5px;      /* Rounded corners for the thumb */
}


   

`