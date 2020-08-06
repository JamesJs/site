import React,{useState} from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
export default function OperatorsAddScreen(){
    const [name,setName] = useState('');
    const [admin,setAdmin] = useState("Sim");
    const [field,setField] = useState('Meio ambiente');
    const [password,setPassword] = useState('');
    const [id,setId] = useState('');
    async function addOperatorHandler(){
        const data = {name,admin:admin ==="Sim" ? true : false,fields:[field],userId:id,password};
        const response = await fetch(`http://54.158.219.128:3333/users/create` ,{
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
    return(
    <div>
      <Form>
            <Form.Group controlId="name">
                <Form.Label className="fieldInputRegister">Nome do operário</Form.Label>
                <Form.Control value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Nome"/>
            </Form.Group>  
      
     
            <Form.Group controlId="ID">
                <Form.Label className="fieldInputRegister">ID do operário</Form.Label>
                <Form.Control value={id} onChange={(e)=>{setId(e.target.value)}} type="text" placeholder="ID"/>
            </Form.Group>  
            <Form.Group controlId="Password">
                <Form.Label className="fieldInputRegister">Senha</Form.Label>
                <Form.Control value={password} onChange={(e)=>{setPassword(e.target.value)}} type="text" placeholder="Senha"/>
            </Form.Group>
     
    
            <Form.Group controlId="admin">           
                    <Form.Label className="fieldInputRegister">Administrador?</Form.Label>     
                    <Form.Control value={admin} onChange={(e)=>{console.log(e.target.value);setAdmin(e.target.value)}} size="sm" as="select" custom> 
                                         
                            <option>Sim</option> 
                            <option>Não</option>
                            
                </Form.Control>
            </Form.Group>  
    
       <Form.Group controlId="Area">           
                    <Form.Label className="fieldInputRegister">Escolha a área:</Form.Label>     
                    <Form.Control value={field} onChange={(e)=>{console.log(e.target.value);setField(e.target.value)}} size="sm" as="select" custom> 
                                         
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
                            <option>Engenharia</option>
                            <option>testArea</option>
                </Form.Control>
            </Form.Group>
            <Button onClick={addOperatorHandler} variant="primary" size="sm">Adicionar</Button>{' '}
        </Form>
    </div>
    );
}