import React from 'react'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Table from 'react-bootstrap/Table'
import "./styles.css"
export default function MaquinaScreen(){
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
                                 aria-label="Maquina"
                                 //aria-describedby="basic-addon1"
                                />
                             </InputGroup>
                    
                 </div>
                
                 <div className="Table" >
                 <div className="AddAndCsvButtons">
                        <Button variant="primary" size="sm">+</Button>{' '}
                        <Button variant="primary" size="sm">CSV</Button>{' '}
                    </div>
                <Table hover responsive bordered>
                   <thead>
                        <tr>
                           <th>#</th>
                           <th>Nome</th>
                           <th>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr onClick={()=>{console.log('clicou')}}>
                        <td>1</td>
                        <td>Fulano</td>
                        <td>9999</td>
                    </tr>
                    <tr onClick={()=>{console.log('clicou')}}>
                        <td>1</td>
                        <td>Fulano</td>
                        <td>9999</td>
                    </tr>
                    <tr onClick={()=>{console.log('clicou')}}>
                        <td>1</td>
                        <td>Fulano</td>
                        <td>9999</td>
                    </tr>
                    <tr onClick={()=>{console.log('clicou')}}>
                        <td>1</td>
                        <td>Fulano</td>
                        <td>9999</td>
                    </tr>
                    <tr onClick={()=>{console.log('clicou')}}>
                        <td>1</td>
                        <td>Fulano</td>
                        <td>9999</td>
                    </tr>
                    <tr onClick={()=>{console.log('clicou')}}>
                        <td>1</td>
                        <td>Fulano</td>
                        <td>9999</td>
                    </tr>
                    <tr onClick={()=>{console.log('clicou')}}>
                        <td>1</td>
                        <td>Fulano</td>
                        <td>9999</td>
                    </tr>
                    <tr onClick={()=>{console.log('clicou')}}>
                        <td>1</td>
                        <td>Fulano</td>
                        <td>9999</td>
                    </tr>
                    <tr onClick={()=>{console.log('clicou')}}>
                        <td>1</td>
                        <td>Fulano</td>
                        <td>9999</td>
                    </tr>
                    <tr onClick={()=>{console.log('clicou')}}>
                        <td>1</td>
                        <td>Fulano</td>
                        <td>9999</td>
                    </tr>
                    <tr onClick={()=>{console.log('clicou')}}>
                        <td>1</td>
                        <td>Fulano</td>
                        <td>9999</td>
                    </tr>
                    <tr onClick={()=>{console.log('clicou')}}>
                        <td>1</td>
                        <td>Fulano</td>
                        <td>9999</td>
                    </tr>
                    <tr onClick={()=>{console.log('clicou')}}>
                        <td>1</td>
                        <td>Fulano</td>
                        <td>9999</td>
                    </tr>
                    <tr onClick={()=>{console.log('clicou')}}>
                        <td>1</td>
                        <td>Fulano</td>
                        <td>9999</td>
                    </tr>
                    <tr onClick={()=>{console.log('clicou')}}>
                        <td>1</td>
                        <td>Fulano</td>
                        <td>9999</td>
                    </tr>
                    <tr onClick={()=>{console.log('clicou')}}>
                        <td>1</td>
                        <td>Fulano</td>
                        <td>9999</td>
                    </tr> <tr onClick={()=>{console.log('clicou')}}>
                        <td>1</td>
                        <td>Fulano</td>
                        <td>9999</td>
                    </tr> <tr onClick={()=>{console.log('clicou')}}>
                        <td>1</td>
                        <td>Fulano</td>
                        <td>9999</td>
                    </tr> <tr onClick={()=>{console.log('clicou')}}>
                        <td>1</td>
                        <td>Fulano</td>
                        <td>9999</td>
                    </tr>
                </tbody>
                    
                
                </Table>
                    
                </div>

            </div>
            <div className="colors">


                
            </div>

        </body>
        </html>
    )
}