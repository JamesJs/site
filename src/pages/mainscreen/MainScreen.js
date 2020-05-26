import React from 'react';
import './styles.css';
import Button from 'react-bootstrap/Button';
import smart from './../../assets/smart.png'
import ambev from './../../assets/ambev.png'

function MainScreen() {
  function handlerButtonClick(screen){
    if(screen === "result"){
      window.open('https://jamesjs.github.io/site/#Result');
    }
    if(screen ==='operario'){
      console.log("res");
    }else if(screen ==='maquina'){
      window.open('https://jamesjs.github.io/site/#Maquinas');
    }
  }
  return (
    <body>
      <div className="header">
      <img className="image"  src={smart} alt="smartMaitenance"/>
        
      </div>
      <div className="buttons">
         <Button onClick={()=>{handlerButtonClick('maquina')}} variant="outline-primary" size="lg">Cadastro de checks</Button>{' '}
        {
           //<Button onClick={()=>{handlerButtonClick('operario')}} variant="outline-primary" size="lg">Cadastro de operadores</Button>
        } 
      </div>
     
       
          
      <div className="button">
          <div className="footer">
      
            <img className="imageAmbev"  src={ambev} alt="smartMaitenance"/>
         
          </div>
      <div className="W5ButtonDiv">
        <Button className="W5Button" onClick={()=>{handlerButtonClick('result')}} variant="outline-primary" size="sm">5W</Button>{' '}
      </div>
    </div>
    </body>
  );
}

export default MainScreen;
