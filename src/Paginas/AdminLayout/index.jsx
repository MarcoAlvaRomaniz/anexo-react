import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import TablaAnexos from "../../Views/TablaAnexos";
import FormularioAnexo from "../../components/FormularioAnexo";
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcom from "../../components/Welcom";
import { GrTable } from "react-icons/gr";
export default function AdminLayout(){
    return(
        <>
        <p className="w-full text-center m-auto p-1" >Oprima el botón para agregar un nuevo anexo a la cotización</p>
        <div className=" flex justify-between text-center w-1/4 m-auto p-2">
            
            <button 
                className="btn btn-success mb-1"
            >
                <Link to={'formulario-anexo/new'}>Nuevo</Link>
                
            </button>
            <button 
                className="btn btn-success mb-1"
            >
                <Link to={'tabla-anexos'}>Tabla</Link>
                <GrTable />


            </button>
        </div>
        <div>

        <Routes>
            <Route path="/tabla-anexos" element={<TablaAnexos />} exact/>
            <Route path="/formulario-anexo/:id" element={<FormularioAnexo />} exact/>
        </Routes>
        </div>
        
        </>
        
        
    )
}