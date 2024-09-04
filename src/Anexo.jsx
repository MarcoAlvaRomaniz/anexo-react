//importacion de react
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import Swal from 'sweetalert2';
import Detectores from './Detectores';
import { MdDeleteForever } from "react-icons/md";

const Anexo = () =>{
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mostrarDetector,setMostrarDetector] = useState(false);
    const [anexosList, setAnexos] = useState([]);
    const [isEdit,setIsEdit] = useState(false);
    const [id,setId] = useState(false);
    const [loading, setLoading]=useState(false);
    //este estado va hacia los detectores
    const [detectoresList, setDetectoresList] = useState([]);
    const [anexo, setAnexo] = useState({
        cotizacion:'',
        condiciones:'',
        razonSocial1:'',
        fechaAnexo:'',
        modeloMonitor:''
    });
    const handleDeleteDetector =(indexDet)=>{
        //metodo splice que elimina el index y lo recorre uno
        const filtro = detectoresList.filter((_,index)=>index!=indexDet)
        //agregar filtro en el setDetectorlist
        setDetectoresList(filtro);
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
       setMostrarDetector(!mostrarDetector);
       if(mostrarDetector === true){
        let txtDetector = "ocultar"
       }else{
        let txtDetector = "+"
       }
    }
    useEffect(()=>{
    getAnexos();
    },[]);
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
                getAnexos();
                limpiarCampos();
                setMostrarFormulario(false);
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
                getAnexos();
                limpiarCampos();
                setMostrarFormulario(false);
            }).catch((error)=>{
                console.error("Error al actualiza el anexo",error);
            })
        }else{
            limpiarCampos();
            getAnexos();
            alert("Por favor verifique los campos necesarios");

        }
    };
    const limpiarCampos = () =>{
        setMostrarFormulario(false);
    };
    const editarAnexo = (val) => {
       
        setAnexo(val);
        setMostrarFormulario(true);
    };
    const getAnexos = debounce(()=>{
        setLoading(true);
        axios.get("http://localhost:3000/api/v1/anexos/")
        .then((response)=>{
            
            const data = response.data.data;
            console.log("consulta de anexos")
            console.log(data);
            if(Array.isArray(data)){
                console.log("si fue un arreglo")
                setAnexos(data);
            }
            setLoading(false);
        }).catch((error)=>{
            setLoading(false);
            console.error("Error al obtener los anexos",error);
        })
    },200);

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
                        <span className="input-group-text btn btn-warning">Norma de referencia</span>
                        <input
                            className = "form-control"
                            placeholder='Escriba la norma de referencia'
                            name="norma"
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
                            value={anexo.razonSocial2}
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
            {loading ? <p>Cargando registros....</p>:(
                <div className="bitacora  ">
                    <table className="table  caption-top table-responsive table-striped">
                        <caption>Registros de Anexos</caption>
                        <thead className="encabezado">
                            <tr>
                                <th scope="col">
                                    Cotización
                                </th>
                                <th scope="col">
                                    Fecha
                                </th>
                                <th scope="col">
                                    Cliente
                                </th>
                                <th scope="col">Marca</th>
                                <th scope="col">Modelo</th>
                                <th scope="col">Serie</th>
                                <th scope="col">Acciones</th> 
                            </tr>
                                                  
                        </thead>
                        <tbody>
                            {anexosList.map((val)=>(
                                <tr key={val.id}>
                                    <td>{val.cotizacion}</td>
                                    <td>{val.fecha}</td>
                                    <td>{val.razonSocial}</td>
                                    <td>{val.marcaMonitor}</td>
                                    <td>{val.modeloMonitor}</td>
                                    <td>{val.serieMonitor}</td>
                                    <td>
                                        <div>
                                            <button className="btn btn-info"
                                                type="button"

                                                onClick={()=>editar1(val.id)}
                                            >
                                                editar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    
                </div>
            )}
        </div>
    );
};

export default Anexo;
