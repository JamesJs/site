import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import MainScreen from './pages/mainscreen/MainScreen'
import OperatorScreen from './pages/operatorScreen'
import MaquinaScreen from './pages/maquinaScreen/MaquinaScreen'
import AddScreen from './pages/addScreen'
import CsvScreen from './pages/csvScreen'
import InfoScreen from './pages/infoScreen'
import EditScreen from './pages/editScreen'
import ResultScreen from './pages/resultScreen'
import LoginScreen from './pages/loginScreen'
import ClScreen from './pages/clScreen'
import StatisticScreen from './pages/statisticScreen'
import PrivateRoute from './utils/PrivateRoute'
import RegisterScreen from './pages/registerScreen';
import OperatorsEditScreen from './pages/operatorsEditScreen'
import OperatorsAddScreen from './pages/addOperatorScreen';
export default function Routes(){
    return(
        <BrowserRouter >
            <Switch >
                <Route path="/"  exact component={LoginScreen}/>
                <Route path="/register"  exact component={RegisterScreen}/>
                <PrivateRoute path="/mainScreen">
                    <MainScreen/>
                </PrivateRoute>
                <PrivateRoute path="/operator">
                    <OperatorScreen/>
                </PrivateRoute>
                <PrivateRoute path="/maquinas">
                    <MaquinaScreen/>
                </PrivateRoute>
                <PrivateRoute path="/add">
                    <AddScreen/>
                </PrivateRoute>
                <PrivateRoute  path="/info">
                    <InfoScreen/>
                </PrivateRoute>
                <PrivateRoute  path="/edit">
                    <EditScreen/>
                </PrivateRoute>
                <PrivateRoute  path="/result">
                    <ResultScreen/>
                </PrivateRoute>
                <PrivateRoute  path="/csv">
                    <CsvScreen/>
                </PrivateRoute>
                <PrivateRoute  path="/cl">
                    <ClScreen/>
                </PrivateRoute>
                <PrivateRoute  path="/statistic">
                    <StatisticScreen/>
                </PrivateRoute>
                <PrivateRoute  path="/operatoredit">
                    <OperatorsEditScreen/>
                </PrivateRoute> 
                <PrivateRoute  path="/operatoradd">
                    <OperatorsAddScreen/>
                </PrivateRoute>                  
            </Switch>
        </BrowserRouter>
    )
}