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
import Card from '../../Components/card';
import config from '../../config/config'

export default class home extends Component {

    static navigationOptions = {
        headerLeft: null,
        headerTitle: '打卡',
        headerStyle: {
            backgroundColor: '#6699ff',
        },
        headerTitleStyle: {
            alignSelf: 'center',
            fontWeight: '100',
            color: '#ffffff'
        },
        tabBarLabel: '打卡',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="map-marker-outline" size={30} color={tintColor} />
        ),
    }

    render() {
        //#f8f8f8
        const statusbar = <StatusBar
            backgroundColor={'#6699ff'}
            barStyle={'light-content'}
            hidden={false}
            translucent={false}
        />
        return (
            <View style={[styles.container]}>
                {statusbar}
                <Card workAddress={config.address} type={0} />
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