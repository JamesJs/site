import React,{useState} from 'react';
import './styles.css';
import {useHistory} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import smart from './../../assets/smart.png'
import ambev from './../../assets/ambev.png'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import cookieObj from '../../utils/cookietoObject';
function LoginScreen() {
  const [userId,setUserId] = useState('');
  const [field,setField] = useState("Meio ambiente");
  const [password,setPassword] = useState('');
  
  let history = useHistory();
  async function handlerButtonLogin(){
    sessionStorage.removeItem('admin');
    
    const data = {userId,password,field};
    console.log(JSON.stringify(data))
    const response = await fetch(`https://cors-anywhere.herokuapp.com/http://52.23.184.13:3333/session/login`,{
    
    headers:{     
      'Accept': 'application/json',
      'Content-Type': 'application/json',

    },
    body: JSON.stringify(data),
    method:'POST', 
    credentials: 'include',
    });
    console.log(await response.json());
    if(response.status === 200){
      const cookieObject = cookieObj(document.cookie);
      console.log(cookieObject);
      if(cookieObject[1]["admin"]=="true"){
        sessionStorage.setItem('admin',"true");
        history.replace('/mainScreen');

      }else{
        //colocar algo para mostrar q o usuário não possui authenticação 
      }
    }else{
      //colocar algo para mostrar que o usuário não existe
    }

  }
  
  return (
    <body>
      <div className="header">
      <img className="image"  src={smart} alt="smartMaitenance"/>
        
      </div>
      <div className="inputsS">
        
         <InputGroup className="input" size="lg">
            <FormControl
              placeholder="id"
              onChange={(e)=>{setUserId(e.target.value)}}
              value={userId}
            />
          </InputGroup>
          <InputGroup className="input"size="lg">
            <FormControl
              value={password}
              placeholder="senha"
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </InputGroup>
          <Form.Control className="input" value={field} onChange={(e)=>{console.log(e.target.value);setField(e.target.value)}} as="select"> 
                                  
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
          <Button className="loginButton "  onClick={handlerButtonLogin} variant="outline-primary" size="lg">Entrar</Button>
        {
           //<Button onClick={()=>{handlerButtonClick('operario')}} variant="outline-primary" size="lg">Cadastro de operadores</Button>
        } 
       
      </div>
     
       
          
      <div className="button">
          <div className="footer">
      
            <img className="imageAmbev"  src={ambev} alt="smartMaitenance"/>
         
          </div>
     
    </div>
    </body>
  );
}

export default LoginScreen;
