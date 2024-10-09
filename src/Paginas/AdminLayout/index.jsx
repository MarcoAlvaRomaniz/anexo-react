import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom"
import TablaAnexos from "../../Views/TablaAnexos";
import FormularioAnexo from "../../components/FormularioAnexo";
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcom from "../../components/Welcom";
import { GrTable } from "react-icons/gr";
import Swal from 'sweetalert2';


export default function AdminLayout(){
    const navigate = useNavigate();//hook para redirigir manualmente

    const handleTablaAcess = (e) =>{
        e.preventDefault();
        //Mostrar Sweetalert2 para solicitar la contraseña
        Swal.fire({
            title:'Ingresa tu contraseña',
            input:'password',
            inputLabel:'Contraseña',
            inputPlaceholder:'Introduce la contraseña',
            inputAtributes:{
                maxLength:10,
                autocapitalize:'off',
                autocorrect:'off'
            },
            showCancelButton: true,
            confirmButtonText:'ingresar',
            cancelButtonText:'Cancelar',
            preConfirm:(password) =>{
                return new Promise((resolve) =>{
                    if(password ==='Laboratorio#'){
                        resolve();
                    }else{
                        Swal.showValidationMessage('Contraseña incorrecta');
                    }
                });
            }
        }).then((result)=>{
            if(result.isConfirmed){
                navigate('tabla-anexos');
            }
        });
    };
    
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
                onClick={handleTablaAcess}//se ejecuta al hacer click
            >
                
                Tabla
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