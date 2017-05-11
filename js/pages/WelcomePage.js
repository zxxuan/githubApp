/**
 * Created by Administrator on 2017/5/10.
 */
import React ,{Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import {
    NavigationActions
} from 'react-navigation'

export default class WelcomePage extends Component{

    componentDidMount(){
        setTimeout(()=>{
            const resetAction = NavigationActions.reset({
                index:0,
                actions:[
                    NavigationActions.navigate({routeName:'HomePage'})
                ]
            })
            this.props.navigation.dispatch(resetAction)
        },2000)
    }

    render(){
        return <View>
            <Text>欢迎页</Text>
        </View>
    }
}