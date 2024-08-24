//importacion de react
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import Swal from 'sweetalert2';
const Anexo = () =>{
    const [mostrarFormulario, setMostrarFormulario] = useState(true);
    const [anexosList, setAnexos] = useState([]);
    const [loading, setLoading]=useState(false);
    const [anexos, setAnexo] = useState({
        cotizacion:'',
        condiciones:'',
        razonSocial1:'',
        calle1:'',
        ciudad1:'',
        colonia1:'',
        estado1:'',
        cp1:'',
        pcalibracion:'',
        periodo:'',
        macaMonitor:'',
        modeloMonitor:'',
        serieMonitor:'',
        radiacionMonitor:'',
        unidadesMonitor:'',
        detertor1:'',
        marcaDetector1:'',
        modeloDetector1:'',
        conformidad:'',
        descripcion:'',
        razonSocal2:'',
        calle2:'',
        ciudad2:'',
        colonia2:'',
        estatado2:'',
        cp2:'',
        contacto:'',
        telefono:'',
        notas:'',
        ajuste:'',
        recibio:'',
        entrego:'',
        fechaRegistro:''
    })
    
    return(
        <div>
            <h2>Contenido el anexo</h2>
            <p>Es es el contenido del componente anexo.</p>
        </div>
    );
};

export default Anexo;
