import React,{useState} from 'react';
import './styles.css';
import {useHistory,Link} from 'react-router-dom';
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
    
    const data = {userId,password};
    console.log(JSON.stringify(data))
    const response = await fetch(`http://localhost:3333/session/login`,{
    
    headers:{     
      'Accept': 'application/json',
      'Content-Type': 'application/json',

    },
    //credentials:'include',
    body: JSON.stringify(data),
    method:'POST', 
    });
    
    if(response.status === 200){
      var responseJson = await response.json();
      const field = responseJson.field;
      const isAdm = responseJson.admin;

      //const cookieObject = cookieObj(document.cookie);
      
      
      //console.log(cookieObject);
      //if(cookieObject[1]["admin"]=="true"){
        await sessionStorage.setItem('admin',`${isAdm}`);
        await sessionStorage.setItem('field',field);
        sessionStorage.setItem('userId',userId);
        console.log(isAdm)
        if(isAdm){
          history.replace('/mainScreen');
        }else{
          window.location.href = 'http://3.21.162.147:3333/mobileweb';
          
        }
        console.log(response.headers);

     // }else{
        //colocar algo para mostrar q o usuário não possui authenticação 
     // }
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
              type="password"
              value={password}
              placeholder="senha"
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </InputGroup>
          <Button className="loginButton "  onClick={handlerButtonLogin} variant="outline-primary" size="lg">Entrar</Button>
          <Link to="/register">Cadastre-se</Link>
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
