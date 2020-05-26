import React,{useState,useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import "./styles.css"
export default function ResultScreen(){

    
    
    const [whys,setWhys] = useState([]);
    const [initialDate,setInitialDate] = useState(new Date());
    const [finalDate,setFinalDate] = useState(new Date());
    const [id,setId] = useState('');
    const [searchPress,setSearchPress] = useState(false);
    const [field,setField] = useState("Meio ambiente");



    async function handlerSearchButton(){
        const response = await fetch(
            `https://cors-anywhere.herokuapp.com/http://52.23.184.13:3333/why/indexDates?initialDate=${initialDate}&finalDate=${finalDate}&id=${id}&field=${field}`
            ,{
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method:'GET',
    });
    const data = await response.json();
    console.log(data.length)
    if(data.length!==0 && response.status === 200){
        setSearchPress(true);
    }

    console.log(data);
    setWhys(data);
    }
    async function handlerDeleteButton(idDelete){
        const response = await fetch(
            `https://cors-anywhere.herokuapp.com/http://52.23.184.13:3333/why/delete/${idDelete}`
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
    }
    return(
        <div>
            <Form>
                <Form.Group>
                <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <Button variant="primary">ID</Button>
                        </InputGroup.Prepend>
                        <Form.Control placeholder="Deixe em branco para não aplicar o filtro" value={id} onChange={(e)=>setId(e.target.value)} type="text">

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
                    <Form.Group controlId="name">                
            <Form.Control value={field} onChange={(e)=>{console.log(e.target.value);setField(e.target.value)}} as="select" custom> 
                <Form.Label >Escolha a área</Form.Label>                          
                            <option> Meio ambiente </option> 
                            <option> BBlend </option>
                            <option> Packaging 501  </option>
                            <option> Packaging 502 </option>
                            <option> Packaging 503  </option>
                            <option> Packaging 511  </option>
                            <option> Packaging 512  </option>
                            <option> Packaging 561 </option> 
                            <option> Packaging 562 </option> 
                            <option> Processo cerveja </option>
                            <option> Utilidades </option> 
                            <option> Xaroparia </option> 
                </Form.Control>
            </Form.Group>
                    
                    <Button onClick={handlerSearchButton} variant="primary">Pesquisar</Button>
                </Form.Group>
            
            </Form>
            <Accordion defaultActiveKey="00">
                {searchPress && whys.map((value,index)=>
                (
                    <Card key={`${index}`} >
                    <Card.Header>
                        <div className="cardHeader">
                            <Accordion.Toggle eventKey={`${index}`} as={Button} variant="link" >                              
                                {value.userId}
                            </Accordion.Toggle>
                            <Button className="deleteButton" onClick={()=>{handlerDeleteButton(value["_id"])}} variant="danger" size="sm">Excluir</Button>
                        </div>
                    </Card.Header>
                    <Accordion.Collapse eventKey={`${index}`}>
                        <Card.Body>   
                              <p>Descrição da anomalia: {value.descriptionAnomaly}</p>
                              <p>Correção: {value.corrective}</p>
                              <p>Ordem de manutenção: {value.maintenanceOrder}</p>
                              {value.whys.map((value,index)=><p key={`${index}`}>Porque {value.number}: {value.description}</p>)}                              
                              <p>Causa: {value.cause}</p>
                              <p>Deterioração: {value.deterioration}</p>
                              <p>Comentário: {value.comment}</p>
                              <p>Notas de manutenção: {value.maintenanceNotes}</p>
                        </Card.Body>
                        
                    </Accordion.Collapse>
                    
                </Card>
                ))}
                
            
            </Accordion>


        
        
        </div>
    )
}