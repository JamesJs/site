import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import MainScreen from './pages/mainscreen/MainScreen'
import UserScreen from './pages/usersScreen/UserScreen'
import MaquinaScreen from './pages/maquinaScreen/MaquinaScreen'
import addScreen from './pages/addScreen'
import infoScreen from './pages/infoScreen'
import EditScreen from './pages/editScreen'
import ResultScreen from './pages/resultScreen'
export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={MainScreen}/>
                <Route path="/users" exact component={UserScreen}/>
                <Route path="/maquinas" exact component={MaquinaScreen}/>
                <Route path="/add" exact component={addScreen}/>
                <Route path="/info" exact component={infoScreen}/>
                <Route path="/edit" exact component={EditScreen}/>
                <Route path="/result" exact component={ResultScreen}/>
            </Switch>
        </BrowserRouter>
    )
}