import React, {useState, useEffect} from "react";
import axios from "axios";
import {debounce} from "lodash";
import Swal from "sweetalert2";



function Detectores(promps){
const {detectoresList, addDetector} = promps
const [loading, setLoading] = useState(false);

const [tipo,setTipo] = useState("");
const [marca,setMarca] = useState("");
const [modelo,setModelo] = useState("");
const [serie,setSerie] = useState("");
const [radiacion,setRadiacion] = useState("");
const [unidades,setUnidades] = useState("");

const guardarDetector=()=>{
    if(!tipo || !marca || !modelo || !serie || !radiacion || !unidades ){
        alert("Todos los campos deben ser llenados del detector");
        return;
    }
    const obj2 = {
        tipo,
        marca,
        modelo,
        serie,
        radiacion,
        unidades
    }
    console.log(obj2)
    addDetector(obj2);
    setTipo('');
    setMarca('');
    setModelo('');
    setSerie('');
    setRadiacion('');
    setUnidades('');
}
return(
    <>
        <div className="bitacora">
                        

            <div className="input-group">
                <span className="input-group-text btn btn-secondary">Tipo</span>
                <select
                    className="form-control"
                    name="tipoDetector"
                    onChange={(e)=>setTipo(e.target.value)}
                    value = {tipo}
                >
                    <option value="">Seleccione una opción</option>
                    <option value="interno">Interno</option>
                    <option value="externo">Externo</option>
                    <option value="na">NA</option>

                </select>
                <span className="input-group-text btn btn-secondary">Marca Detector</span>
                <input
                    className="form-control"
                    name="marcaDetector"
                    onChange={(e)=>setMarca(e.target.value)}
                    value = {marca}
                />
                <span className="input-group-text btn btn-secondary">Modelo Detector</span>
                <input className="form-control"
                    name="modeloDetector"
                    onChange={(e)=>setModelo(e.target.value)}
                    value = {modelo}
                />
                <span className="input-group-text btn btn-secondary">Serie Detector</span>
                <input
                    className="form-control"
                    name="serieDetector"
                    onChange={(e)=>setSerie(e.target.value)}
                    value = {serie}
                />
            </div>
            <br/>
            <div className="input-group">
                <span className="input-group-text btn btn-secondary">Tipo de Radiación</span>
                <select className="form-control"
                    name="radiacion"
                    onChange={(e)=>setRadiacion(e.target.value)}
                    value = {radiacion}
                >
                    <option value="">Seleccione una opción</option>
                    <option>Gamma</option>
                    <option>Neutrones</option>
                </select>
                <span className="input-group-text btn btn-secondary">Unidades;</span>                            
                <select className = "form-control"
                    name="unidadesDetector"
                    onChange={(e)=>setUnidades(e.target.value)}
                    value = {unidades}
                >
                    <option value="">Selecciones una opción</option>
                    <option value="mR/h">mR/h</option>
                    <option value="mrem/h">mrem/h</option>
                    <option value="µSv/h">µSv/h</option>
                    <option value="mSv/h">mSv/h</option>
                    <option value="µR/h">µR/h</option>
                    <option value="CPM">CPM</option>
                    <option value="CPS">CPS</option>
                    <option value="mR">mR</option>
                    <option value="µSv">µSv</option>

                </select>
            </div>
            <div>
                <button className="btn btn-dark"
                onClick={guardarDetector}
                >
                    Guardar
                </button>
            </div>


        </div>
        
    </>

)
}
export default Detectores;