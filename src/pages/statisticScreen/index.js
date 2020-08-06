import React,{useEffect,useState,useMemo,useCallback,useRef} from 'react';
import Form from 'react-bootstrap/Form';
import './styles.css'
import Chart from 'chart.js';
import ListGroup from 'react-bootstrap/ListGroup'
export default function StatisticScreen(){
    const [totalItens,setTotalItens] = useState();
    const [itensDone,setItensDone] = useState();
    const [monthly,setMonthly] = useState([]);
    const [diary,setDiary] = useState([]);
    const [weekly,setWeekly] = useState([]);
    const [biweekly,setBiweekly] = useState([]);
    const [mounth,setMounth] = useState("Junho");
    const [years,setYears] = useState([2020]);
    const [year,setYear] = useState(2020);
    const chartRef = useRef();
    const MOUNTHS = [{mounth:"Janeiro"},{mounth:"Fevereiro"},{mounth:"Março"},
    {mounth:"Abril"},{mounth:"Maio"},{mounth:"Junho"},{ mounth:"Julho"},
                     {mounth:"Agosto"},{mounth:"Setembro"},{mounth:"Outubro"},
                     {mounth:"Novembro"},{mounth:"Dezembro"}]
    const MOUNTHSBYNUMBER = {
                        Janeiro: 0,
                        Fevereiro: 1,
                        Março: 2,
                        Abril: 3,
                        Maio: 4,
                        Junho: 5,
                        Julho: 6,
                        Agosto: 7,
                        Setembro: 8,
                        Outubro: 9,
                        Novembro: 10,
                        Dezembro: 11,
                      };
    const initialDate = new Date("June 10,2020");
    const todayDate = new Date();
    useMemo(()=>{
        const yearsDiff = todayDate.getFullYear()-initialDate.getFullYear(); 
        var yearAux = initialDate.getFullYear();
        var i = 0
        console.log(yearsDiff);
        var yearsArray = [...years]
        while(i!== yearsDiff){
            yearsArray.push(yearAux+1);
            yearAux = yearAux+1;
            i++;
        }
        setYears(yearsArray);
        
    
    //rever porque tem q colocar as dependencias aqui!
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
        async function fetchDate(){
            let sumItens = 0;
            const field = sessionStorage.getItem('field');
            let itensDoneSum=0;
            const response = await fetch(`http://54.158.219.128:3333/frequency/index?year=${year}&mounth=${mounth}&field=${field}`,{
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method:'GET',
            });
            var responseArray = await response.json();
            var diaryMachine = responseArray.diary.map((value)=>{
                const dateMachine = new Date(value.date)
                var monthMachine = dateMachine.getMonth();
                var dayMachine = dateMachine.getDate();
                var todayMonth = initialDate.getMonth();
                if(Number(monthMachine)===Number(todayMonth) && MOUNTHSBYNUMBER[mounth] === Number(todayMonth)){
                    
                    value['days'] = todayDate.getDate()-dayMachine
                    console.log("AQUI"+value['days']);
                
                }else if(MOUNTHSBYNUMBER[mounth] === Number(todayMonth)){
                    value['days'] = Number(todayDate.getDate());
                
                }
                else{
                    var d = new Date(year,mounth+1,0);
                    d = d.getDate();
                    value['days'] = d;
                }
                if(value['days']>0){
                    itensDoneSum = itensDoneSum+value.countItens;
                }
                sumItens = sumItens + (value.procedures.length*value['days']*value['frequency']);
                
                return value;
            })
            var weeklyMachine = responseArray.weekly.map((value)=>{
                const dateMachine = new Date(value.date)
                var monthMachine = dateMachine.getMonth();
                var dayMachine = dateMachine.getDate();
                var todayMonth = initialDate.getMonth();
                if(monthMachine===todayMonth && MOUNTHSBYNUMBER[mounth] === todayMonth){
                    value['days'] = Math.floor((todayDate.getDate()-dayMachine)/7)
 
                
                }else if(MOUNTHSBYNUMBER[mounth] === todayMonth){
                    value['days'] = Math.floor(todayDate.getDate()/7);
                
                }
                else{
                    value['days'] = 4;
                }
                if(value['days']>0){
                    itensDoneSum = itensDoneSum+value.countItens;
                }
                sumItens = sumItens + (value.procedures.length*value['days']*value['frequency']);
                return value;
            })
            var biWeeklyMachine = responseArray.biweekly.map((value)=>{
                const dateMachine = new Date(value.date)
                var monthMachine = dateMachine.getMonth();
                var dayMachine = dateMachine.getDate();
                var todayMonth = initialDate.getMonth();
                if(monthMachine===todayMonth && MOUNTHSBYNUMBER[mounth] === todayMonth){
                    value['days'] = Math.floor((todayDate.getDate()-dayMachine)/15);
 
                
                }else if(MOUNTHSBYNUMBER[mounth] === Number(todayMonth)){
                    value['days'] = Math.floor(todayDate.getDate()/15);
                
                }
                else{
                    value['days'] = 2;
                }
                if(value['days']>0){
                    itensDoneSum = itensDoneSum+value.countItens;
                }
                
                sumItens = sumItens + (value.procedures.length*value['days']*value['frequency']);
                return value;
            })
            var monthMachine = responseArray.monthly.map((value)=>{
                if(MOUNTHSBYNUMBER[mounth]===todayDate.getMonth()){
                    value['days'] = 0
                
                }else{
                    value['days'] = 1;
                }
                if(value['days']>0){
                    itensDoneSum = itensDoneSum+value.countItens;
                }
                sumItens = sumItens + (value.procedures.length*value['days']*value['frequency']);
                return value;
            })
            setTotalItens(sumItens);
            setItensDone(itensDone);
            setDiary(diaryMachine);
            setMonthly(monthMachine);
            setWeekly(weeklyMachine);
            setBiweekly(biWeeklyMachine);
            console.log("total:"+sumItens);
            console.log("feitos:"+itensDoneSum);
            const itensDontDone = sumItens-itensDoneSum
            new Chart(chartRef.current,{
                
                type:'pie',
                data:{
                    datasets:[{
                        backgroundColor:['red','blue'],
                        data:[itensDontDone,itensDoneSum]
                    }],
                    labels:[
                        'Itens faltando',
                        'Itens feitos'
                    ]
                }
            })
        }
        fetchDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[year,mounth])
    function RenderMounth(){
        const fullYear = todayDate.getFullYear();
        console.log(todayDate.getFullYear());
        console.log(year);

       
        if(year === todayDate.getFullYear() && year === 2020){
            
            return (
                <Form>
                <Form.Group>
                <Form.Label>Mês</Form.Label>
                <Form.Control value={mounth} onChange={(e)=>{console.log(e.target.value);setMounth(e.target.value)}} as="select" custom> 
                               
                    {MOUNTHS.filter((value,index)=>
                     {
                        if(index>=initialDate.getMonth() && index<=todayDate.getMonth()){
                         return true;
                        }
                        return false;
                    }).map((value,index)=>
                    <option> {value.mounth} </option>)}
                </Form.Control>
                
                </Form.Group>
                </Form>
                
                
            
            
            )
        }else if(Number(year) === Number(fullYear) ){
            console.log('aquio');
            return (
                <Form>
                <Form.Group>
                    <Form.Label>Mês</Form.Label>
                    <Form.Control value={mounth} onChange={(e)=>{console.log(e.target.value);setMounth(e.target.value)}} as="select" custom> 
                                 
                    {MOUNTHS.filter((value,index)=>
                    {
                    if(index<=todayDate.getMonth()){
                        return true;
                    }
                    return false;
                    }).map((value,index)=><option> {value.mounth} </option>)}
                </Form.Control>
                </Form.Group>
                </Form>
                
                
            
            
            )

        }else if(year<todayDate.getFullYear()){
            return (
                <Form>
                <Form.Group>
                    <Form.Label>Mês</Form.Label>
                <Form.Control value={mounth} onChange={(e)=>{console.log(e.target.value);setMounth(e.target.value)}} as="select" custom> 
                                        
                    {MOUNTHS.map((value,index)=><option> {value.mounth} </option>)}
                </Form.Control>
                 </Form.Group>
                 </Form>
                
            )

        }else{
            return(
            <div>
                oi
                </div>)
        }
    }
    
    return(
        <>
        <div className="selects"> 
        <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Ano</Form.Label>
                <Form.Control  value={year} as="select" custom onChange={(e)=>setYear(Number(e.target.value))}>
                        {years.map((value)=> <option> {value} </option> )} 
                </Form.Control>
            </Form.Group>
        </Form>
        <RenderMounth/>
        </div>
        <div className="middle">
            <div className="machines">
                    <ListGroup>   
                              <ListGroup.Item active>Diário</ListGroup.Item>
                              {diary && diary.map((value)=>
                              (
                                  <>
                                <ListGroup.Item variant="primary">Nome: {value.name}</ListGroup.Item>
                                <ListGroup.Item>Frequência: {value.frequency}</ListGroup.Item>
                                <ListGroup.Item>Quant. checks esperados : {value.days*value.frequency}</ListGroup.Item>
                                <ListGroup.Item>Quant. checks realizados : {value.countChecked}</ListGroup.Item>
                                <ListGroup.Item>Quant. itens esperados : {(value.procedures.length)*value.frequency*value.days }</ListGroup.Item>
                                <ListGroup.Item>Quant. itens realizados : {value.countItens}</ListGroup.Item>
                                 </>
                                )
                              )}
                    </ListGroup>
                    <ListGroup>   
                              <ListGroup.Item active>Semanal</ListGroup.Item>
                              {weekly && weekly.map((value)=>
                              (
                                  <>
                                <ListGroup.Item variant="primary">Nome: {value.name}</ListGroup.Item>
                                <ListGroup.Item>Frequência: {value.frequency}</ListGroup.Item>
                                <ListGroup.Item>Quant. checks esperados : {value.days*value.frequency}</ListGroup.Item>
                                <ListGroup.Item>Quant. checks realizados : {value.countChecked}</ListGroup.Item>
                                <ListGroup.Item>Quant. itens esperados : {(value.procedures.length)*value.frequency*value.days }</ListGroup.Item>
                                <ListGroup.Item>Quant. itens realizados : {value.countItens}</ListGroup.Item>
                                 </>
                                )
                              )}
                    </ListGroup>
                    <ListGroup>   
                              <ListGroup.Item active>Quinzenal</ListGroup.Item>
                              {biweekly && biweekly.map((value)=>
                              (
                                  <>
                                <ListGroup.Item variant="primary">Nome: {value.name}</ListGroup.Item>
                                <ListGroup.Item>Frequência: {value.frequency}</ListGroup.Item>
                                <ListGroup.Item>Quant. checks esperados : {value.days*value.frequency}</ListGroup.Item>
                                <ListGroup.Item>Quant. checks realizados : {value.countChecked}</ListGroup.Item>
                                <ListGroup.Item>Quant. itens esperados : {(value.procedures.length)*value.frequency*value.days }</ListGroup.Item>
                                <ListGroup.Item>Quant. itens realizados : {value.countItens}</ListGroup.Item>
                                 </>
                                )
                              )}
                    </ListGroup>
                    <ListGroup>   
                              <ListGroup.Item active>Mensal</ListGroup.Item>
                              {monthly && monthly.map((value)=>
                              (
                                  <>
                                <ListGroup.Item variant="primary">Nome: {value.name}</ListGroup.Item>
                                <ListGroup.Item>Frequência: {value.frequency}</ListGroup.Item>
                                <ListGroup.Item>Quant. checks esperados : {value.days*value.frequency}</ListGroup.Item>
                                <ListGroup.Item>Quant. checks realizados : {value.countChecked}</ListGroup.Item>
                                <ListGroup.Item>Quant. itens esperados : {(value.procedures.length)*value.frequency*value.days }</ListGroup.Item>
                                <ListGroup.Item>Quant. itens realizados : {value.countItens}</ListGroup.Item>
                                 </>
                                )
                              )}
                    </ListGroup>
                
                
         
            </div>
            <div className="graph">
                <canvas className="pie"  ref={chartRef}/>
            </div>
        </div>
        </>
    )
}