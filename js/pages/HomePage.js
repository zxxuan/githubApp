/**
 * Created by Administrator on 2017/5/10.
 */
/**
 * Created by Administrator on 2017/5/10.
 */
import React, {Component} from 'react'
import {
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native'
import {
    NavigationActions
} from 'react-navigation'

import TabNavigator from 'react-native-tab-navigator'
import PopularPage from './PopularPage'
import TrendingPage from './TrendingPage'
import {main_color} from '../config/config'

export default class HomePage extends Component {

    constructor(props){
        super(props)
        this.state = {
            selectedTab:'Popular'
        }
    }

    renderItem(Component,title,icon,selectedTab){
        return <TabNavigator.Item
            selectedTitleStyle={{color:main_color}}
            selected={this.state.selectedTab === selectedTab}
            title={title}
            renderIcon={()=><Image style={styles.icon}  source={icon}/> }
            renderSelectedIcon={()=><Image style={[styles.icon,{tintColor:main_color}]} source={icon}/>}
            onPress={()=>
                this.setState({
                    selectedTab:selectedTab
                })
            }
        >
           <Component/>
        </TabNavigator.Item>
    }

    render() {
        return <TabNavigator>
            {this.renderItem(PopularPage,'Popular',require('../../res/images/ic_polular.png'),'Popular')}
            {this.renderItem( TrendingPage,'Trending',require('../../res/images/ic_trending.png'),'Trending')}
            {this.renderItem( PopularPage,'Favorite',require('../../res/images/ic_favorite.png'),'Favorite')}
            {this.renderItem( PopularPage,'My',require('../../res/images/ic_my.png'),'My')}
        </TabNavigator>
    }

}
const styles = StyleSheet.create({
    page1:{
        flex:1,
        backgroundColor:'red'
    },
    page2:{
        flex:1,
        backgroundColor:'blue'
    },
    page3:{
        flex:1,
        backgroundColor:'green'
    },
    page4:{
        flex:1,
        backgroundColor:'pink'
    },
    icon:{
        height:22,
        width:22
    }
})