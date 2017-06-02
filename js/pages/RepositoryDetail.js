/**
 * Created by zhangxuan on 2017/6/2.
 */
import React, {Component} from 'react'
import {
    View,
    WebView,
    Image,
    BackHandler
} from 'react-native'
import NavigationBar from '../common/NavigationBar'

export default class RepositoryDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: this.props.navigation.state.params.data.name,
            canGoBack: false
        }

    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress',()=>this.onBack())
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress',()=>this.onBack())
    }


    renderLeftButton() {
        return <View>
            <Image source={require('../../res/images/ic_arrow_back_white_36pt.png')} style={{width: 24, height: 24,}}/>
        </View>
    }

    onBack() {
        if (this.state.canGoBack) {
           this.webView.goBack()
        } else {
            this.props.navigation.goBack()
        }
        return true
    }

    render() {
        return <View style={{flex: 1}}>
            <NavigationBar title={this.state.title} leftButton={this.renderLeftButton()}
                           onLeftButtonClick={()=>this.onBack()}/>
            <WebView
                ref = {webview => this.webView = webview}
                source={{uri: this.props.navigation.state.params.data.html_url}} startInLoadingState={true}
                onNavigationStateChange={(e) => {
                    this.setState({
                        canGoBack: e.canGoBack,
                    })
                }
                }/>
        </View>
    }
}