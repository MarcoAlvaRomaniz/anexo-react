import { useState } from 'react'
// import './App.css'


const useFetch = ()=>{
  const [opcionesSelect,setopcionesSelect] = useState()
  try {
    const opciones = [
      {
        id:1,
        opcion:'Esta es la opcion 1'
      },
      {
        id:2,
        opcion:'Esta es la opcion 2'
      },
      {
        id:3,
        opcion:'Esta es la opcion 3'
      }
      
    ]
    
    return { opcionesSelect:opciones }
  } catch (error) {
    console.log(error)
  }
}


function ListaDeseos(props ){

  const {dataList,handleSetDataList} =props
  
  const [concepto, setConcepto] = useState([])
  const [monto, setMonto] = useState([])

  const hanldeAdd = ()=>{
    console.log('Entramos al ADD')
    handleSetDataList([
      ...dataList,
      {
        concepto,monto
      }
    ])
  }

  return (
    <>
    <div className='bg-yellow-200 p-4 flex flex-col'>
    <label >Concepto
        <input type='text' name='concepto' onChange={(e)=>setConcepto(e.target.value)} />
      </label>
      <label >Monto
        <input type='number' name='monto' onChange={(e)=>setMonto(e.target.value)} />
      </label>

    

    <button className='bg-blue-300' onClick={hanldeAdd}>Guardar</button>
    </div>
       
    </>
  )
}


function App() {

  const [data,setData] = useState({
    nombre:'',
    edad:'',
    tipo:''
  })
  const [faltaData,setFaltaData] = useState({})
  const { opcionesSelect } = useFetch()
  const [toggle,setToggle] = useState(false)
  const [dataList, setDataList] = useState([])
  
 
  const handleSubmit = async(event)=>{
  event.preventDefault()
  console.log('DATA:',data)

  const vacio = {
   
  }
  for(let input in data){
    if(!data[input]){
      vacio[input]='vacio'
    }
  }
  console.log('IDENTIFICAR VACIOS',vacio)
  setFaltaData(vacio)

  if(Object.keys(vacio).length > 0){
    alert('TODOS LOS CAMPOS DEBEN SER LLENADOS')
    return
  }

  //ENVIAR A BD
  const objetoDb = {}
  objetoDb['datosCliente']= data
  objetoDb['productos']= dataList

  console.log('Datoas a enviar:')
  console.log(objetoDb)

  
  const {data} = await axios.post('url',objetoDb)
 
    



   
  }
  const handleChange = (event)=>{

    const { name , value} = event.target
    setData({
      ...data,
      [name]:value
    })

    
  }
  const handleView = ()=>{
    setToggle(!toggle)
  }
  const handleSetDataList = (newdata)=>{
    setDataList(newdata)
  }



return (

  <>
<form className='flex flex-col gap-3'>
    <label >Nombre
      <input type='text' name='nombre' onChange={handleChange} className={${faltaData.nombre ? 'error' :''} }/>
    </label>
    <label>edad
      <input type='number' name='edad' onChange={handleChange} className={${faltaData.edad ? 'error' :''} }/>
    </label>
    <label>tipo
      <select name='tipo' onChange={handleChange} className={${faltaData.tipo ? 'error' :''} }>
        <option value={''}>Seleciona</option>
        {opcionesSelect?.map((item,index)=>(
        <option key={${index}-opciones} value={item.id}>{item.opcion}</option>
        ))}
        
      </select>
    </label>
   

  </form>
  <button onClick={handleView} className='bg-blue-300 hover:bg-blue-500 shadow-sm rounded-sm p-2'>{toggle ? '':'NUEVO +'}</button>

  {toggle && ( <ListaDeseos dataList={dataList} handleSetDataList={handleSetDataList}/>) }
  <ul>
      {dataList?.map((item,index)=>(
        <li key={${index}-lista}>conceptop: {item.concepto} , precio {item.monto}</li>
      ))}
    </ul>
    <button onClick={handleSubmit}>ENVIAR</button>
 
  </>
  
)
}

export default App