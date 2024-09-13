import React from "react";
import axios from 'axios';
import Swal from "sweetalert2";
import Detectores from '../Detectores';
import { MdDeleteForever } from "react-icons/md";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './estilos.css';

export default function AnexoForm(){
    
    return(
        <>
        <div className="contenidos">
            <div className="card mx-auto">
                <div className="card-header">
                    Anexo Cotización
                </div>
                <div className="input-group mt-2">
                <span
                    className="input-group-text btn btn-warning"
                >
                    Cotización
                </span>
                <input 
                    name="cotizacion"
                    className="form-control"
                />
                 <span
                    className="input-group-text btn btn-warning"
                >
                    Fecha Anexo
                </span>
                <input 
                    name="fecha"
                    className="form-control"
                />
                <span
                    className="input-group-text btn btn-warning"
                >
                    condiciones Generales
                </span>
                <input 
                    name="condiciones"
                    className="form-control"
                />
            </div>
            </div>
            
            
        </div>
        <div className="card">
            <div className="card-header">
                Datos del Permisionario
            </div>
            <div className="card-body">
                <div className="input-group">
                    <span className="input-group-text btn btn-warning">Razón social</span>
                    <input 
                        className="form-control"
                        name="razonSocial"
                    />
                </div>
                <div className="input-group flex-nowrap">
                    <span className="input-group-text btn btn-warning">Dirección</span>
                    <input 
                        className="form-control"
                        name="direccion"
                    />
                </div>
            </div>
        </div>
        </>
    )
}