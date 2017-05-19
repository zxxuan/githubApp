/**
 * Created by Administrator on 2017/5/19.
 */
import React,{Component} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ToastAndroid
} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import KeysDao,{FLAG_LANGUAGE} from '../dao/KeysDao'

export default class CustomKeyPage extends Component{

    constructor(props){
        super(props)
        this.keysDao = new KeysDao(FLAG_LANGUAGE.flag_key)
        this.state = {
            keys:[]
        }
    }

    componentDidMount(){
        this.keysDao.fetchKeys()
            .then(result=>{
                this.setState({
                    keys:result
                })
            })
            .catch(error=>{
                console.log(JSON.stringify(error))
            })
    }

    render(){
        return <View>
            <NavigationBar title="自定义标签" leftButton={this.renderLeftButton()} onLeftButtonClick={()=> this.props.navigation.goBack()}
                rightButton={this.renderRightButton()}
            />
          {/*  <Text>{JSON.stringify(this.state.keys)}</Text>*/}
            {this.state.keys.map((value)=>{
                return <Text>{value.name}</Text>
            })
            }
        </View>
    }


    renderLeftButton(){
        return <View>
            <Image source={require('../../res/images/ic_arrow_back_white_36pt.png')} style={{width:24,height:24,}}/>
        </View>
    }
    renderRightButton(){
        return    <View>
            <TouchableOpacity onPress={()=>ToastAndroid.show('保存',ToastAndroid.SHORT)}>
                <Text  style={{color:'white',fontSize:14}}>保存</Text>
            </TouchableOpacity>
        </View>
    }
}