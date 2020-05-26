import React,{useState,useRef} from 'react'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import FormFile from 'react-bootstrap/FormFile'
import InputGroup from 'react-bootstrap/InputGroup'
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import './styles.css'
export default function Csv(){
    const fileSelect = useRef();
    const [progresso,setProgresso] = useState(0);
    const [loading,setLoading] = useState(false);
    const [file,setFile] = useState(0);
    const [field,setField] = useState("Meio ambiente");
    async function fetchData(){
        setLoading(true);
        setProgresso(30)
        const data = new FormData();
        data.append('csv',file);
        console.log(file.type);
        setProgresso(progresso+50);
        //fazer uma promessa para setar um valor de tempo para a req
        const response = await fetch(`http://52.23.184.13:3333/fileupload/?field=${field}`,{
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
        
      <Form.Group controlId="name">
        <InputGroup>
                    <InputGroup.Prepend>
                           
                        <Button variant="primary">Área</Button>
                            
                    </InputGroup.Prepend>
            <Form.Control value={field} onChange={(e)=>{console.log(e.target.value);setField(e.target.value)}} as="select" custom> 
                                  
                            <option> Meio ambiente </option> 
                            <option> BBlend </option>
                            <option> Packaging 501  </option>
                            <option> Packaging 502 </option>
                            <option> Packaging 503  </option>
                            <option> Packaging 511  </option>
                            <option> Packaging 512  </option>
                            <option> Packaging 561 </option> 
                            <option> Packaging 562 </option> 
                            <option> Processo cerveja  </option>
                            <option> Utilidades </option> 
                            <option> Xaroparia </option> 
                </Form.Control>
            
          </InputGroup>
        </Form.Group>
        </Form>
        <Button onClick={fetchData}  variant="primary">Importar</Button>
        {loading && <ProgressBar className="barraProgresso" animated label={`${progresso}%`} now={progresso} />}


        </div>
    )
}