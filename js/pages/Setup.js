/**
 * Created by Administrator on 2017/5/10.
 */
import React,{Component} from 'react'
import {
    StackNavigator
} from 'react-navigation'
import {
    Text
} from 'react-native'
import WelcomePage from './WelcomePage'
import HomePage from './HomePage'
import NavigationBar from "../common/NavigationBar";
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
            header: <NavigationBar title='首页' leftButton={<Text style={{color:'white',backgroundColor:'red'}}>返回</Text>} />
        })
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

