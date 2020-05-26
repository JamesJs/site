import React,{useState,useEffect} from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
export default function InfoScreen(){
    const [name,setName] = useState(window.name);
    const [field,setField] = useState('');
    const [procedures,setProcedures] = useState([]);
    

    
        useEffect(()=>{
            const fetchMachine = async ()=>{
                console.log(window.name);
                const response =
                await fetch(`https://cors-anywhere.herokuapp.com/https://cors-anywhere.herokuapp.com/http://52.23.184.13:3333/machines/find?name=${window.name}`,{
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method:'GET',
            })
                if(response.status===200){
                     const data = await response.json();
                     console.log(data.procedures);
                     setName(data.name);
                     setField(data.field);
                     setProcedures(data.procedures);
                     
                     
                }
                
                
            }
        
            fetchMachine();

        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])
        
    return(
        <ListGroup>
            <ListGroup.Item>Nome: {name}</ListGroup.Item>
            <ListGroup.Item>Área: {field}</ListGroup.Item>
            <ListGroup.Item>
            {procedures.map((value,index)=>(
                <div key={index}>
                <ListGroup.Item as={value.name} active> Procedimento: {index} </ListGroup.Item>
                <ListGroup>
                   
                   <ListGroup.Item>Item: {value.item} </ListGroup.Item>
                   <ListGroup.Item>Descrição: {value.description}</ListGroup.Item>
                   <ListGroup.Item>Método: {value.method}</ListGroup.Item>
                   <ListGroup.Item>Localização: {value.location}</ListGroup.Item>
                   <ListGroup.Item>Pontos:  {value.point}</ListGroup.Item>
                   <ListGroup.Item>Condição: {value.condition}</ListGroup.Item>
                </ListGroup>
                </div>
                ))
            }
            </ListGroup.Item>
            
        </ListGroup>
    )
    
}