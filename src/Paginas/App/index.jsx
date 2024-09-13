import { BrowserRouter, Route, Routes  } from "react-router-dom";
import AdminLayout from './../AdminLayout';
import FormularioAnexo from './../../components/FormularioAnexo/index.jsx';

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<AdminLayout />}/>
                <Route path="/formulario-anexo" element={<FormularioAnexo />}/>
                <Route path="/hola" element={<div>Hola Arboledas</div>}/>


            </Routes>
        </BrowserRouter>
    )
}