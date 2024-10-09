import { FaRegSquare } from "react-icons/fa";
import {

    Document,
    Text,
    Page,
    StyleSheet,
    Image,
    View,
    Link,
} from '@react-pdf/renderer'
import logo from './../../assets/EncabezadoAnexo.png';
import footer from './../../assets/Pie.png';

const numeroPagina = (pageNumber, totalPage)=>{

}
const styles = StyleSheet.create({
    page:{
        padding:110,
        paddingBottom:40,
        fontSize:9,
        lineHeight:1.5,
        paddingHorizontal:20,
    },
    section:{
        marginBottom:5,
    },
    section4:{
      backgroundColor:'#f4f4f4',
      padding:'2px',
    },
    titulo10:{
      textAlign:'center',
    },
    fecha:{
      textAlign:'rigth',
    },
    title:{
        fontSize:10,
        marginBottom:11,
        fontWeight:700,
    },
    subtitle:{
        fontSize:10,
        marginBottom:8,
        marginTop:10,
        fontWeight: 'bold',
    },
    tableHeader:{
        flexDirection:'row',
        backgroundColor:'#c4c4c4',
        padding:1,
        fontWeight:'bold',
    },
    tableRow:{
      flexDirection:'row',
      padding:1,
      fontWeight:'bold',
      borderCollapse: 'collapse',
    },
    tableCell:{
      flex:1,
      textAlign:'center',
      padding:1,
      fontSize:8,
    },
    
    tableCell2:{
      flex:1,
      textAlign:'center',
      padding:'0.5px',
      fontSize:7,
    },
    cuadrito:{
      border:"2px solid #000",
      display:"block",
      width:"10px",
      height:"10px",
      textAlign:'center',
      marginLeft:'5px',
    },
    
    cuadrito2:{
      display:"block",
      textAlign:'center',
      marginLeft:'5px',
      width:"11px",
      height:"15px",
    },
    tableCell3:{
      flex:2,
      textAlign:'left',
      padding:'0.3 px',
      fontSize:7,
    },
    title2:{
        fontSize:12,
        textAlign:'center',

    },
    text:{
        fontSize:8,
        flexDirection:'row',
        marginBottom:10,

    },
    header:{
        position:'absolute',
        top:5,
        left:0,
        right:0,
        textAlign:'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    footer: {
      position: 'absolute',
      bottom: 5, // Fijar en la parte inferior de la página
      left: 0,
      right: 0,
      fontSize: 9,
      padding:"5 20",
    },
    titleSection:{
        fontSize:15,
        textAlign:'center',
        fontWeight:'bold',
        textTransform:'uppercase',
        marginBottom:20,
    },
    parrafo:{
        textAlign:'justify',
        fontSize:8,
        marginBottom:8,

    },
    notita:{ 
      color:'#f4f4f4',
      fontSize:9,

    },
    section2:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10,

    },
    
    section3:{
        display:'flex',
        flexDirection:'row',
        position:'absolute',
        bottom:60,
        padding:"5 10",
        left:15,
        width:"100%",
    },
    textIzquierda:{
      width: '45%', // Anchura ajustada
      textAlign: 'left',
      margin:'auto',
    },
    textDerecha:{
      width: '45%',
    textAlign: 'right',
    margin:'auto',
    },
    link: {
    fontSize: 9,
    color: 'blue',
    textDecoration: 'underline',
  },
  respuestas:{
    color: 'blue',
  },


})
const PDF = ({ anexo, detectoresList }) => (
  <Document>
    <Page style={styles.page} size = "Letter">
      <View style={styles.header}>
        <Image src={logo} style={styles.logo} />
      </View>
      <View style={styles.section}>
        <Text style={styles.title2}>Anexo a la cotización</Text>        
      </View>
      <View style={styles.section2}>
        <Text style={styles.textIzquierda}>No. de cotización: <Text style={styles.respuestas}>{anexo.cotizacion} </Text></Text>
        <Text style={styles.textDerecha}>Fecha de Anexo: <Text style={styles.respuestas}>{anexo.fecha}</Text></Text>
      </View>
      <View style={styles.section}>
      <Text>Condiciones Generales: <Text style={styles.respuestas}>{anexo.condiciones}</Text></Text>
        <Text style={styles.subtitle}>
          DATOS DEL PERMISIONARIO
        </Text>
        <Text>Razón Social: <Text style={styles.respuestas}>{anexo.razonSocial}</Text></Text>
        <Text>Dirección: <Text style={styles.respuestas}>{anexo.direccion1}</Text></Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>INFORMACIÓN GENERAL Y TÉCNICA DE LA CALIBRACIÓN</Text>
        <Text style={styles.parrafo}>
          La norma NOM-012-NUCL, nos indica en el punto 4.2 que la calibración de los instrumentos de medición de radiación ionizante, de medición de contaminación superficial y los dosímetros de lectura directa, debe efectuarse por lo menos una vez al año, salvo que en otras Normas Oficiales Mexicanas y demás disposiciones aplicables en la materia se establezca una periodicidad menor.
        </Text>
        <Text style={styles.parrafo}>
          El cliente requiere que en el certificado y etiqueta aparezca la fecha de la próxima calibración recomendada, la respuesta fue:  <Text style={styles.respuestas}>{anexo.proxima}</Text>.
        </Text>
        <Text style={styles.parrafo}>
          En caso de que el periodo sea diferente a la recomendada, favor de indicarlo.  <Text style={styles.respuestas}>{anexo.periodo}</Text>.          
        </Text>
        <Text style={styles.parrafo}>El cliente con esta cotización autoriza la calibración de los intervalos de su equipo, que estén dentro del alcance del laboratorio.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Monitor</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.tableCell}>Marca</Text>
          <Text style={styles.tableCell}>Modelo</Text>
          <Text style={styles.tableCell}>Serie</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{anexo.marcaMonitor}</Text>
          <Text style={styles.tableCell}>{anexo.modelo}</Text>
          <Text style={styles.tableCell}>{anexo.serieMonitor}</Text>
        </View>
      </View>
      {/**Información tecnica */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Detectores</Text>
        <View style={styles.tableHeader}>  
          <Text  style={styles.tableCell}>Tipo</Text>
          <Text style={styles.tableCell}>Marca</Text>
          <Text style={styles.tableCell}>Modelo</Text>
          <Text style={styles.tableCell}>Serie</Text>
          <Text style={styles.tableCell}>Radiación</Text>
          <Text style={styles.tableCell}>Unidades</Text>
        </View>
        {detectoresList.map((detector, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.tableCell}>{detector.tipo}</Text>
          <Text style={styles.tableCell}>{detector.marca}</Text>
          <Text style={styles.tableCell}>{detector.modelo}</Text>
          <Text style={styles.tableCell}>{detector.serie}</Text>
          <Text style={styles.tableCell}>{detector.radiacion}</Text>
          <Text style={styles.tableCell}>{detector.unidades}</Text>
        </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>DECLARACIÓN DE CONFORMIDAD</Text>
        <Text style={styles.parrafo}>
          ¿Requiere declaración de conformidad?    <Text style={styles.respuestas}>{anexo.conformidad || 'Sin Dato'}</Text>
          </Text>
        <Text>Descripción de la declaración</Text>
        <Text style={styles.respuestas}>  {anexo.descripcion || 'Dato no proporcionado.'}</Text>
        <Text>Norma de Referencia</Text>
        <Text style={styles.respuestas}>   {anexo.norma || 'no se proporciono dato'}</Text>
      </View>
      {/**Datos del anexo despues de lista de monitores */}
      <View style={styles.footer}>  
      <Image src={footer}  />
        <View style={styles.section3}>          
          <Text render={({pageNumber, totalPages})=>`Página ${pageNumber} de ${totalPages}`} style={styles.textIzquierda}/>
          <Text style={styles.textDerecha}>FO-VEN-13, Rev.9</Text>

        </View>        
      
      
      </View>
    </Page>   
    <Page style={styles.page} size = "Letter">
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
        </View>
        
      <View style={styles.section}>
        <Text style={styles.subtitle}>
          Dirección de entrega
        </Text>
        <Text>Razón Social: <Text style={styles.respuestas}>{anexo.razoSocial2 || ' Sin Datos'}</Text></Text>
        <Text>Dirección: <Text style={styles.respuestas}>{anexo.direccion2 || ' No se proporcionó una dirección'}</Text></Text>    
        <Text>
          Atención a: <Text style={styles.respuestas}>{anexo.contacto || 'S/D'}</Text> Telefono:<Text style={styles.respuestas}>{anexo.telefono || 'S/D'}</Text>
        </Text>    
      </View>
      <View style={styles.section}>
      <Text style={styles.subtitle}>
        CONDICIONES DE SERVICIO
      </Text>
        <Text style={styles.parrafo}>
            El servicio de calibración incluye la entrega del certificado y el análisis de Incertidumbre de Medida de la Calibración.
        </Text>
        <Text style={styles.parrafo}>
           El Intervalo de Medida de la Calibración es de acuerdo a la definición NMX-Z-055 vigente.
        </Text>
        <Text style={styles.parrafo}>
          Calibración: Es la “Operación que establece, bajo las condiciones especificadas, en una primera etapa, una relación entre los valores y las incertidumbres de medición provistas por patrones y las indicaciones correspondientes con las incertidumbres asociadas; en una segunda etapa, utiliza esta información para establecer una relación buscando la obtención de un resultado de medición a partir de una indicación”.
        </Text>
        <Text style={styles.parrafo}>
          El Laboratorio calibrará el equipo del cliente en los intervalos que estén dentro de nuestro alcance y de los que el equipo permita dependiendo de su funcionamiento y en caso de no calibrar algún intervalo, se emitirá una carta indicando el motivo del porque no se calibró dicho intervalo.
        </Text>
        <Text style={styles.parrafo}>
          El ajuste no es intrínseco de la calibración, si el equipo lo requiere y permite, el laboratorio lo realizará siempre y cuando cuente con el software adecuado.
        </Text>
        <Text>  EN CASO DE QUE APLIQUE, ¿AUTORIZA EL AJUSTE?:    <Text style={styles.respuestas}>{anexo.ajuste || 'Dato no proporcionado'}</Text></Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>
          DOCUMENTOS DE SOPORTE
        </Text>

        <Link src="https://siradiacion.com.mx/metrologia/acreditacion-ema-a-c/" style={styles.link}>
          Carta de trazabilidad, Acreditación y Capacitación de medición y calibración en servicios acreditados (CMC) | VER MÁS
        </Link>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>
          SERVICIOS INTEGRALES PARA LA RADIACIÓN S.A. DE C.V. PONE A SU DISPOSICIÓN:
        </Text>

        <Link src="https://siradiacion.com.mx/metrologia/acreditacion-ema-a-c/" style={styles.link}>
          Nuestro Laboratorio de Calibración Acreditado por la ema a.c. con número de acreditado RDI-01 | VER MÁS
        </Link>
        <Text style={styles.parrafo}>a- Al concluir el servicio se coloca al instrumento de medida una etiqueta de calibración para identificar su estado metrológico. 
        </Text>
        <Text style={styles.parrafo}>b- El certificado incluye la fecha de calibración. 
        </Text>
        <Text style={styles.parrafo}>c- La presente cotización fué realizada con base en la información proporcionada por el cliente. De existir alguna modificación diferente al momento de recibir el instrumento o la realización del servicio, el precio acordado puede ser modificado conforme a las características inherentes del instrumento de medida.
        </Text>
        <Text>
          Conozca nuestro aviso de privacidad <Link src="https://siradiacion.com.mx/nuestras-politicas/">Aquí</Link>
        </Text>
      </View>
      {/**Notas adicionales */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>
          Notas
        </Text>
        <Text style={styles.respuestas}>{anexo.notas || 'No se han agregado notas adicionales'}</Text>
      </View>
       

      <View style={styles.section4}>
        <Text style={styles.titulo10}>
          Uso exclusivo para Servicios Integrales para la Radiación
        </Text>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell3}>
          Personal suficiente y capacitado para realizar el trabajo                       
          </Text> 
          <Text style={styles.tableCell2}>
          Si
          </Text>                             
          <Text style={styles.tableCell2}>
          No
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell3}>
          Equipamiento necesario para la realización del servicio solicitado            
          </Text>
          <Text style={styles.tableCell2}>
          Si
          </Text>                             
          <Text style={styles.tableCell2}>
          No
          </Text>  
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell3}>
          Aplicación del método de calibración seleccionado
          </Text>
          <Text style={styles.tableCell2}>
          Si
          </Text>                             
          <Text style={styles.tableCell2}>
          No
          </Text>  
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell3}>
          Cumplimiento del tiempo de entrega de resultados
          </Text><Text style={styles.tableCell2}>
          Si
          </Text>                             
          <Text style={styles.tableCell2}>
          No
          </Text>  
        </View>
                   
      </View>
      <View style={styles.footer}>
        <View style={styles.section3}>
          <Text render={({pageNumber, totalPages})=>`Página ${pageNumber} de ${totalPages}`} style={styles.textIzquierda}/>
          <Text style={styles.textDerecha}>FO-VEN-13, Rev.9</Text>
        </View>
        
        <Image src={footer} style={styles.logo} />

      </View>
    </Page>
     

  </Document>
);
export default PDF;