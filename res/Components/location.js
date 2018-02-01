import React, {
    Component
} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Platform,
    NativeAppEventEmitter,
    DeviceEventEmitter,
    Alert
} from 'react-native'

import AMapLocation from 'react-native-smart-amap-location'
import {Button} from 'react-native-elements'

export default class location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            location: ''
        };
    }
    componentDidMount() {
        AMapLocation.init(null);
        if (Platform.OS === 'ios') {
            this.listener = NativeAppEventEmitter.addListener('amap.location.onLocationResult', (data) => {
                Alert.alert(JSON.stringify(data))
            })
        } else {
            this.listener = DeviceEventEmitter.addListener('amap.location.onLocationResult', (data) => {
                Alert.alert(JSON.stringify(data))
            })
        }
    }
    componentWillUnmount() {
        //停止并销毁定位服务
        AMapLocation.cleanUp();
        this.listener.remove();
    }
    render() {
        return (
            <View>
                <Button title="开始定位" onPress={()=>{this._showReGeocode()}} >
                </Button>
                <Text style={styles.text}>
                    {this.state.type}
                </Text>
            </View>
        );
    }
    //单次定位并返回逆地理编码信息
    _showReGeocode() {
        this.setState({
            type: '逆地理编码信息'
        })
        AMapLocation.getReGeocode()
    }

    //单次定位并返回地理编码信息
    _showLocation = () => {
        this.setState({
            type: '地理编码信息'
        })
        AMapLocation.getLocation()
    }
    _onLocationResult = (result) => {

        if (result.error) {
            Alert.alert(`错误代码: ${result.error.code}, 错误信息: ${result.error.localizedDescription}`)
        }
        else {
            if (result.formattedAddress) {
                Alert.alert(`格式化地址 = ${result.formattedAddress}`)
            }
            else {
                Alert.alert(`纬度 = ${result.coordinate.latitude}, 经度 = ${result.coordinate.longitude}`)
            }
        }
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#9641b2',
        height: 30,
        width: 70,
        alignSelf: 'center',
        margin: 10
    },
    text: {
        color: '#fafafa',
        lineHeight: 30
    }
})
