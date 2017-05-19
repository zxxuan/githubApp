/**
 * Created by Administrator on 2017/5/10.
 */
import React, {Component, PropTypes} from 'react'
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    Platform,
    ViewPropTypes
} from 'react-native'

const NAV_BAR_HEIGHT_IOS = 44;
const NAV_BAR_HEGHT_ANDROID = 50;
const STATUS_BAR_HEIGHT = 20;
const statusBarShape = {
    hidden: PropTypes.bool,
    translucent: PropTypes.bool,
    barStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
    backgroundColor: PropTypes.string,
}

export default class NavigationBar extends Component {

    static defaultProps = {
        title: '',
        hide: false,
        statusBar: {
            backgroundColor: '#2196F3',
        },
        leftButton: <View></View>,
        rightButton: <View></View>
    }

    static propTypes = {
        style: ViewPropTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        leftButton: PropTypes.element,
        rightButton: PropTypes.element,
        statusBar: PropTypes.shape(statusBarShape),
        hide: PropTypes.bool,
        onLeftButtonClick: PropTypes.func,
        onRightButtonClick: PropTypes.func,
    }


    render() {
        return <View style={[styles.container, this.props.style]}>
            <StatusBar {...this.props.statusBar}/>
            {this.props.hide ? null :
                <View style={styles.nav}>
                    <TouchableOpacity onPress={this.props.onLeftButtonClick}>{this.props.leftButton ?
                        <View style={{marginLeft:5}}>{this.props.leftButton}</View> : <View></View> }
                    </TouchableOpacity>
                    {this.props.titleView ? <View style={styles.titleContainer}>{this.props.titleView}</View> :
                        <View style={styles.titleContainer}><Text style={styles.title}>{this.props.title}</Text></View>}
                    <TouchableOpacity onPress={this.props.onRightButtonClick}>{this.props.rightButton ?
                        <View style={{marginRight:10}}>{this.props.rightButton}</View> : <View></View> }
                    </TouchableOpacity>
                </View>}
        </View>
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2196F3',
    },
    nav: {
        flexDirection: 'row',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEGHT_ANDROID,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        color: 'white',
        fontSize: 18,

    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left:45,
        right:45,
        top: 0,
        bottom: 0,
    }
})