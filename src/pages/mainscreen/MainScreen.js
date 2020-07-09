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
      window.open('http://3.21.162.147:3333/operator');
    }else if(screen ==='maquina'){
      window.open('http://localhost:3333/Maquinas');
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
        
         <Button onClick={()=>{handlerButtonClick('operario')}} variant="outline-primary" size="lg">Operadores</Button>
        
        <Button onClick={()=>{handlerButtonClick('cl')}} variant="outline-primary" size="lg">Limpeza e inspeção</Button>
        <Button onClick={()=>{handlerButtonClick('result')}} variant="outline-primary" size="lg">5W</Button>{' '}
      </div>
     
       
          
  
          <div className="footer">
      
            <img className="imageAmbev"  src={ambev} alt="smartMaitenance"/>
         
          </div>
     

    </body>
  );
}

export default MainScreen;
