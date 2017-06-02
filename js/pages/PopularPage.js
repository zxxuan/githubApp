/**
 * Created by Administrator on 2017/5/17.
 */

import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    ListView,
    RefreshControl,
    TouchableNativeFeedback
} from 'react-native'
import DataRepository from '../dao/DataRepository'
import NavigationBar from '../common/NavigationBar'
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view'
import {main_color, white, white_translucent} from '../config/config'
import KeysDao, {FLAG_LANGUAGE} from '../dao/KeysDao'


export default class PopularPage extends Component {

    constructor(props) {
        super(props)
        this.keysDao = new KeysDao(FLAG_LANGUAGE.flag_key)
        this.state = {
            keys: []
        }
    }

    componentDidMount() {
        this.keysDao.fetchKeys()
            .then(keys => {
                this.setState({
                    keys: keys
                })
            })
            .catch((error) => {
            })
    }


    render() {
        let content = this.state.keys.length === 0 ? null : <ScrollableTabView
            tabBarBackgroundColor={main_color}
            tabBarActiveTextColor={white}
            tabBarInactiveTextColor={white_translucent}
            tabBarTextStyle={{fontSize: 14}}
            tabBarUnderlineStyle={{
                height: 2,
                backgroundColor: white
            }}
            renderTabBar={() => <ScrollableTabBar/>}
        >
            {this.state.keys.map((item, index, arr) => {
                return item.checked ? <PopularItemPage navigation = {this.props.navigation} style={{flex: 1}} key={index}
                                                       tabLabel={item.name}>{item.name}</PopularItemPage> : null
            })}
        </ScrollableTabView>


        return (<View style={{flex: 1}}>
            <NavigationBar style={{backgroundColor: main_color}} title='Popular'
                           rightButton={<Image style={{width: 24, height: 24}}
                                               source={require('../../res/images/ic_search_white_48pt.png')}/>}/>
            {content}
        </View>)
    }


}


class PopularItemPage extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
        this.state = {
            dataSource: ds,
            result: '',
            isLoading: true
        }
        this.dataRepository = new DataRepository()
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        console.log(this.props.tabLabel)
        var URL = `https://api.github.com/search/repositories?q=${this.props.tabLabel}&sort=stars`
        this.dataRepository.fetchRepository(URL)
            .then(result => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(result.items),
                    isLoading: false
                })
            }).catch((error) => {
            this.setState({
                result: JSON.stringify(error)
            })
        })
    }

    render() {
        return <View style={{flex: 1}}>
            <ListView dataSource={this.state.dataSource}
                      renderRow={(rowData) =>
                          this.renderRow(rowData)
                      }
                      refreshControl={
                          <RefreshControl refreshing={this.state.isLoading} onRefresh={() => this.loadData()}
                                          colors={[main_color]}/>
                      }
            />
        </View>

    }

    renderRow(data) {
        return(<TouchableNativeFeedback onPress = {()=>{
            this.props.navigation.navigate('RepositoryDetail',{data:data})
        }}>
            <View style={styles.row}>
                <Text style={styles.title}>{data.full_name}</Text>
                <Text style={styles.description}>{data.description}</Text>
                <View style={styles.avatarContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>Author:</Text>
                        <Image source={{uri: data.owner.avatar_url, width: 22, height: 22}}/>
                    </View>
                    <Text>Stars:{data.stargazers_count}</Text>
                    <Image source={require('../../res/images/ic_star.png')} style={{width: 22, height: 22}}></Image>
                </View>
            </View></TouchableNativeFeedback>)
    }
}

const styles = StyleSheet.create({
    row: {
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderRadius: 2,
        borderColor: '#dddddd',
        shadowRadius: 1,
        shadowColor: 'red',
        shadowOffset: {width: 0.5, height: 0.5},
        elevation: 2,
        margin: 5
    },
    title: {
        fontSize: 16,
        color: '#212121',
        marginBottom: 2,
        marginTop: 5,
    },

    description: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 2
    },

    avatarContainer: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    }
})
