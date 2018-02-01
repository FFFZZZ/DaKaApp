import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    StatusBar
} from 'react-native';


export default class welcome extends Component {
    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.props.navigation.navigate('Main')
        }, 2000);
    }
    componentWillUnMount() {
        this.timer && clearTimeout(this.timer);
    }
    render() {
        return (
            <Image style={style.container} source={require('./wolcome.png')}>
                <StatusBar
                    translucent={true}
                    animated={true}
                    barStyle='dark-content'
                    backgroundColor='rgba(0,0,0,0)'
                />
            </Image>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null,
        backgroundColor: 'rgba(0,0,0,0)',
    }
})