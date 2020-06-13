import React from 'react';
import { LoaderProvider } from './components/Loader';
import './App.css';
import Main from './components/Main';

function App() {
  return (
   <LoaderProvider>
     <Main />
   </LoaderProvider>
  );
}

export default App;
