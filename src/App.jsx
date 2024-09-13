import React, {useState} from 'react';
import Sidebar from './Sidebar';
import Anexo from './Anexo';
import './App.css';
import AnexoForm from './Paginas/AnexoFormulario';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';  


function App() {
  const [isOpen,setIsOpen] =  useState(false);
  const [showAnexo , setShowAnexo] = useState(true);
  //funcion para alternar el estado del sidebar
  const toggleSidebar = () =>{
    setIsOpen(!isOpen);
  }
  const toggleAnexo = () =>{
    console.log('entro al anexo');
    setShowAnexo(!showAnexo);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <div className="App">
      {/**Boton para mostrar el sidebar */}
      {!isOpen && (
        <button className = "toggle-button" onClick={toggleSidebar}>
          Menu
        </button>
      )}
      {/**sidebar con estado controlado desde App */}

      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} toggleAnexo={toggleAnexo}/>
      <div className={`content ${isOpen ? 'shifted':''}`}>
        <h3 className="text-lg text-red-700">Servicios Integrales para la Radiación</h3>
        {showAnexo && <Anexo />}
      </div>
      
    </div>

        }/>
        <Route path='/anexoForm' element={<AnexoForm/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;
