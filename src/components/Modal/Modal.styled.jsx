import s from 'styled-components';

export const Overlay = s.div`
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
background-color: rgba(0, 0, 0, 0.8);
overflow: hidden; 
`;

export const ModalWindow = s.div`
max-width: calc(100vw - 48px);
max-height: calc(100vh - 24px);
background-color: #ffffff;
overflow: hidden; 
`;
