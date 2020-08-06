import React,{useState,useRef} from 'react';
import './styles.css';
import {useHistory,Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import smart from './../../assets/smart.png'
import ambev from './../../assets/ambev.png'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal'
export default function RegisterScreen(){
        const userCreated = useRef(false);
        const [userId,setUserId] = useState('');
        const [field,setField] = useState("Meio ambiente");
        const [password,setPassword] = useState('');
        const [name,setUserName] = useState('');
        const [show,setShow] = useState(false);
        
        let history = useHistory();
        async function handlerButtonRegister(){
          
          const data = {userId,password,fields:[field],name};
          console.log(JSON.stringify(data))
          //não é necessário/não faz sentido esperar dentro de uma promise pois se o tempo
          //do timeout bater esta deve ser rejeitada.
          const createUser = () => (new Promise((resolve,reject)=>{
                setTimeout(()=>reject(new Error('user dont created')),10000);
                fetch(`http://54.158.219.128:3333/users/create`,{
          
                    headers:{     
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
      
          },
          //credentials:'include',
          body: JSON.stringify(data),
          method:'POST', 
          }).then((response)=>{
              if(response.status === 200) {
                  resolve('created');
              }else {
                  reject(new Error('user dont created'))
                } 

        })}))
          try{
                await createUser();
                userCreated.current = true;
                setShow(true);
          }catch(err){
                userCreated.current = true;
          }
        
      
         
          
        }
        function handlerClose(){
            history.replace('/');
        }
        function handlerButtonBack(){
            history.replace('/');
        }
        
        return (
          <body>
              <Modal show={show}>
                  <Modal.Header closeButton>
                      <Modal.Title>Cadastro</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{userCreated.current ? "Usuário criado com sucesso" : "Ocorreu um erro, Tente novamente mais tarde"}</Modal.Body>
                  <Modal.Footer>
                      <Button variant="primary" onClick={handlerClose}>
                          Fechar
                      </Button>                     
                  </Modal.Footer>
               </Modal>
            <div className="header">
            <img className="image"  src={smart} alt="smartMaitenance"/>
              
            </div>
            <div className="inputsS">
            <InputGroup className="input" size="lg">
                  <FormControl
                    placeholder="Nome"
                    onChange={(e)=>{setUserName(e.target.value)}}
                    value={name}
                  />
                </InputGroup>
              
               <InputGroup className="input" size="lg">
                  <FormControl
                    placeholder="id"
                    onChange={(e)=>{setUserId(e.target.value)}}
                    value={userId}
                  />
                </InputGroup>
                <InputGroup className="input"size="lg">
                  <FormControl
                    type="password"
                    value={password}
                    placeholder="senha"
                    onChange={(e)=>{setPassword(e.target.value)}}
                  />
                </InputGroup>
                <Form.Group controlId="name">           
                    <Form.Label className="fieldInputRegister" >Escolha a área:</Form.Label>     
                    <Form.Control value={field} onChange={(e)=>{console.log(e.target.value);setField(e.target.value)}} size="lg" as="select" custom> 
                                         
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
                <Button className="loginButton "  onClick={handlerButtonRegister} variant="outline-primary" size="lg">Cadastrar</Button>
                <Button className="loginButton "  onClick={handlerButtonBack} variant="outline-primary" size="lg">Voltar</Button>
             
            </div>
           
             
                
            <div className="button">
                <div className="footer">
            
                  <img className="imageAmbev"  src={ambev} alt="smartMaitenance"/>
               
                </div>
           
          </div>
          </body>
        );
    
}