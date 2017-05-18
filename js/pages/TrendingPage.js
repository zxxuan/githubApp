/**
 * Created by Administrator on 2017/5/18.
 */
import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view'

export default class TrendingPage extends Component {
    render() {
        return (
            <ScrollableTabView renderTabBar={() => <DefaultTabBar/>}>
                <Text tabLabel='Tab1'>MY</Text>
                <Text tabLabel='Tab2'>MY</Text>
                <Text tabLabel='Tab3'>MY</Text>
                <Text tabLabel='Tab4'>MY</Text>
            </ScrollableTabView>
        )
    }
}