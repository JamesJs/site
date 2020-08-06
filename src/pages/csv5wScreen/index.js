import React,{useState,useRef} from 'react'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import FormFile from 'react-bootstrap/FormFile'
import InputGroup from 'react-bootstrap/InputGroup'
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import './styles.css'
export default function Csv5w(){
    const fileSelect = useRef();
    const [progresso,setProgresso] = useState(0);
    const [loading,setLoading] = useState(false);
    const [file,setFile] = useState(0);
    async function fetchData(){
        setLoading(true);
        setProgresso(30)
        const data = new FormData();
        data.append('csv',file);
        console.log(file.type);
        setProgresso(progresso+50);
        //fazer uma promessa para setar um valor de tempo para a req
        const response = await fetch(`http://54.158.219.128:3333/fileupload/5w/`,{
            method:"POST",
            
            body:data,
        })
        if(response.status===200){
            setProgresso(100);
        }else{
            setProgresso(80);
            //colocar erro
        }
        console.log(await response.json());
    }
    
    
    const [name,setName] = useState('Arquivo.csv');
     
    return(
        
        <div>
            <Form name="csv">
            <Form.Group controlId="vlabel">
                <InputGroup  className="mb-3">
                
                            <InputGroup.Prepend >
                           
                                <Button   variant="primary">Arquivo</Button>
                   
                            </InputGroup.Prepend>
                        
                            
                            <Form.File 
                            
                            name="csv"
                            className="vlabel"
                            bsPrefix="vlabel"
                            custom 
                            >  
                                    <FormFile.Label name='csv'  bsCustomPrefix="vvlabel" className="vvlabel" >{name}</FormFile.Label>
                                    <Form.File.Input 
                                    name="csv"
                                    accept=".csv" 
                                    onChange={(e)=>{
                                        setName(e.target.files[0].name);
                                        setFile(e.target.files[0]);
                                        fileSelect.current.labels[0].innerText=e.target.files[0].name;
                                        }} 
                                    ref={fileSelect}/>
                                    
                               
                            </Form.File>
                            <InputGroup.Append>
                                <Button onClick={()=>fileSelect.current.click()} variant="outline-primary">...</Button>
                             </InputGroup.Append>
                                
                              
                           
                        
                           
                            
                        
                        </InputGroup>
          </Form.Group>

                    
            </Form>
        <Form>
        
        </Form>
        <Button onClick={fetchData}  variant="primary">Importar</Button>
        {loading && <ProgressBar className="barraProgresso" animated label={`${progresso}%`} now={progresso} />}


        </div>
    )
}