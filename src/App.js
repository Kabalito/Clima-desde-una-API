import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {

  //state del formulario
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: '',
  })

  const [consultar, setConsultar] = useState(false)

  //state para almacenar el objeto de la API

  const [resultado, setResultado] = useState({})

  // estado para mostrar error segun respuesta de la api
  const [error, setError] = useState(false)

  // separando variables

  const {ciudad, pais} = busqueda

  useEffect(() =>{
    const consultarAPI = async ( ) => {
      if (consultar) {
        const appId = '0df47d4480a7794e711309b751b78b03';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultado(resultado);
        setConsultar(false);

        // funcion si hubo resultado en la consulta a la API

        if (resultado.cod ==="404"){
          setError(true)
        } else {
          setError(false)
        }
      }
    }
    consultarAPI()
    // eslint-disable-next-line
  }, [consultar])

let componente;
if(error){
  componente = <Error mensaje="no hay resultados" />
} else {
  componente = <Clima resultado={resultado} />
}


  return (
   <Fragment>
     <Header
      titulo='Clima React App'
     
     />
     <div className="contenedor-form">
       <div className="container">
         <div className="row">
           <div className="col m6 s12">
             <Formulario
             busqueda={busqueda}
             setBusqueda={setBusqueda}
             setConsultar={setConsultar}
             
             />
           </div>
           <div className="col m6 s12">
             {componente}
           </div>
         </div>
       </div>
     </div>
   </Fragment>

  );
}

export default App;
