import React from 'react';
import './styles.css';
import Button from 'react-bootstrap/Button';
import smart from './../../assets/smart.png'
import ambev from './../../assets/ambev.png'

function MainScreen() {
  function handlerButtonClick(screen){
    if(screen === "result"){
      window.open('http://3.21.162.147:3333/Result');
    }
    if(screen ==='operario'){
      console.log("res");
    }else if(screen ==='maquina'){
      window.open('http://3.21.162.147:3333/Maquinas');
    }else if(screen === 'cl'){
      window.open('http://3.21.162.147:3333/Cl');
    }
  }
  return (
    <body>
      <div className="header">
      <img className="image"  src={smart} alt="smartMaitenance"/>
        
      </div>
      <div className="buttonsMainScreen">
         <Button onClick={()=>{handlerButtonClick('maquina')}} variant="outline-primary" size="lg">Cadastro de checks</Button>{' '}
        {
           //<Button onClick={()=>{handlerButtonClick('operario')}} variant="outline-primary" size="lg">Cadastro de operadores</Button>
        } 
        <Button onClick={()=>{handlerButtonClick('cl')}} variant="outline-primary" size="lg">CL</Button>
        <Button onClick={()=>{handlerButtonClick('result')}} variant="outline-primary" size="lg">5W</Button>{' '}
      </div>
     
       
          
      <div className="button">
          <div className="footer">
      
            <img className="imageAmbev"  src={ambev} alt="smartMaitenance"/>
         
          </div>
     
    </div>
    </body>
  );
}

export default MainScreen;
