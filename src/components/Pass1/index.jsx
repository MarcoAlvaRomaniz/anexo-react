// src/components/PasswordForm.jsx
import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Inicializar SweetAlert con soporte para React
const MySwal = withReactContent(Swal);

const PasswordForm = () => {
  const handlePasswordPrompt = () => {
    MySwal.fire({
      title: 'Ingresa tu contraseña',
      input: 'password',
      inputLabel: 'Contraseña',
      inputPlaceholder: 'Introduce la contraseña',
      inputAttributes: {
        maxlength: 10,
        autocapitalize: 'off',
        autocorrect: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Ingresar',
      cancelButtonText: 'Cancelar',
      preConfirm: (password) => {
        return new Promise((resolve) => {
          if (password === 'Laboratorio#') { // Cambia esta contraseña por la que quieras
            resolve();
          } else {
            Swal.showValidationMessage('Contraseña incorrecta');
          }
        });
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Si la contraseña es correcta, redirige al enlace
        window.location.href = 'https://tuenlace.com'; // Cambia por el link al que quieres redirigir
      }
    });
  };

  return (
    <div>
      <button onClick={handlePasswordPrompt}>Ingresar al Link</button>
    </div>
  );
};

export default PasswordForm;
