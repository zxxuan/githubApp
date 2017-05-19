/**
 * Created by Administrator on 2017/5/18.
 */
import React,{Component} from 'react'
import {
    View,
    TextInput,
    Text,
    AsyncStorage,
    ToastAndroid
} from 'react-native'

export default class AsyncStorageTest extends Component{
    constructor(props){
        super(props)
        this.state = {
            text:''
        }
    }
    render(){
        return <View>
            <TextInput onChangeText={(text)=>this.text = text} defaultValue={this.state.text}/>
            <Text onPress={()=>this.save()}>保存</Text>
            <Text onPress={()=>this.del()}>删除</Text>
            <Text onPress={()=>this.get()}>取出</Text>
        </View>
    }

    del(){
        AsyncStorage.removeItem("Key",(error)=>{
            if(error){
                ToastAndroid.show("删除失败",ToastAndroid.LONG)
            }else{
                ToastAndroid.show(`删除成功`,ToastAndroid.LONG)
            }
        })
    }
    get(){
        AsyncStorage.getItem("Key",(error,result)=>{
            if(error){
                ToastAndroid.show('取出失败',ToastAndroid.LONG)
            }else{
                //ToastAndroid.show('取出成功',ToastAndroid.LONG)
                if (result){
                    ToastAndroid.show(`取出${result}成功`,ToastAndroid.LONG)
                }else{
                    ToastAndroid.show(`结果不存在`,ToastAndroid.LONG)
                }
                this.setState({
                    text:result
                })
            }
        })
    }

    save(){
        AsyncStorage.setItem("Key",this.text,(error)=>{
            if(error){
                ToastAndroid.show('保存失败',ToastAndroid.LONG)
            }else{
                ToastAndroid.show('保存成功',ToastAndroid.LONG)
            }
        })
    }
}