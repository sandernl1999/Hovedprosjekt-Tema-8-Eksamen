import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800');
     
  /*  Jeg liker å ha all CSS'en min på samme sted, for å så dele de i grupper slik som her:*/
  
  *{
    box-sizing: border-box;
  }
  
  html {
    font-size: 20px; 
    line-height: 1.5; 
    } 

    html, body {
        margin: 0 auto;
        padding: 0;
        background-color: white; 
    }

    body {
      font-family: 'Fira Sans', sans-serif;
    }
 


    /* Geocoder, søkefeltet*/

    .mapboxgl-ctrl-geocoder {
        width: 50% !important;
    }
    .mapboxgl-ctrl-top-right {
      right 36% !important;
      width: 60%;
    }
   
  
    /*mao root*/
    #root {
      z-index: -99;
    }

    /*Fyll kartet*/
    .mapContainer {
      margin-top: -10px;
    }


    /*Informasjonsboksen som man trykker på i øvre venstre hjørne*/

    .modal {
      display: block;
      position: fixed;
      z-index: 1;
      padding-top: 12em;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgb(0, 0, 0);
      background-color: rgba(0, 0, 0, 0.4);
    }

    .modal-content {
      font-family: sans-serif;
      background-color: #fefefe;
      margin: auto;
      padding: 30px;
      border: 1px solid black;
      width: 40%;
      letter-spacing: 1px;
    }

    .close {
      color: #727579;
      float: right;
      font-size: 28px;
      font-weight: bold;
      position: absolute;
      right: 5px;
    }

    .close:hover,
    .close:focus {
      color: #000;
      text-decoration: none;
      cursor: pointer;
    }

    p {
      text-align: center;
    }

    .info-modal {
      top: 220px !important;
    }
    .modal-content {      
      padding: 0 !important;
      top: 50px;
    }
    .close-popup-icon {
      color: #000000bf;
      font-size: 24px;
      cursor: pointer;
      border-radius: 5px 5px 5px 5px;
    }
    .modal {
      padding-top: 0;
    }
   
    .modal-disabled {
      pointer-events: none;
      opacity: 0.4;
    }

    #myBtn {
      position: absolute;
      z-index: 99;
      left: 10px;
      background-color: white;
      width: 30px;
      top: 0.4em;
      font-size: 22px !important;
      border: 0.3px solid black;
      border-radius: 5px 5px 5px 5px;
      height: 40px;
    }

    .container {
      align-items: center;
      position: fixed;
      z-index: 1;
      display: flex;
      height: 200px;
      justify-content: center;
      top: -2.5em;
      right: -4em;
      width: 360px;
    }


    /* Stjerne-rating funksjon*/

    .react-rater-star.is-active {
      color: #ddb745 !important;
    }
    .react-rater-star.will-be-active {
      color: #e3cc86 !important;
    }

 
    /* Innlogging og registrering */

    .auth-form {
      padding: 40px;
      border-radius: 10px;      
      font-size: 14px;
      width: 400px;
    }

    .auth-header {
      text-align: center;
      font-size: 24px;
      margin-bottom: 20px;      
    }
    .form-control {
      font-size: 14px;
    }
    .form-label {
      font-weight: 500;
    }
    button {
      font-size: 14px !important;
    }
    .app-title {
      font-size: 26px;
      position: absolute;
      color: white;
      padding: 20px;
      font-weight: 500;
    }
    html {
      font-family: 'Fira Sans', sans-serif;
      height:100%;
    }
    
    body {
      margin:0;
    }
    
    .bg {
      animation:slide 3s ease-in-out infinite alternate;
      background-image: linear-gradient(-60deg, #6c3 50%, #09f 50%);
      bottom:0;
      left:-50%;
      opacity:.5;
      position:fixed;
      right:-50%;
      top:0;
      z-index:-1;
    }
    
    .bg2 {
      animation-direction:alternate-reverse;
      animation-duration:4s;
    }
    
    .bg3 {
      animation-duration:5s;
    }
    
    .auth-container {
      background-color:white;      
      border-radius:.25em;
      box-shadow:0 0 .25em rgba(0,0,0,.25);
      box-sizing:border-box;
      left:50%;      
      position:fixed;      
      top:50%;
      transform:translate(-50%, -50%);      
    }
    
    h1 {
      font-family:monospace;
    }
    
    @keyframes slide {
      0% {
        transform:translateX(-25%);
      }
      100% {
        transform:translateX(25%);
      }
    }


    /* Innlogging og registrering animasjon */
    
    .animate-form {
      animation: wobble .5s 1;
      animation-timing-function	: ease-in;
    }
    @keyframes wobble {
      25% {
        margin-left: 50px;
      }
      50% {
        margin-left: 200px;
      }
      75% {
        margin-left: 400px;
      }
      100% {
        margin-left: 700px;
      }
    }
    .animate-modal {
      animation: modal-animation .5s 1;
      animation-timing-function	: ease-in;
    }
    @keyframes modal-animation {      
      0% {
        margin-left: -1000px;
        opacity: 0;
      }
      33% {
        margin-left: -500px;
        opacity: 0.3;
      }
      66% {
        margin-left: -300px;
        opacity: 0.7;
      }
      90% {
        margin-left: -150px;
        opacity: 0.9;
      }
      100% {
        margin-left: 0px;
        opacity: 1;
      }
    }
    .animate-close-modal {
      animation: modal-close-animation .5s 1;
      animation-timing-function	: ease-in;
    }
    @keyframes modal-close-animation {
      25% {
        margin-left: 50px;
        opacity: 1;
      }
      50% {
        margin-left: 200px;
        opacity: 0.5;
      }
      75% {
        margin-left: 400px;
        opacity: 0.3;
      }
      100% {
        margin-left: 700px;
        opacity: 0;
      }
    }
   

    /* Dropdown-menu-list */
    
    nav {
      margin: auto;
      position: absolute;
      left: 2.5em;
      top: 10px;
      cursor: pointer;
    }
    
    nav h2 {
      font-size: 1.2rem;
      z-index: 1;
      top: -0.03em;
      border-radius: 2px;
      position: relative;
      background: white;
      border:  0.3px solid black;
      border-radius: 5px 5px 5px 5px;
      height: 40px;
      text-transform: uppercase;
      color: ivory;
      font-weight: 200;
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      box-shadow: 4px 4px 20px -2px rgba(0,0,0,.35);
      transition: all .4s;
      padding: 0 10px;
    }
    
    nav:hover h2{
      transform: translateY(-2px);
      box-shadow: 2px 2px 5px -1px rgba(0,0,0,.35);
     }
    nav:hover:active h2{
      transform: translateY(10px);
      box-shadow: 0px -1px 2px 0px rgba(0,0,0,.35);
     }
    
    #toggle {
      position: absolute;
      left: 0;
      top: 0;
      width: 20vw;
      z-index: 1;
      opacity: 0;
      cursor: pointer;
      height: 40px;
    }
    
    #toggle:checked ~ul {
      height: 0%;
    }
    
    nav ul {
      padding-left: 0;
      padding-top: 0;
      margin-top: 0;
      list-style: none;      
      text-align: right;
      margin-bottom: 22px;
      text-align: center;
      width: 20vw;
      min-width: 100px;
      transition: all .4s ease-out;      
      border-radius: 5px 5px 5px 5px;
      max-height: 600px;
      overflow-y: auto;
    }
    nav ul li {
      position: relative;
      display: inline-block;
      border: 1px solid black;
      border-radius: 5px 5px 5px 5px;
      border-top-right-radius: 5px;
      margin-left: 35px;
      line-height: 1.5;
      min-width: 80px;
      width: 96px;
      padding: 0.3em;
      margin: 3px;
      background: white;
      transition: background 3s;
      box-shadow: 2px 2px 10px -2px rgba(0,0,0,.35);
      z-index: 3;
    }
    
    nav ul li:hover {
      background: rgb(77, 152, 223);
      transition: background .45s;
    }
    
    nav ul a {
      display: block;
      color: rgb(17, 17, 16);
      text-transform: lowercase;
      font-size: 18px;
      font-weight: 200;
      min-width: 80px;
      text-decoration: none;
      transition: color .3s;
      border-radius: 5px 5px 5px 5px;
    }

    ul li a {
      min-width: 80px;
    }
    
    li {
        border-top-right-radius: 5px;
        min-width: 80px;
    }

    .menu-element:hover {
      color: #FFFFFF;
      text-decoration: none;
    }

    img {
      border-radius: 50%;
      width: 120px;
      height: 120px;
    }


    /* Logg ut funksjonalitet */

    .logout-container {
      position: absolute;
      right: 0px;      
      z-index: 3;   
      height: 50px;
      margin-top: 5px;
      margin-right: 5px;   
    }

    .logout-container:hover {
      background-color: #FFFFFF;
      border: 0.6px solid black;
      border-radius: 5px;
    }
    
    .profile-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      float: left;
    }
    
    .logout {
      font-weight: 500;
      color: black;
      font-size: 14px;
      position: relative;
      right: -18px;
      margin-top: 10px;
      overflow: hidden;
      letter-spacing: 3px;
      opacity: 0;
      transition: opacity .45s;
      -webkit-transition: opacity .35s;
      cursor: pointer;
    }  

    .logout-button {
      text-decoration: none;
      float: right;      
      margin: 10px;
      color: black;
      width: 60px;  
      margin-top: 3.5px;    
      transition: width .35s;
      -webkit-transition: width .35s;
      overflow: hidden;
      text-decoration: none;
    }
    
    .logout-button:hover {
      width: 150px;
    }

    .full-width {
      width: 170px;
      background-color: #FFFFFF;
      opacity: .9;
    }
    
    .full-width1{
      width: 180px;
      background-color: #FFFFFF;
      opacity: .9;
    }

    .logout-opacity {
      opacity: 1;
    }
    
    .logout-button:hover .logout{
      opacity: .9;
    }


    /* pop-up, rammen */
    
    .dest-modal {
      width: 100%;
      margin-top: 4em;
    }

    .hide-element {
      visibility: hidden;
    }



    /* Responsivt design CSS */

    @media screen and (max-width: 900px) {
      p {
        font-size: 14px !important;
      }
    }

    @media screen and (max-width: 574px) {
      p {
        font-size: 12px !important;
      }
    }

    @media only screen and (max-width: 400px) {
      .modal-content {
        width: 70%;
      }
    }

    @media screen and (max-width: 700px) and (min-width: 400px) {
      .modal-content {
        width: 70%;
      }
    }

    @media only screen and (max-width: 320px) {
      #myBtn {
        left: 0.2em;
      }
    }

    @media screen and (max-width: 750px) {
      .profile-img {
        width: 40px;
        height: 40px;       
      }
      .signup-form {
        padding: 20px !important;
      }
      .app-title {
        padding: 5px;
      }
    }

    @media screen and (max-width: 450px) {
      .auth-form {
        padding: 30px;
        width: 350px;
      }
      .signup-form {
        padding: 20px !important;
      }
    }
    @media screen and (max-width: 360px) {
      .auth-form {
        padding: 20px;
        width: 300px;
      }
      .signup-form {
        padding: 10px !important;
      }
    }
    .align-center {
      text-align : center;
    }

    @media screen and (max-width: 500px) {
      .mapboxgl-ctrl-top-right {
           right: 15% !important;
           width: 42%;
       }
   }

   @media screen and (max-width: 590px) {
     .mapboxgl-ctrl-top-right {
         left: 8% !important;
         width: 90% !important;
         top: 55px;
     }
     .mapboxgl-ctrl-geocoder {
         width: 100% !important;
     }
     .modal-content {
    
     }
    
   }

   @media screen and (max-width: 600px) {
     .mapboxgl-ctrl-top-right {
       right: 20% !important;
       width: 42%;
     }
   }

   @media screen and (max-width: 700px) {
     .mapboxgl-ctrl-top-right {
       right: 30% !important;
       width: 42%;
       top: 55px;
     }
   }

`;

export default GlobalStyle;
