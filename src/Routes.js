import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import MainScreen from './pages/mainscreen/MainScreen'
import UserScreen from './pages/usersScreen/UserScreen'
import MaquinaScreen from './pages/maquinaScreen/MaquinaScreen'
import AddScreen from './pages/addScreen'
import CsvScreen from './pages/csvScreen'
import InfoScreen from './pages/infoScreen'
import EditScreen from './pages/editScreen'
import ResultScreen from './pages/resultScreen'
import LoginScreen from './pages/loginScreen'
import ClScreen from './pages/clScreen'
import PrivateRoute from './utils/PrivateRoute'

export default function Routes(){
    return(
        <BrowserRouter >
            <Switch >
                <Route path="/"  exact component={LoginScreen}/>
                <PrivateRoute path="/mainScreen">
                    <MainScreen/>
                </PrivateRoute>
                <PrivateRoute path="/users">
                    <UserScreen/>
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
            </Switch>
        </BrowserRouter>
    )
}