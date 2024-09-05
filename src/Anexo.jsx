//importacion de react
import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Swal from 'sweetalert2';
import Detectores from './Detectores';
import TablaAnexos from './TablaRegistros';
import { MdDeleteForever } from "react-icons/md";

import PDF from './components/PDF';


const Anexo = () =>{
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mostrarDetector,setMostrarDetector] = useState(false);
    const [isEdit,setIsEdit] = useState(false);
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
            const {data} = await axios.get(`http://localhost:3000/api/v1/anexos/${id}`)
            console.log(data);
            if(data.success){
                setAnexo(data.data)
                setDetectoresList(data.data.detectores)
                setIsEdit(true);
                setMostrarFormulario(true);
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
            axios.post("http://localhost:3000/api/v1/anexos/",{...anexo,detectores:detectoresList})
            .then(()=>{
                Swal.fire({
                    title:"<strong>Registro exitoso</strong>",
                    html:`<i>El anexo ${anexo.cotizacion} fué registrado con éxito</i>`,
                    icon:'success',
                    timer:1000
                });
                setRefresh(!refresh);
                setMostrarFormulario(false);
                limpiarCampos();
                
            });
        }else{
            alert("por favor ingrese el campo de cotizacion");
        }
    };
    const update=()=>{
        setIsEdit(false)        
        if(anexo.cotizacion){
            axios.patch(`http://localhost:3000/api/v1/anexos/${id}`,{...anexo,detectores:detectoresList})
            .then(()=>{
                Swal.fire({
                    title:"<strong>Actualizado !!!</strong>",
                    html:`<i>El registro de fue actualizado con exito</i>`,
                    icon:'success',
                    timer:1000
                });
                limpiarCampos();
                setMostrarFormulario(false);    
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
                    onClick={()=>{setMostrarFormulario(true)}}
                    className="btn btn-info"
                    >
                        Nuevo
                    </button>
                </div>
            )}
            {mostrarFormulario && (
                <div className="row g-3">
                    <div className="input-group">
                        <span className="input-group-text btn btn-dark" id="cotizacion">
                            Cotización:
                        </span>
                        <input
                            type="text"
                            name="cotizacion"
                            className="form-control"
                            placeholder="Excriba el número de cotización"
                            aria-label = "cotizacion"
                            aria-describedby='cotizacion'
                            onChange={handleChange}
                            value={anexo.cotizacion}
                        />

                        <span className="input-group-text btn btn-warning">
                            Fecha de Anexo
                        </span>
                        <input
                        className="form-control"
                        type ="date"
                        name="fecha"
                        aria-label = "fecha"
                        aria-describedby='fecha'
                        onChange={handleChange}
                        value={anexo.fecha}
                        />
                        
                    </div>
                    <div className="input-group">
                        <span className="input-group-text btn btn-warning" id="condiciones">
                            Condiciones Generales:
                        </span>
                        <input
                            type="text"
                            name="condiciones"
                            className="form-control"
                            placeholder="Excriba las condiciones generales"
                            aria-label = "condiciones"
                            aria-describedby='condiciones'
                            onChange={handleChange}
                            value={anexo.condiciones}
                        />                        
                    </div>
                    <h5>
                        Datos del permisionario
                    </h5>
                    <div className="input-group">
                        <span className="input-group-text btn btn-warning" id="condiciones">
                            Razón Social:
                        </span>
                        <input
                            type="text"
                            name="razonSocial"
                            className="form-control"
                            placeholder="Nombre completo de la Empresa o cliente"
                            aria-label = "razonSocial"
                            aria-describedby='razonSocial'
                            onChange={handleChange}
                            value={anexo.razonSocial}
                        />                        
                    </div>
                    <div className="input-group">
                        <span className="input-group-text btn btn-warning">Dirección</span>
                        <textarea
                        className="form-control"
                        name="direccion1"
                        onChange={handleChange}
                        value = {anexo.direccion1}
                        ></textarea>
                    </div>
                    <h5>
                        Información general y técnica de la calibración
                    </h5>
                    <div className="input-group">                    
                        <span className="input-group-text btn btn-warning" id="condiciones">
                            Próxima fecha de calibración:
                        </span>
                        <select
                            type="text"
                            name="proxima"
                            className="form-control"
                            aria-label="proxima"
                            aria-describedby="proxima"
                            onChange={handleChange}
                            value={anexo.proxima}
                            >
                            <option value = "">seleccione una opción según corresponda</option>
                            <option value = "si">si</option>
                            <option value = "no">no</option>
                        </select>
                        <span className="input-group-text btn btn-warning" id="condiciones">
                            Periodo de calibración:
                        </span>
                        <input
                            type="text"
                            name="periodo"
                            onChange={handleChange}
                            className="form-control"
                            placeholder='Escriba el periodo'
                            aria-label = "periodo"
                            aria-describedby='periodo'
                            value = {anexo.periodo}
                        />  
                    </div>
                    <h5>Monitor</h5>
                    <div className="input-group">
                        <span className="input-group-text btn btn-warning">
                            Marca
                        </span>
                        <input
                            className="form-control"
                            placeholder='ingrese la marca del monitor'
                            name="marcaMonitor"
                            aria-label="marcaMonitor"
                            aria-describedby='marcaMonitor'
                            onChange={handleChange}
                            value = {anexo.marcaMonitor}
                        />
                        <span className="input-group-text btn btn-warning">
                            Modelo
                        </span>
                        <input
                            className="form-control"
                            placeholder='ingrese el modelo del monitor'
                            name='modelo'
                            onChange={handleChange}
                            value={anexo.modelo}
                        />
                        <span className="input-group-text btn btn-warning">
                            No. Serie
                        </span>
                        <input
                            className="form-control"
                            placeholder='ingrese la marca del monitor'
                            name="serieMonitor"
                            aria-label="serieMonitor"
                            aria-describedby='serieMonitor'
                            onChange={handleChange}
                            value = {anexo.serieMonitor}
                        />
                    </div>
                    <h5>
                        Detector o detectores
                    </h5>
                    <div className="input-group">
                    <button className="btn btn-success"
                        onClick={toggleDetector}
                    >
                        {mostrarDetector? 'Ocultar':'+'}
                    </button>                    
                    </div>
                    {mostrarDetector && (
                        <Detectores  
                        detectoresList = {detectoresList}
                        addDetector = {addDetector}
                         />)}
                    <div className="bitacora">
            <table className="table  caption-top table-responsive table-striped">
                <thead >
                    <tr className = "text-center">
                        <th>Tipo</th>
                        <th>Marca Detector</th>
                        <th>Modelo Detector</th>
                        <th>Serie</th>
                        <th>Radiacion</th>
                        <th>Unidades</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {detectoresList?.map(
                        (item,index)=>(
                        <tr className="text-center" key={`${index}-det`}>
                            <td>{item.tipo}</td>
                            <td>{item.marca}</td>
                            <td>{item.modelo}</td>
                            <td>{item.serie}</td>
                            <td>{item.radiacion}</td>
                            <td>{item.unidades}</td>
                            <td className="text-[20px] flex justify-center cursor-pointer" style={{
                                color:'red',
                                textAlign:"center"  
                            }}><MdDeleteForever
                                onClick={()=>handleDeleteDetector(index)}
                            /></td>
                        </tr>)

                    )}
                </tbody>
            </table>
        </div>
                    
                    


                    <div className="input-group">
                        <spam className="input-group-text btn btn-warning">
                            Conformidad:
                        </spam>
                        <select className="form-control"
                            name="conformidad"
                            aria-label="conformidad"
                            aria-describedby='conformidad'
                            onChange={handleChange}
                            value={anexo.conformidad}
                        >
                        <option value="">Seleccione una opcion</option>
                        <option value ="si">Si</option>
                        <option value="no">No</option>
                        </select>
                    </div>                    
                    <div className="input-group">
                        <span className="input-group-text bg-yellow-500">
                            Descripción
                        </span>
                        <textarea
                            className="form-control"
                            placeholder='Ingrese la Descripción de la declaración de la conformidad y norma de referencia.'

                            name="descripcion"
                            onChange={handleChange}
                            value={anexo.descripcion}
                        ></textarea>

                    </div>
                    <div className="input-group">
                        <span className="input-group-text btn btn-warning">Norma de referencia</span>
                        <input
                            className = "form-control"
                            placeholder='Escriba la norma de referencia'
                            name="norma"
                            onChange={handleChange}
                            aria-label='norma'
                            aria-describedby='norma'
                            value={anexo.norma}
                        />
                    </div>
                    <h5>
                        Dirección de entrega
                    </h5>
                    <div className="input-group">
                        <span className="input-group-text btn btn-warning">Razón Social</span>
                        <input
                            className = "form-control"
                            placeholder='Razon social a donde se entrega'
                            name="razoSocial2"
                            aria-label='razonSocial2'
                            onChange={handleChange}
                            value={anexo.razoSocial2}
                        />
                    </div>
                    <div className="input-group">
                        <span className="input-group-text btn btn-warning">Dirección Entrega</span>
                        <textarea
                            className="form-control"
                            name="direccion2"
                            onChange={handleChange}
                            value={anexo.direccion2}
                        ></textarea>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text btn btn-warning">Ajuste</span>
                        <select
                            className="form-control"
                            name="ajuste"
                            onChange={handleChange}
                            value={anexo.ajuste}
                        >
                            <option value="">selecciones una opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text btn btn-warning" id="contacto">Atención a</span>
                        <input 
                            className="form-control"
                            name="contacto"
                            aria-label='contacto'
                            aria-describedby='contacto'
                            placeholder='Escribe el nombre del contacto'
                            onChange={handleChange}
                            value={anexo.contacto}
                        />
                        <span className="input-group-text btn btn-warning">
                            Teléfono(s);                            
                        </span>
                        <input 
                            className="form-control"
                            name="telefono"
                            aria-label='telefono'
                            aria-describedby='telefono'
                            placeholder='Escriba el telefon del contacto'
                            onChange={handleChange}
                            value={anexo.telefono}
                        />
                    </div>
                    <div className="input-group">
                        <span className="input-group-text btn btn-info">
                            Notas
                        </span>
                        <textarea
                            className="form-control"
                            name="notas"
                            aria-label='notas'
                            placeholder='Escriba las notas del anexo adicionales'
                            aria-describedby='notas'
                            onChange={handleChange}
                            value={anexo.notas}
                        />
                    </div>
                    <div>                        
                       {!isEdit && ( <button 
                        className="btn btn-success"
                        onClick={add}
                        >
                            Guardar
                        </button>)}
                        {isEdit && ( <button 
                        className="btn btn-success"
                        onClick={update}
                        >
                            Guardar
                        </button>)}
                        <button
                            className = "btn btn-danger"
                            onClick={limpiarCampos}

                        >Cancelar</button>
                    </div>


                </div>

            )}
            {/**Listar anexos */}
            <TablaAnexos editar1={editar1} refresh={refresh}/>
            <div>
            </div>
            
        </div>
    );
};

export default Anexo;
