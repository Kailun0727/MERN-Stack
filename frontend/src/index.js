import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkoutsContext';
import { AuthContextProvider } from './context/AuthContext';
import { PageContextProvider } from './context/PageContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

      {/*Wrap App with Context Provider*/}
      <AuthContextProvider>
 
        <WorkoutsContextProvider>
        <PageContextProvider>
          <App />
          </PageContextProvider>
        </WorkoutsContextProvider>

      </AuthContextProvider>
   
   
  </React.StrictMode>
)