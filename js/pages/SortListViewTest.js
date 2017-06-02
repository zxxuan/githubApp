/**
 * Created by zhangxuan on 2017/6/1.
 */
import React,{Component} from 'react'
import {
    View,
    Text,
    TouchableHighlight
} from 'react-native'
import SortableListView from 'react-native-sortable-listview'
let list = {
    hello: {text: 'world'},
    how: {text: 'are you'},
    test: {text: 123},
    this: {text: 'is'},
    a: {text: 'a'},
    real: {text: 'real'},
    drag: {text: 'drag and drop'},
    bb: {text: 'bb'},
    cc: {text: 'cc'},
    dd: {text: 'dd'},
    ee: {text: 'ee'},
    ff: {text: 'ff'},
    gg: {text: 'gg'},
    hh: {text: 'hh'},
    ii: {text: 'ii'},
    jj: {text: 'jj'},
    kk: {text: 'kk'}
}

let order = Object.keys(list); //Array of keys
class RowComponent extends Component{
    render() {
        return  <TouchableHighlight
            underlayColor={'#eee'}
            style={{padding: 25, backgroundColor: "#F8F8F8", borderBottomWidth:1, borderColor: '#eee'}}
            {...this.props.sortHandlers}
        >
            <Text>aaa</Text>
        </TouchableHighlight>
    }
}

export default class SortListViewTest extends Component{
    render(){
        return <Text>aaa</Text>
    }
}