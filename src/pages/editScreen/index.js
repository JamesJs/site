import React,{useState,useRef,useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import ProgressBar from 'react-bootstrap/ProgressBar';
import './styles.css'

export default function EditScreen(){
    var cont = useRef(0);
    const [name,setName] = useState(window.name);
    const [date,setDate] = useState();
    const [period,setPeriod] = useState();
    const [frequency,setFrequency] = useState();
    const [procedures,setProcedures] = useState([{}]);
    const [field,setField] = useState(''); 
    const [quant,setQuant] = useState([]);
    useEffect(()=>{
        const fetchMachine = async ()=>{
            const dataWindow = window.opener.data;
            console.log(dataWindow)
            const response = await fetch(`http://3.21.162.147:3333/machines/find?name=${window.name}&period=${dataWindow.period}&frequency=${dataWindow.frequency}`,{
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'GET',
        })
            if(response.status===200){
                 
                 var array = [];
                 const data = await response.json();
                 console.log(data);
                 console.log(data.procedures.length);
                 cont.current = (data.procedures.length-1);
                 setProcedures(data.procedures);
                 for(var i =0;i<=cont.current;i++){
                    array[i] = i;
                 }
                 var date = new Date(data.date);

                 setQuant(array);
                 setField(data.field);
                 setPeriod(data.period);
                 setFrequency(data.frequency);
                 setDate(`${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`);
            }
            
            
        }
    
        fetchMachine();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    async function updateMachine(){
        const data = {name,procedures,field,frequency,period,date};
        const response = await fetch(`http://3.21.162.147:3333/machines/modify?name=${window.name}&period=${window.opener.data.period}&frequency=${window.opener.data.frequency}` ,{
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'POST',
            body:JSON.stringify(data),
        })
        console.log(await response.json());
        if(await response.status===200){
            window.close();
        }
    }
    

    
    function addProcedure(){ 
        var aux            
        aux = cont.current+1;
        cont.current = cont.current+1;
        setQuant([...quant,aux]);
        setProcedures([...procedures,{}]);
        
    }
    function removeProcedure(){
        var array = [...quant];
        var arrayProcedures= [...procedures];
        if(cont.current>0){
            array.pop();
            arrayProcedures.pop();
            setQuant(array);
            setProcedures(arrayProcedures);
            cont.current = cont.current-1;
        }
        
    }
    return (
    <div>
        <Form>
            <Form.Group controlId="name">
                <Form.Label>Digite o nome da máquina</Form.Label>
                <Form.Control value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Nome"/>
            </Form.Group>
            <Form.Group controlId="name">                
            <Form.Control value={period} onChange={(e)=>{console.log(e.target.value);setPeriod(e.target.value)}} as="select" custom> 
                <Form.Label >Escolha o período</Form.Label>                          
                            <option>diário</option> 
                            <option>semanal</option>
                            <option>quinzenal</option>
                            <option>mensal</option>
                            
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="name">
                <Form.Label>Digite a quantidade de turnos</Form.Label>
                <Form.Control value={frequency} onChange={(e)=>{setFrequency(e.target.value)}} type="text" placeholder="Nome"/>
            </Form.Group>
            <Form.Group controlId="name">
                        <Form.Label>Defina a data de início</Form.Label>
                        <Form.Control value={date} onChange={(e)=>setDate(e.target.value)} type="date">

                        </Form.Control>
                </Form.Group> 
            <Form.Group controlId="name">   
                <Form.Label >Escolha a área</Form.Label>              
                <Form.Control value={field} onChange={(e)=>{console.log(e.target.value);setField(e.target.value)}} as="select" custom> 
                                         
                            <option> Meio ambiente </option> 
                            <option> BBlend </option>
                            <option> Packaging 501  </option>
                            <option> Packaging 502 </option>
                            <option> Packaging 503  </option>
                            <option> Packaging 511  </option>
                            <option> Packaging 512  </option>
                            <option> Packaging 561 </option> 
                            <option> Packaging 562 </option> 
                            <option> Processo cerveja  </option>
                            <option> Utilidades </option> 
                            <option> Xaroparia </option> 
                </Form.Control>
            </Form.Group>
            <p>Use os botões para adicionar ou remover procedimentos</p>
            <div className="buttonsAddandRemove">
                
                <Button onClick={addProcedure} variant="primary" size="lg">+</Button>{' '}
                <Button onClick={removeProcedure} variant="primary" size="lg">-</Button>{' '}
            </div>
            {quant.map((valor,index)=>
            <div key={index}>
                {`Procedimento ${index}:`}
                <Form.Group className="formInicio" controlId="name">
                    <Form.Label>Digite o item da máquina</Form.Label>
                    <Form.Control value={procedures[index].item} onChange={(event)=>{
                        console.log(event.target.value)
                        var array = [];
                        array = [...procedures];
                        array[index].item = event.target.value;
                        setProcedures(array);
                    }} type="text" placeholder="Nome"/>
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Digite o location da máquina</Form.Label>
                    <Form.Control value={procedures[index].location} onChange={(event)=>{
                        var array = [];
                        array = [...procedures];
                        array[index].location = event.target.value;
                        setProcedures(array);
                    }}  type="text" placeholder="Nome"/>
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Digite o descrição da máquina</Form.Label>
                    <Form.Control value={procedures[index].description} onChange={(event)=>{
                        var array = [];
                        array = [...procedures];
                        array[index].description = event.target.value;
                        setProcedures(array);
                    }}  type="text" placeholder="Nome"/>
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Digite o point da máquina</Form.Label>
                    <Form.Control value={procedures[index].point} onChange={(event)=>{
                        var array = [];
                        array = [...procedures];
                        array[index].point = event.target.value;
                        setProcedures(array);
                    }}  type="text" placeholder="Nome"/>
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Digite o metodo da máquina</Form.Label>
                    <Form.Control value={procedures[index].method} onChange={(event)=>{
                        var array = [];
                        array = [...procedures];
                        array[index].method = event.target.value;
                        setProcedures(array);
                    }}  type="text" placeholder="Nome"/>
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Digite o condição da máquina</Form.Label>
                    <Form.Control value={procedures[index].condition} onChange={(event)=>{
                        var array = [];
                        array = [...procedures];
                        array[index].condition = event.target.value;
                        setProcedures(array);
                    }}  type="text" placeholder="Nome"/>
                </Form.Group>
            </div>
            
            )}
            <Button onClick={updateMachine} variant="primary" size="sm">Alterar</Button>{' '}
        </Form>
    </div>)


}