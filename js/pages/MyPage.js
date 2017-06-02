/**
 * Created by Administrator on 2017/5/19.
 */

import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import NavigationBar from '../common/NavigationBar'

export default class MyPage extends Component {
    render() {
        return <View>
            <NavigationBar title='我的'/>
            <TouchableOpacity onPress={() =>
                this.props.navigation.navigate('CustomKeyPage')
            }>
                <Text>自定义标签</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>
                this.props.navigation.navigate('SortKeysPage')
            }>
                <Text>标签排序</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() =>
                this.props.navigation.navigate('WebViewTest')
            }>
                <Text>WebView使用</Text>
            </TouchableOpacity>
        </View>
    }
}