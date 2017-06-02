/**
 * Created by zhangxuan on 2017/5/31.
 */
import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    Alert,
    BackHandler
} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import SortableListView from 'react-native-sortable-listview'
import KeysDao, {FLAG_LANGUAGE} from '../dao/KeysDao'
import ArrayUtils from '../utils/ArrayUtils'

export default class SortKeysPage extends Component {

    constructor(props) {
        super(props)
        this.originalCheckedArray = []
        this.dataArray = []
        this.resultArray = []
        this.state = {
            data: []
        }
        this.keysDao = new KeysDao(FLAG_LANGUAGE.flag_key)
        this.back = this._onBack.bind(this)
    }

    componentDidMount() {
        this.keysDao.fetchKeys()
            .then(data => {
                this.dataArray = data
                let checkedArray = []
                for (var i = 0; i < data.length; i++) {
                    if (data[i].checked) {
                        checkedArray.push(data[i])
                    }
                }
                this.setState({
                    data: checkedArray
                })
                this.originalCheckedArray = ArrayUtils.clone(checkedArray)
            })
            .catch((e) => {

            })
        BackHandler.addEventListener("hardwareBackPress", this.back)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.back)
    }

    _onBack() {
        this.onBack()
        return true
    }


    render() {
        return <View style={{flex: 1}}>
            <NavigationBar leftButton={this.renderLeftButton()}
                           onLeftButtonClick={() => this.onBack()}
                           rightButton={this.renderRightButton()}
                           onRightButtonClick={() => this.onSave()}
                           title='标签排序'></NavigationBar>
            <SortableListView
                style={{flex: 1}}
                order={Object.keys(this.state.data)}
                data={this.state.data}
                onRowMoved={(e) => {
                    this.state.data.splice(e.to, 0, this.state.data.splice(e.from, 1)[0])
                    this.forceUpdate()
                }}
                renderRow={(row) => <SortCell data={row}></SortCell>}
            ></SortableListView>
        </View>
    }

    onBack() {
        if (!ArrayUtils.isEqual(this.originalCheckedArray, this.state.data)) {
            Alert.alert('提示', '要保存修改吗?', [{
                text: '确定',
                onPress: () => {
                    this.onSave()
                }
            }, {
                text: '取消',
                onPress: () => this.props.navigation.goBack()
            }])
        } else {
            this.props.navigation.goBack()
        }
    }

    onSave() {
        this.resultArray = ArrayUtils.clone(this.dataArray)
        if (!ArrayUtils.isEqual(this.originalCheckedArray, this.state.data)) {
            for (let i = 0; i < this.originalCheckedArray.length; i++) {
                let index = this.dataArray.indexOf(this.originalCheckedArray[i])
                this.resultArray.splice(index, 1, this.state.data[i])
            }

            this.keysDao.saveToDao(this.resultArray)
        }

        this.props.navigation.goBack()
    }

    renderLeftButton() {
        return <View>
            <Image source={require('../../res/images/ic_arrow_back_white_36pt.png')} style={{width: 24, height: 24,}}/>
        </View>
    }

    renderRightButton() {
        return <View>
            <Text style={{color: 'white', fontSize: 14}}>保存</Text>
        </View>
    }

}


class SortCell extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <TouchableHighlight
            underlayColor={'#eee'}
            {...this.props.sortHandlers}
        >
            <View style={styles.sortItem}>
                <Image source={require('../../res/images/ic_sort.png')} style={styles.itemImage}/>
                <Text>{this.props.data.name}</Text>
            </View>

        </TouchableHighlight>
    }
}

const styles = StyleSheet.create({
    sortItem: {
        flex: 1,
        flexDirection: 'row',
        height: 45,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    itemImage: {
        marginLeft: 5,
        width: 18,
        height: 18,
        tintColor: '#2196F3'
    },
    itemText: {
        marginLeft: 5
    }
})