/**
 * Created by zhangxuan on 2017/6/2.
 */
import React, {Component} from 'react'
import {
    View,
    WebView,
    Text,
    TextInput,
    DeviceEventEmitter
} from 'react-native'
var URL = 'http://www.imooc.com'

export default class WebViewTest extends Component {

    constructor(props) {
        super(props)
        this.state = {
            url: URL,
            title:'',
            canGoBack:false
        }
    }

    onNavigationStateChange(e){
        this.setState({
            title:e.title,
            canGoBack:e.canGoBack
        })
    }

    render() {
        return <View style={{flex: 1}}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Text onPress={() => {
                    if (this.state.canGoBack){
                        this.webView.goBack()
                    }else{
                        DeviceEventEmitter.emit('dataChangeListener',`${this.state.title}到顶了`)
                        this.props.navigation.goBack()
                    }
                }
                }>返回</Text>
                <TextInput
                    underlineColorAndroid={'transparent'}
                    style={{alignItems: 'center', height: 40, flex: 1, borderWidth: 1, marginBottom: 5}}
                    defaultValue={this.state.url}
                    onChangeText={(text) => this.text = text}
                />
                <Text onPress={() => {
                    this.setState({
                        url: this.text
                    })
                }
                }>前进</Text>
            </View>
            <WebView
                ref = {(webView)=>this.webView = webView }
                source={{uri: this.state.url}}
                onNavigationStateChange={(e) =>this.onNavigationStateChange(e)}
            />
        </View>
    }
}