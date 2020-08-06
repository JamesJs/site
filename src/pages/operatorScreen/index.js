import React,{useEffect,useState,useCallback} from 'react'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Table from 'react-bootstrap/Table'
import "./styles.css"
export default function OperatorScreen(){
    const [operators,setOperators] = useState([])
    const fetchOperators = useCallback(async ()=>{
        const field = sessionStorage.getItem('field');
        const response = await fetch(`http://54.158.219.128:3333/users/index?field=${field}`,{
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method:'GET',
    })
        const data = await response.json();
        setOperators(data);
        console.log(data);
    },[]);
    function attTable(){
        fetchOperators();
    }
    useEffect(()=>{
        fetchOperators();
    },[fetchOperators])
    function onPressEdit(data){
        var w = window.open('http://54.158.219.128:80/operatoredit',"name","width=800,height=500");
        w.data = data;
       
    }
    async function onPressDelete(id){
        await fetch(`http://54.158.219.128:3333/users/delete/${id}`,{

        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method:'delete',
    })
       
        fetchOperators();
        
    }
    function addHandler(){
        var w = window.open('http://54.158.219.128:80/operatoradd',"name","width=800,height=500");
    }
    return(
        <html>
        <body>
            <div  className="space">
                




            </div>
           
            <div className="tableDiv">
                 <div>
                 <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <Button variant="primary" size="sm">Pesquisar</Button>{' '}
                    </InputGroup.Prepend>
                             <FormControl
                                 placeholder="Digite um nome ou ID"
                                 aria-label="Operario"
                                 //aria-describedby="basic-addon1"
                                />
                             </InputGroup>
                    
                 </div>
                
                 <div className="Table" >
                 <div className="AddAndCsvButtons">
                        <Button variant="primary" onClick={addHandler} size="sm">+</Button>{' '}
                        {
                           // <Button variant="primary" size="sm">CSV</Button>{' '}
                            }
                        <Button onClick={attTable} variant="primary" size="sm">Atualizar</Button>{' '}
                    </div>
                <Table hover responsive bordered>
                   <thead>
                        <tr>
                           <th>#</th>
                           <th>Nome</th>
                           <th>ID</th>
                           <th>Administrador</th>
                           <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                    {operators.length>0 && operators.map((value,index)=>
                    <tr onClick={()=>{console.log('clicou')}}>
                        <td>{index}</td>
                        <td>{value.name}</td>
                        <td>{value.userId}</td>
                        <td>{value.admin ? "sim" : "não"}</td>
                        <td>
                            <Button className="deleteButton" onClick={()=>{onPressDelete(value["_id"])}} variant="danger" size="sm">Excluir</Button>
                            <Button onClick={()=>{onPressEdit(value)}} variant="info" size="sm">Editar</Button>
                        </td>
                    </tr>)}
                    
                </tbody>
                    
                
                </Table>
                    
                </div>

            </div>

        </body>
        </html>
    )
}