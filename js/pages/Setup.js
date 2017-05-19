/**
 * Created by Administrator on 2017/5/10.
 */
import React, {Component} from "react";
import {StackNavigator} from "react-navigation";
import WelcomePage from "./WelcomePage";
import HomePage from "./HomePage";
import CustomKeyPage from "./CustomKeyPage";
const AllRoute = {
    WelcomePage:{
        screen:WelcomePage,
        navigationOptions:()=>({
            header:null
        })
    },
    HomePage:{
        screen:HomePage,
        navigationOptions:()=>({
            header:null
        })
    },
    CustomKeyPage:{
        screen:CustomKeyPage,
        navigationOptions:()=>{
            return {header:null}
        }
    }
}

export default function setup() {
    class Root extends Component{
        render(){
            return <MainNavigator/>
        }
    }
    return <Root/>
}

var MainNavigator = StackNavigator({
    ...AllRoute
})

