import React,{useEffect,useState} from 'react'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Table from 'react-bootstrap/Table'
import "./styles.css";
const field = sessionStorage.getItem('field');
export default function MaquinaScreen(){
    const fetchMachine = async ()=>{
        
        const response = await fetch(`http://54.158.219.128:3333/machines/index?field=${field}`,{
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
    function onPressTable(name,period,frequency){
        window.open('http://54.158.219.128:80/Info',name,"width=800,height=800");
        window.data = {period,frequency};
       
    }
    function onPressEdit(name,period,frequency){
        var w = window.open('http://54.158.219.128:80/edit',name,"width=800,height=800");
        window.data = {period,frequency};
        w.data = {period,frequency};
       
    }
   
    async function onPressDelete(name,period,frequency){
        var response = await fetch(`http://54.158.219.128:3333/machines/delete?name=${name}&period=${period}&frequency=${frequency}`,{

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
        window.open('http://54.158.219.128:80/add',"Adicionar","width=800,height=800");

    }
    function onPressCsv(){
       
        window.open('http://54.158.219.128:80/csv',"Adicionar","width=800,height=800");
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
                        <Button onClick={onPressCsv} variant="secondary" size="sm">CSV</Button>{' '}
                        <Button onClick={attTable} variant="primary" size="sm">Atualizar</Button>{' '}
                    </div>
                    <Table hover responsive bordered>
                   <thead>
                        <tr>
                           <th>#</th>
                           <th>Nome</th>
                           <th>Área</th>
                           <th>Período</th>
                           <th>Turnos</th>
                           
                           <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                    {machines.filter((value)=>search ? (value.name.indexOf(search)===0) : true).map((valor,indice)=>(
                        <tr key={indice}>
                        <td onClick={()=>onPressTable(valor.name,valor.period,valor.frequency)} >{indice}</td>
                        <td onClick={()=>onPressTable(valor.name,valor.period,valor.frequency)}>{valor.name}</td>
                        <td onClick={()=>onPressTable(valor.name,valor.period,valor.frequency)}>{valor.field}</td>
                        <td onClick={()=>onPressTable(valor.name,valor.period,valor.frequency)}>{valor.period}</td>
                        <td onClick={()=>onPressTable(valor.name,valor.period,valor.frequency)}>{valor.frequency}</td>
                        

                        <td className="tableButtons">
                            
                                <Button className="deleteButton" onClick={()=>{onPressDelete(valor.name,valor.period,valor.frequency)}} variant="danger" size="sm">Excluir</Button>
                                <Button onClick={()=>{onPressEdit(valor.name,valor.period,valor.frequency)}} variant="info" size="sm">Editar</Button>
                                <a href={`http://54.158.219.128:3333/backup?name=${valor.name}&type=checks&field=${field}`} download>
                                    <Button  variant="secondary" size="sm">Exportar CSV</Button>
                                </a>
                            
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