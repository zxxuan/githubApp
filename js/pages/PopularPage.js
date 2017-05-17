/**
 * Created by Administrator on 2017/5/17.
 */

import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'

export default class PopularPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: ''
        }
    }

    componentDidMount() {
        fetch('http://rapapi.org/mockjsdata/19157/user.json')
            .then((response) => {
                console.log(response)
                let result = response.json()
                console.log(result)
                return result
            })
            .then((user) => {
                this.setState({
                    user: JSON.stringify(user)
                })
            })
            .catch((error) => {
                this.setState({
                    user: JSON.stringify(error)
                })
            })
    }

    submit(user) {
        fetch('http://rapapi.org/mockjsdata/19157/submit/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    user: JSON.stringify(result)
                })
            })
            .catch(error => {
                this.setState({
                    user: JSON.stringify(error)
                })
            })

    }

    render() {
        return <View>
            <Text onPress={() => {
                this.submit({name: 'aaa', age: 18})
            }}>{this.state.user}</Text>
        </View>
    }
}