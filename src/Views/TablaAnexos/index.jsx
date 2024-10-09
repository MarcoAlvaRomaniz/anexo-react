
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { pdf, PDFDownloadLink } from '@react-pdf/renderer';
import { FaFilePdf } from "react-icons/fa6";
import PDF from './../../components/Pdf';
import {server} from './../../db/server';
import './styles.css';
import { LuFileEdit } from "react-icons/lu";



export default function TablaAnexos(promps){
    const [anexos, setAnexos] = useState([]);
    const [loading, setLoading]=useState(false);
    const [anexosFiltrados,setAnexosFiltrados] = useState([]);
    const {editar1, refresh} = promps;
    const navegador = useNavigate();

    const handleEdit = (id)=>{
        
        navegador(`/formulario-anexo/${id}`)

    }
    useEffect(()=>{
        console.log(refresh)
        getAnexos();
    },[refresh])
const filtrar = (palabra) => {
  const palabraFiltrada = palabra.trim().toLowerCase(); // Eliminar espacios y poner en minúsculas
  console.log(palabraFiltrada);

  setAnexosFiltrados(anexos.filter((item) => {
    // Manejo de null o undefined en las propiedades
    const razonSocial = item.razonSocial ? item.razonSocial.toLowerCase() : '';
    const serieMonitor = item.serieMonitor ? item.serieMonitor.toLowerCase() : '';
    const marcaMonitor = item.marcaMonitor ? item.marcaMonitor.toLowerCase() : '';

    return (
      razonSocial.includes(palabraFiltrada) ||
      serieMonitor.includes(palabraFiltrada) ||
      marcaMonitor.includes(palabraFiltrada)
    );
  }));
};
    const abrePDF = async (id) => {
    try {
        const { data } = await axios.get(`${server}api/v1/anexos/${id}`);
        if (data.success) {
            const selectedAnexo = data.data;
            const pdfContent = (
                <PDF anexo={selectedAnexo} detectoresList={selectedAnexo.detectores} />
            );

            const pdfBlob = await pdf(pdfContent).toBlob();

            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `anexo_${selectedAnexo.razonSocial}_${selectedAnexo.serieMonitor}.pdf`;
            link.click();
            URL.revokeObjectURL(url);
        }
    } catch (error) {
        console.log(error);
    }
};
const getAnexos = debounce(()=>{
        setLoading(true);
        axios.get(`${server}api/v1/anexos/`)
        .then((response)=>{
            
            const data = response.data.data;
            console.log("consulta de anexos")
            console.log(data);
            if(Array.isArray(data)){
                console.log("si fue un arreglo")
                setAnexos(data);
                setAnexosFiltrados(data);
            }
            setLoading(false);
        }).catch((error)=>{
            setLoading(false);
            console.error("Error al obtener los anexos",error);
        })
    },200);

    return(
        <>
            {loading ? <p>Cargando registros....</p>:(
                
            
            <div className="bitacora  ">
            <div className="input-group">
            <span className="input-group-text">Buscar...</span>
            <input
                className="form-control"
                onChange={(e)=>filtrar(e.target.value)}
            />
            </div>
                <table className="table  caption-top table-responsive table-striped">
                    <caption>Registros de Anexos</caption>
                    <thead className="encabezado">
                        <tr>
                            <th scope="col">
                                Cliente
                            </th>
                            <th scope="col">
                                Cotización
                            </th>
                            <th scope="col">
                                Fecha
                            </th>
                            <th scope="col">Marca</th>
                            <th scope="col">Modelo</th>
                            <th scope="col">Serie</th>
                            <th scope="col">Acciones</th> 
                        </tr>
                                                
                    </thead>
                    <tbody>
                        {anexosFiltrados.map((anexo)=>(
                            <tr key={anexo.id}>
                                <td>{anexo.razonSocial}</td>
                                <td>{anexo.cotizacion}</td>
                                <td>{anexo.fecha}</td>
                                <td>{anexo.marcaMonitor}</td>
                                <td>{anexo.modelo}</td>
                                <td>{anexo.serieMonitor}</td>
                                <td>
                                    <div className="flex justify-normal">
                                        {/* <button className="text-blue-900 text-[20px] cursor-pointer p-2"
                                            type="button"

                                            onClick={()=>handleEdit(anexo.id)}
                                        >
                                            <LuFileEdit />
                                        </button> */}
                                        <button className="text-red-600 block text-[20px] justify-center cursor-pointer p-2"
                                            onClick={()=>abrePDF(anexo.id)}
                                        >
                                            <FaFilePdf />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
                
            </div>
            )}
        </>
        
    )
} 