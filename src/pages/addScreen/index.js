import React,{useState,useRef} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import ProgressBar from 'react-bootstrap/ProgressBar';
import './styles.css'

export default function AddScreen(){
    async function addMachine(){
        
        const data = {name,procedures,field,frequency,period};
        console.log(data);
        console.log(procedures);
        const response = await fetch("http://3.21.162.147:3333/machines/create",{
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'POST',
            body:JSON.stringify(data),
        })
        console.log(await response.json());
        if(response.status===200){
            window.close();
        }
    }
    var cont = useRef(0);
    const [procedures,setProcedures] = useState([{}]);
    const [period,setPeriod] = useState('diário');
    const [frequency,setFrequency] = useState();
    const [name,setName] = useState('');
    const [field,setField] = useState("Meio ambiente");
    
    const [quant,setQuant] = useState([cont.current]);
    
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
                <Form.Control onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Nome"/>
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
            <Form.Control value={field} onChange={(e)=>{console.log(e.target.value);setField(e.target.value)}} as="select" custom> 
                <Form.Label >Escolha a área</Form.Label>                          
                            <option>Meio ambiente</option> 
                            <option>BBlend</option>
                            <option>Packaging 501</option>
                            <option>Packaging 502</option>
                            <option>Packaging 503</option>
                            <option>Packaging 511</option>
                            <option>Packaging 512</option>
                            <option>Packaging 561</option> 
                            <option>Packaging 562</option> 
                            <option>Processo cerveja</option>
                            <option>Utilidades</option> 
                            <option>Xaroparia</option> 
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
                    <Form.Label>Digite o item do procedimento</Form.Label>
                    <Form.Control onChange={(event)=>{
                        console.log(event.target.value)
                        var array = [];
                        array = [...procedures];
                        array[index].item = event.target.value;
                        setProcedures(array);
                    }} type="text" placeholder="Nome"/>
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Digite a localização do procedimento</Form.Label>
                    <Form.Control onChange={(event)=>{
                        var array = [];
                        array = [...procedures];
                        array[index].location = event.target.value;
                        setProcedures(array);
                    }}  type="text" placeholder="Nome"/>
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Digite a descrição do procedimento</Form.Label>
                    <Form.Control onChange={(event)=>{
                        var array = [];
                        array = [...procedures];
                        array[index].description = event.target.value;
                        setProcedures(array);
                    }}  type="text" placeholder="Nome"/>
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Digite o ponto do procedimento</Form.Label>
                    <Form.Control onChange={(event)=>{
                        var array = [];
                        array = [...procedures];
                        array[index].point = event.target.value;
                        setProcedures(array);
                    }}  type="" placeholder="Nome"/>
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Digite o metodo do procedimento</Form.Label>
                    <Form.Control onChange={(event)=>{
                        var array = [];
                        array = [...procedures];
                        array[index].method = event.target.value;
                        setProcedures(array);
                    }}  type="text" placeholder="Nome"/>
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Digite a condição da máquina</Form.Label>
                    <Form.Control onChange={(event)=>{
                        var array = [];
                        array = [...procedures];
                        array[index].condition = event.target.value;
                        setProcedures(array);
                    }}  type="text" placeholder="Nome"/>
                </Form.Group>
            </div>
            
            )}
            <Button onClick={addMachine} variant="primary" size="sm">Adicionar</Button>{' '}
        </Form>
    </div>)


}