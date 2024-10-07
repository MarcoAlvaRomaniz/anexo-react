import React, {useState, useEffect} from 'react';
import {Link, Navigate} from "react-router-dom"
import axios from 'axios';
import Swal from 'sweetalert2';
import Detectores from './../../Detectores.jsx';
import {server} from './../../db/server.js';
import { useParams } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import './estilos.css';

export default function FormularioAnexo(){
    const {id} = useParams();
    const navegar = useNavigate();
    const [mostrarDetector,setMostrarDetector] = useState(false);
    const [detectoresList, setDetectoresList] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [anexo, setAnexo] = useState({
        cotizacion:'',
        razonSocial1:''
    });
    useEffect(()=>{
        console.log("Entrando a formulario")
        console.log(`el id es ${id}`);
        if(id==='new'){
            setIsEdit(false);

        }else{
            setIsEdit(true);
            editar1(id);

        }

    },[]);
    const limpiarCampos = () =>{
        
        resetearFormulario([]);
        navegar('/');


    };
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
                setMostrarAnexos(true);
                limpiarCampos();
                
            });
        }else{
            alert("por favor ingrese el campo de cotizacion");
        }
    };
    const handleDeleteDetector =(indexDet)=>{
        //metodo splice que elimina el index y lo recorre uno
        const filtro = detectoresList.filter((_,index)=>index!=indexDet)
        //agregar filtro en el setDetectorlist
        setDetectoresList(filtro);
    }
    const update=()=>{
        setIsEdit(true)        
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
    const editarAnexo = (val) => {
       
        setAnexo(val);
    };
    return(
            <div className="p-[25px] flex flex-column gap-2 w-[90%] justify-center m-auto">
                
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
                <h5 className="font-semibold">
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
                <h5 className="font-bold">
                    Información general y técnica de la calibración
                </h5>
                <div className="text-justify p-2">
                    La norma NOM-012-NUCL, nos indica en el punto 4.2 que la calibración de los instrumentos de medición de radiación ionizante, de medición de contaminación superficial y los dosímetros de lectura directa, debe efectuarse por lo menos una vez al año, salvo que en otras Normas Oficiales Mexicanas y demás disposiciones aplicables en la materia se establezca una periodicidad menor.
                </div>
                <div className="text-justify p-2">
                    El cliente requiere que en el certiﬁcado y etiqueta aparezca la fecha de la próxima calibración recomendada
                </div>

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
                    <select
                        name="periodo"
                        onChange={handleChange}
                        className="form-control"
                        aria-label = "periodo"
                        aria-describedby='periodo'
                        value = {anexo.periodo}
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="1 año">1 año</option>
                        <option value="6 meses">6 meses</option>
                    </select>
                </div>
                <div className="text-justify p-2">
                    El cliente con esta cotización autoriza la calibración de los intervalos de su equipo, que esten dentro del alcance del laboratorio.
                </div>
                <h5 className="font-bold">Monitor</h5>
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
                <h5 className="font-bold">
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
                    
                    

        <h5 className="font-bold">DECLARACIÓN DE CONFORMIDAD</h5>
        <div>
            ¿Requiere declaración de conformidad?
        </div>
        <div className="input-group">
            <span className="input-group-text btn btn-warning">
                Conformidad:
            </span>
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
        <div>   
            Descripción de la declaración de la conformidad y norma de referencia
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
        <h5 className="font-bold">
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
            <h5>
                Revisión de la capacidad del laboratorio para la realización del servicio
            </h5>
            <div>
                Para brindar el servicio, el laboratorio cuenta con:
            </div>
            
        </div>
        <h5 className="font-bold">
            Condiciones de servicio
        </h5>
        <div className="text-justify p-2" >
            <ul className="space-y-2 list-disc list-inside">
                <li>
                    El servicio de calibración incluye la entrega del certiﬁcado y el análisis de Incertidumbre de Medida de la Calibración
                </li>
                <li>
                    El Intervalo de Medida de la Calibración es de acuerdo a la deﬁnición NMX-Z-055 vigente.
                </li>
                <li>
                    Calibración: Es la “Operación que establece, bajo las condiciones especiﬁcadas, en una primera etapa, una relación entre los valores y las    incertidumbres de medición provistas por patrones y las indicaciones correspondientes con las incertidumbres asociadas; en una segunda etapa,     utiliza ésta información para establecer una relación buscando la obtención de un resultado de medición a partir de una indicación”.
                </li>
                <li>    
                    El Laboratorio calibrará el equipo del cliente en los intervalos que estén dentro de nuestro alcance y de los que el equipo permita dependiendo de su funcionamiento y en caso de no calibrar algún intervalo, se emitirá una carta indicando el motivo del porque no se calibró dicho intervalo.
                </li>
            </ul>
        </div>
        <div>
            En caso de que aplique, ¿Autoriza el ajuste?
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

       <div className="p-2">
        <h5 className="font-bold">
            Documentos de soporte
        </h5>
        <p>
            <a className="text-blue-800" href="https://docsir.siradiacion.com.mx/DO-LAB-03%20CARTA%20DE%20TRAZABILIDAD.PDF" target='_blank'>
                Carta de trazabilidad, Acreditación y Capacidad de medición y calibración en servicios acreditados (CMC) | VER MÁS
            </a>
        </p>
       </div>
       <div className="p-2">
        <h5 className="font-bold">
            Servicios Integrales para la Radiación S.A. de C.V. pone a su disposición:
        </h5>
        <p>
            <a className="text-blue-800" href="https://siradiacion.com.mx/metrologia/acreditacion-ema-a-c/" target='_blank'>
                Nuestro Laboratorio de Calibración Acreditado por la ema a.c. con número de acreditado RDI-01. | VER MÁS
            </a>
        </p>
       </div>
       <div className="p-6">
        <ul className="list-[lower-alpha]">
            <li>
                Al concluir el servicio se coloca al instrumento de medida una etiqueta de calibración para identiﬁcar su estado metrológico.
            </li>
            <li>
                El certificado incluye la fecha de calibración.
            </li>
            <li>
                La presente cotización fué realizada con base en la información proporcionada por el cliente. De existir alguna modiﬁcación diferente al momento de recibir el instrumento o la realización del servicio, el precio acordado puede ser modiﬁcado conforme a las características inherentes del instrumento de medida
            </li>
        </ul>
       </div>
        <div className="p-4">
            Conozca nuestro aviso de privacidad <a href="https://siradiacion.com.mx/nuestras-politicas/" target='_blank' className="
            bg-yellow-600 
            hover:bg-yellow-400
            text-white 
            font-bold 
            py-2 
            px-4 
            rounded-[30px]
            shadow-lg 
            hover:shadow-xl 
            transition-shadow">AQUI</a>
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

    )
}