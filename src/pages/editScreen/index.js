import React,{useState,useRef,useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import ProgressBar from 'react-bootstrap/ProgressBar';
import './styles.css'

export default function AddScreen(){
    var cont = useRef(0);
    const [name,setName] = useState(window.name);
    const [procedures,setProcedures] = useState([{}]);
    const [field,setField] = useState(''); 
    const [quant,setQuant] = useState([]);
    useEffect(()=>{
        const fetchMachine = async ()=>{
            const response = await fetch(`http://52.23.184.13:3333/machines/find?name=${window.name}`,{
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'GET',
        })
            if(response.status===200){
                 var array = [];
                 const data = await response.json();
                 console.log(data.procedures.length);
                 cont.current = (data.procedures.length-1);
                 setProcedures(data.procedures);
                 for(var i =0;i<=cont.current;i++){
                    array[i] = i;
                 }
                 setQuant(array);
                 setField(data.field);
            }
            
            
        }
    
        fetchMachine();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    async function updateMachine(){
        const data = {name,procedures,field};
        const response = await fetch(`http://52.23.184.13:3333/machines/modify?name=${window.name}` ,{
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
                <Form.Label>Digite o grupo da máquina</Form.Label>
                <Form.Control value={field}  onChange={(e)=>{setField(e.target.value)}} type="text" placeholder="Área"/>
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