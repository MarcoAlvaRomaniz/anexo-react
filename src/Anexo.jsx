//importacion de react
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Detectores from './Detectores';
import TablaAnexos from './TablaRegistros';
import { MdDeleteForever } from "react-icons/md";
import {server} from './db/server.js';

import PDF from './components/PDF';
import FormularioAnexo from './components/FormularioAnexo/index.jsx';


const Anexo = () =>{
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mostrarDetector,setMostrarDetector] = useState(false);
    const [isEdit,setIsEdit] = useState(false);
    const [mostrarAnexos, setMostrarAnexos] = useState(true);
    const [refresh,setRefresh] = useState(false);
    const [id,setId] = useState(false);
    const[isPdf,setIsPdf] = useState(false);
    //este estado va hacia los detectores
    const [detectoresList, setDetectoresList] = useState([]);

    const [anexo, setAnexo] = useState({
        cotizacion:'',
        razonSocial1:''
    });
    
    const handleDeleteDetector =(indexDet)=>{
        //metodo splice que elimina el index y lo recorre uno
        const filtro = detectoresList.filter((_,index)=>index!=indexDet)
        //agregar filtro en el setDetectorlist
        setDetectoresList(filtro);
    }
    const resetearFormulario = ()=>{
        setDetectoresList([]);
        setAnexo({});
    }

    const editar1 = async(id)=>{
        try{
            const {data} = await axios.get(`${server}api/v1/anexos/${id}`)
            console.log(data);
            if(data.success){
                setAnexo(data.data)
                setDetectoresList(data.data.detectores)
                setIsEdit(true);
                setMostrarFormulario(true);
                setMostrarAnexos(false);
                setId(id);
            }
        }catch(error){console.error(error)}
    }
    const toggleDetector = () =>{
        if(detectoresList.length>2){
            Swal.fire(
                "Atencion","No se permiten mas de 3 detectores","warning"                
            )
            return;
        }
       setMostrarDetector(!mostrarDetector);
    }
    
    const addDetector=(nvoDetector)=>{
        setDetectoresList([...detectoresList,nvoDetector])
        setMostrarDetector(false);
    }
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setAnexo({...anexo,[name]:value});
        console.log(`${name}:${value}`)
    };

    const add = ()=>{
        if(anexo.cotizacion){
            axios.post(`${server}api/v1/anexos/`,{...anexo,detectores:detectoresList})
            .then(()=>{
                Swal.fire({
                    title:"<strong>Registro exitoso</strong>",
                    html:`<i>El anexo ${anexo.cotizacion} fué registrado con éxito</i>`,
                    icon:'success',
                    timer:1000
                });
                setRefresh(!refresh);
                setMostrarFormulario(false);
                setMostrarAnexos(true);
                limpiarCampos();
                
            });
        }else{
            alert("por favor ingrese el campo de cotizacion");
        }
    };
    const update=()=>{
        setIsEdit(false)        
        if(anexo.cotizacion){
            axios.patch(`${server}api/v1/anexos/${id}`,{...anexo,detectores:detectoresList})
            .then(()=>{
                Swal.fire({
                    title:"<strong>Actualizado !!!</strong>",
                    html:`<i>El registro de fue actualizado con exito</i>`,
                    icon:'success',
                    timer:1000
                });
                limpiarCampos();
                setMostrarFormulario(false);  
                setMostrarAnexos(true)  ;
                console.log(mostrarFormulario);
                setRefresh(!refresh);

            }).catch((error)=>{
                console.error("Error al actualiza el anexo",error);
            })
        }else{
            limpiarCampos();
            alert("Por favor verifique los campos necesarios");

        }
    };
    const limpiarCampos = () =>{
        setMostrarFormulario(false);
        setMostrarAnexos(true);
        resetearFormulario([]);
    };
    const editarAnexo = (val) => {
       
        setAnexo(val);
        setMostrarFormulario(true);
    };
    

    return(
        <div>
            <h2 className="fs-4">Contenido el anexo</h2>
            {/**botones para mostrar el formulario */}
            {!mostrarFormulario &&(
                <div className="mb-3">
                    <button 
                    onClick={()=>{setMostrarFormulario(true); setMostrarAnexos(false);}}
                    className="btn btn-info"
                    >
                        Nuevo
                    </button>
                </div>
            )}
            {mostrarFormulario && (
                <FormularioAnexo />

            )}
            {/**Listar anexos */}
            {mostrarAnexos &&  <TablaAnexos editar1={editar1} refresh={refresh}/>}
            
            <div>
            </div>
            
        </div>
    );
};

export default Anexo;
