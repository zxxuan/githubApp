/**
 * Created by Administrator on 2017/5/10.
 */
import React,{Component} from 'react'
import {
    StackNavigator
} from 'react-navigation'
import {
    Text,
    Image
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
            header: <NavigationBar  style={{backgroundColor:'#2196F3'}} title='首页' rightButton={<Image style={{width:24,height:24}} source={require('../../res/images/ic_search_white_48pt.png')}/>} />
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

