/**
 * Created by Administrator on 2017/5/10.
 */
import React,{Component,PropTypes} from 'react'
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    Platform
} from 'react-native'

const NAV_BAR_HEIGHT_IOS = 44;
const NAV_BAR_HEGHT_ANDROID = 50;
const STATUS_BAR_HEIGHT = 20;
const statusBarShape = {
    hidden:PropTypes.bool,

}

export default class NavigationBar extends Component{

    static defaultProps = {
        title:'',
        hide:false,
        statusBar:{
            backgroundColor:'#2196F3',
        },
        leftButton:<View></View>,
        rightButton:<View></View>
    }

    static propTypes={
        title:PropTypes.string,
        leftButton:PropTypes.element,
        rightButton:PropTypes.element,
        statusBar:PropTypes.shape(statusBarShape),
        hide:PropTypes.bool
    }



    render(){
        return  <View style= {styles.container}>
            <StatusBar {...this.props.statusBar}/>
            {this.props.hide?null:<View style={styles.nav}>
                {this.props.leftButton}
                <Text style={styles.title}>{this.props.title}</Text>
                {this.props.rightButton}
            </View>}
        </View>
    }
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:'#000',
    },
    nav:{
        flexDirection:'row',
        height:Platform.OS === 'ios'?NAV_BAR_HEIGHT_IOS:NAV_BAR_HEGHT_ANDROID,
        alignItems:'center',
        justifyContent:'space-between'
    },
    title:{
        backgroundColor:'red',
        color:'white',
        fontSize:16,
    }
})