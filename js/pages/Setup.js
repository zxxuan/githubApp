/**
 * Created by Administrator on 2017/5/10.
 */
import React, {Component} from "react";
import {StackNavigator} from "react-navigation";
import WelcomePage from "./WelcomePage";
import HomePage from "./HomePage";
import CustomKeyPage from "./CustomKeyPage";
import SortKeysPage from "./SortKeysPage";
import WebViewTest from './WebViewTest'
import RepositoryDetail from './RepositoryDetail'
const AllRoute = {
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: () => ({
            header: null
        })
    },
    HomePage: {
        screen: HomePage,
        navigationOptions: () => ({
            header: null
        })
    },
    CustomKeyPage: {
        screen: CustomKeyPage,
        navigationOptions: () => {
            return {header: null}
        }
    },
    SortKeysPage: {
        screen: SortKeysPage,
        navigationOptions: () => {
            return {header: null}
        }
    },
    WebViewTest: {
        screen: WebViewTest,
        navigationOptions: () => {
            return {header: null}
        }
    },
    RepositoryDetail: {
        screen: RepositoryDetail,
        navigationOptions: () => {
            return {header: null}
        }
    }
}

export default function setup() {
    class Root extends Component {
        render() {
            return <MainNavigator/>
        }
    }
    return <Root/>
}

var MainNavigator = StackNavigator({
    ...AllRoute
})

