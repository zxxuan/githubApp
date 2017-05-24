/**
 * Created by Administrator on 2017/5/19.
 */
import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ToastAndroid,
    StyleSheet,
    Alert,
    BackHandler
} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import KeysDao, {FLAG_LANGUAGE} from '../dao/KeysDao'
import CheckBox from 'react-native-check-box'
import BackPressComponent from '../common/BackPressComponent'


export default class CustomKeyPage extends Component {

    constructor(props) {
        super(props)
        this.keysDao = new KeysDao(FLAG_LANGUAGE.flag_key)
        this.changeKeys = []
        this.state = {
            dataArrays: [],
            checked: false
        }
        this.backPress = new BackPressComponent({backPress:(e)=>this.onBackPress(e)})
    }

    componentDidMount() {
        this.keysDao.fetchKeys()
            .then(result => {
                this.setState({
                    dataArrays: result
                })
            })
            .catch(error => {
                console.log(JSON.stringify(error))
            })
      this.backPress.componentDidMount()
    }


    componentWillUnmount(){
        this.backPress.componentWillUnmount()
    }

    onBackPress(e){
            this.onBack()
            return true

    }

    onRightButtonClick() {
        if (this.changeKeys.length !== 0) {
            this.keysDao.saveToDao(this.state.dataArrays)
            //this.keysDao.cleanKeys()
        }
        this.props.navigation.goBack()
    }

    onBack(){
        if (this.changeKeys.length === 0) {
            this.props.navigation.goBack()
        } else {
            Alert.alert('提示', '要保存修改吗?', [{
                text: '确定', onPress: () => {
                    this.keysDao.saveToDao(this.state.dataArrays)
                    this.props.navigation.goBack()
                }
            }, {text: '取消', onPress: () => this.props.navigation.goBack()}])
        }
    }

    render() {
        return <View style={{flex: 1}}>
            <NavigationBar title="自定义标签" leftButton={this.renderLeftButton()}
                           onLeftButtonClick={() => this.onBack()}
                           rightButton={this.renderRightButton()}
                           onRightButtonClick={() => this.onRightButtonClick()}
            />

            {this.renderViews()}


        </View>
    }


    renderViews() {
        var views = []
        let len = this.state.dataArrays.length

        for (let i = 0; i <= len - 1; i += 2) {
            views.push(<View key={i}>
                <View style={[styles.ll_checkbox_container, {flexDirection: 'row'}]}>
                    {this.renderCheckBox(this.state.dataArrays[i])}
                    {(i + 1 > len - 1) ? null : this.renderCheckBox(this.state.dataArrays[i + 1])}
                </View>

                <View style={styles.line}/>
            </View>)
        }

        return views
    }

    renderCheckBox(data) {
        return (<CheckBox style={{flex: 1}}
                          isChecked={data.checked}
                          leftText={data.name}
                          onClick={() => this.onCheckBoxClick(data)}
                          leftTextStyle={{color: 'black', marginLeft: 10}}
                          checkedImage={<Image source={require('../../res/images/ic_check_box.png')}
                                               style={{tintColor: '#6495ed'}}></Image>}
                          unCheckedImage={<Image source={require('../../res/images/ic_check_box_outline_blank.png')}
                                                 style={{tintColor: '#6495ed'}}/>}
        />)
    }

    onCheckBoxClick(data) {
        data.checked = !data.checked
        if (this.changeKeys.findIndex((value, index, arr) => {
                this.index = index
                return data === value
            }) !== -1) {
            this.changeKeys.splice(this.index, 1)
        } else {
            this.changeKeys.push(data)
        }

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

const styles = StyleSheet.create({
    ll_checkbox_container: {
        padding: 10
    },
    line: {
        backgroundColor: 'darkgray',
        height: 0.3
    }
})