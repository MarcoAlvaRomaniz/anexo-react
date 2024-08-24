//importacion de react y hook el cual nos permite poner un estado al componente
import React from "react";
import './Sidebar.css';
//definicion del componente sidebar
const Sidebar = ({isOpen, toggleSidebar, toggleAnexo}) =>{
    //codigo de reenderizado
    return (
        <div className={`sidebar ${isOpen ? 'open':'closed'}`}>
            <div className="sidebar-header">
                
                <button onClick={toggleSidebar}>
                    {isOpen ? 'Ocultar' : 'Mostrar'} 
                </button>
            </div>
            {isOpen && (
                <div className="sidebar-content">
                    {/**Elementos del menu */}
                    <ul className="list-menu">
                        <li>
                            <button onClick={toggleAnexo}>
                                Anexos
                            </button>
                        </li>
                    </ul>
                </div>
            )}

        </div>
    )
};

export default Sidebar;