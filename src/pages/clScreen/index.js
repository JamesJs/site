import React,{useState,useEffect,useRef,useMemo} from 'react';
import {withRouter} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {AiOutlineCheckCircle,AiOutlineCloseCircle} from 'react-icons/ai'
import "./styles.css" 
//withRouter coloca o prop history que não é diretamente chamado dentro de router
export default withRouter (function ClScreen({history}){

    
    const field =  useMemo(()=>{
         function fetchField(){
             const field =  sessionStorage.getItem('field');
             console.log(field);
             return field;
         }
         return fetchField();
    },[])
    const [checks,setChecks] = useState([]);
    const [initialDate,setInitialDate] = useState(new Date());
    const [finalDate,setFinalDate] = useState(new Date());
    const [nome,setNome] = useState('');
    const [searchPress,setSearchPress] = useState(false);
    async function handlerDeleteButton(idDelete){
        const response = await fetch(
            `http://3.21.162.147:3333/check/delete/${idDelete}`
            ,{
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method:'DELETE',
    });
    const arrayDelele = checks.filter((value)=>value["_id"]!==idDelete);
    setChecks(arrayDelele);
    console.log(await response.json());
    handlerSearchButton();
    }


    async function handlerSearchButton(){
        const response = await fetch(
            `http://3.21.162.147:3333/check/indexDates?initialDate=${initialDate}&finalDate=${finalDate}&name=${nome}&field=${field}`
            ,{
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method:'GET',
    });
    const responseData = await response.json();
    const data = responseData.map((value)=>{value.date = new Date(value.date); return value})
    console.log(data)
    if(data.length!==0 && response.status === 200){
        setSearchPress(true);
    }

    console.log(data);
    setChecks(data);
    }
    function handlerStatisticButton(){
        history.push('statistic');
    }
    /*async function handlerDeleteButton(idDelete){
        const response = await fetch(
            `http://3.21.162.147:3333/why/delete/${idDelete}`
            ,{
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method:'DELETE',
    });
    const arrayDelele = whys.filter((value)=>value["_id"]!==idDelete);
    setWhys(arrayDelele);
    console.log(await response.json());
    handlerSearchButton();
    }*/
    return(
        <div>
            <Form>
                <Form.Group>
                <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <Button variant="primary">Nome</Button>
                        </InputGroup.Prepend>
                        <Form.Control placeholder="Deixe em branco para não aplicar o filtro" value={nome} onChange={(e)=>setNome(e.target.value)} type="text">

                        </Form.Control>
                </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <Button variant="primary">Data inicial</Button>
                        </InputGroup.Prepend>
                        <Form.Control value={initialDate} onChange={(e)=>setInitialDate(e.target.value)} type="date">

                        </Form.Control>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <Button variant="primary">Data final</Button>
                        </InputGroup.Prepend>
                        <Form.Control value={finalDate} onChange={(e)=>setFinalDate(e.target.value)} type="date">

                        </Form.Control>
                    </InputGroup>
                   
                    
                </Form.Group>
                
            
            </Form>
            <div className="buttonsStatistic">
                        <Button onClick={handlerSearchButton} variant="primary">Pesquisar</Button>
                        <Button onClick={handlerStatisticButton} variant="primary">Estatísticas</Button>
             </div>
            <Accordion defaultActiveKey="00">
                {searchPress && checks.map((value,index)=>
                (
                    <Card key={`${index}`} >
                    <Card.Header>
                        <div className="cardHeader">
                            <Accordion.Toggle eventKey={`${index}`} as={Button} variant="link" >                              
                                Nome da máquina: {value.machineName}<br/>
                                Período: {value.period}<br/>
                                Turnos: {value.frequency}<br/>
                                Data: {value.date.getDate()}/{value.date.getMonth()+1}/{value.date.getFullYear()}<br/>
                            </Accordion.Toggle>
                            <Button className="deleteButton" onClick={()=>{handlerDeleteButton(value["_id"])}} variant="danger" size="sm">Excluir</Button>
                            
                        </div>
                    </Card.Header>
                    <Accordion.Collapse eventKey={`${index}`}>
                        <Card.Body>
                            <ListGroup>   
                              <ListGroup.Item active>Nome da máquina: {value.machineName}</ListGroup.Item>
                              <ListGroup.Item>Área: {value.field}</ListGroup.Item>
                              <ListGroup.Item>Id operador: {value.userId}</ListGroup.Item>
                              <ListGroup.Item>Feedback: {value.report}</ListGroup.Item>
                            </ListGroup>
                            

                              {value.procedures.map((value,index)=>(
                                  
                                <ListGroup horizontal>
                                    <ListGroup.Item key={`${index}`}>Item {value.item}: {value.description}</ListGroup.Item>
                                    <ListGroup.Item>{value.checked ? <AiOutlineCheckCircle color="green" size={20}/>:
                                    <AiOutlineCloseCircle color="red" size={20}/>
                                    }</ListGroup.Item>
                                </ListGroup>
                                )
                              )}                              
                        </Card.Body>
                        
                    </Accordion.Collapse>
                    
                </Card>
                ))}
                
            
            </Accordion>


        
        
        </div>
    )
})