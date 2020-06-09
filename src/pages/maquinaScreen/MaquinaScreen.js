import React,{useEffect,useState} from 'react'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Table from 'react-bootstrap/Table'
import "./styles.css";
export default function MaquinaScreen(){
    const fetchMachine = async ()=>{
        const response = await fetch("http://3.21.162.147:3333/machines/index",{
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method:'GET',
    })
        const data = await response.json();
        setMachines(data);
        console.log(data);
    }
    function attTable(){
        fetchMachine();
    }
    const [machines,setMachines] = useState([]);
    const [search,setSearch] = useState('');
    useEffect(()=>{  
        fetchMachine();
    },[])
    function onPressTable(name){
        window.open('http://3.21.162.147:3333/Info',name,"width=800,height=800");
    }
    function onPressEdit(name){
        window.open('http://3.21.162.147:3333/edit',name,"width=800,height=800");
    }
    async function onPressDelete(name){
        var response = await fetch(`http://3.21.162.147:3333/machines/delete?name=${name}`,{
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method:'GET',
    })
    console.log(name);
    console.log(response.status);
       // if(response.status===200){
            fetchMachine();
        //}
    }
    function onPressAdd(){
        window.open('http://3.21.162.147:3333/add',"Adicionar","width=800,height=800");

    }
    function onPressCsv(){
       
        window.open('http://3.21.162.147:3333/csv',"Adicionar","width=800,height=800");
    }
    return(
      
           
          <>
                <div  className="space">
                




            </div>
           
            <div className="tableDiv">
                 <div>
                 <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <Button variant="primary" size="sm">Pesquisar</Button>{' '}
                    </InputGroup.Prepend>
                             <FormControl 
                                 onChange={(e)=>{setSearch(e.target.value)}}
                                 placeholder="Digite uma máquina"
                                 aria-label="Maquina"
                                 //aria-describedby="basic-addon1"
                                />
                             </InputGroup>
                    
                 </div>
                
                 <div className="Table" >
                 <div className="AddAndCsvButtons">
                        
                        <Button onClick={onPressAdd} variant="primary" size="sm">+</Button>{' '}
                        <Button onClick={onPressCsv} variant="primary" size="sm">CSV</Button>{' '}
                        <Button onClick={attTable} variant="primary" size="sm">Atualizar</Button>{' '}
                    </div>
                    <Table hover responsive bordered>
                   <thead>
                        <tr>
                           <th>#</th>
                           <th>Nome</th>
                           <th>Área</th>
                           <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                    {machines.filter((value)=>search ? (value.name.indexOf(search)===0) : true).map((valor,indice)=>(
                        <tr key={indice}>
                        <td onClick={()=>onPressTable(valor.name)} >{indice}</td>
                        <td onClick={()=>onPressTable(valor.name)}>{valor.name}</td>
                        <td onClick={()=>onPressTable(valor.name)}>{valor.field}</td>
                        <td>
                            <Button className="deleteButton" onClick={()=>{onPressDelete(valor.name)}} variant="danger" size="sm">Excluir</Button>
                            <Button onClick={()=>{onPressEdit(valor.name)}} variant="info" size="sm">Editar</Button>
                        </td>
                    </tr> 
                    )

                    )}
                    
                </tbody>
                    
                
                </Table>
                    
                </div>
            </div>
            <div className="color">


                
            </div>
    </>
     
    
    )
}