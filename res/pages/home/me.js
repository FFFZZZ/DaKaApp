import React, {
    Component
} from 'react'
import {
    StyleSheet,
    View,
    StatusBar,
    Text,
    Image
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class home extends Component {

    static navigationOptions = {
        headerLeft: null,
        headerTitle: '我',
        headerStyle: {
            backgroundColor: '#6699ff',
        },
        headerTitleStyle: {
            alignSelf: 'center',
            fontWeight:'100',
            color:'#ffffff'
        },
        tabBarLabel: '我',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="account-outline" size={30} color={tintColor} />
        ),
    }

    render() {
        return (
            <View style={[styles.container]}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    icon: {
        width: 22
    }
});