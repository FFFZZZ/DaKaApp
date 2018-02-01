import React, {
    Component
} from 'react'
import {
    View,
    Text,
    WebView,
    Platform,
    NativeAppEventEmitter,
    DeviceEventEmitter,
    StyleSheet,
    Alert
} from 'react-native'
import {
    Button
} from 'react-native-elements'

import Tip from './tip'

import AMapLocation from 'react-native-smart-amap-location'

export default class Attend extends Component {
    webView = null
    constructor(props) {
        super(props);
        this.state = {
            workAddress: this.props.workAddress,
            title: this.props.title,
            locateStatus: 0,
            type: this.props.type,
            info: {},
            locate: null,
            validDistance: this.props.validDistance
        }
    }
    static defaultProps = {
        title: '上午',
        type: 0,//0:未打卡 1:已打卡 2:其他
        validDistance: 500
    }
    componentDidMount() {
        if (this.state.type != 1) {
            AMapLocation.init(null);
            AMapLocation.startUpdatingLocation()
            if (Platform.OS === 'ios') {
                this.listener = NativeAppEventEmitter.addListener('amap.location.onLocationResult', (data) => {
                    this.setState({
                        locate: { longitude: data.longitude, latitude: data.latitude }
                    });
                    this.webView.postMessage(JSON.stringify(this.state.locate))
                })
            } else {
                this.listener = DeviceEventEmitter.addListener('amap.location.onLocationResult', (data) => {
                    this.setState({
                        locate: { longitude: data.longitude, latitude: data.latitude }
                    });
                    console.log('接受定位信息：')
                    console.log(data)
                    this.webView.postMessage(JSON.stringify(this.props.locate))
                })
            }
        }
    }
    componentWillUnmount() {
        if (this.state.type != 1) {
            this.listener.remove();
            AMapLocation.cleanUp();
        }
    }
    render() {
        const statusTypes = ['正在定位。。。', '已进入打卡范围', '不在打卡范围内']

        const type = this.state.type

        const map2 = <WebView
            ref={webView => { this.webView = webView }}
            source={require('./map2.html')}
            javaScriptEnabled={true}
            startInLoadingState={true}
        />
        const tip1 =
            <View style={styles.status}>
                <Tip title={statusTypes[this.state.status]} />
            </View>
        const tip2 = (
            <View style={styles.status}>
                <Tip title={'打卡时间：' + this.state.info.time} />

            </View>
        )

        const button = (
            <View style={styles.button}>
                <Button
                    title='上班'
                    icon={{ name: 'telegram', type: 'font-awesome' }}
                />
            </View >
        )

        return (
            <View style={styles.page} >
                <View style={styles.head}>
                    <Text style={styles.title}>{this.state.title}</Text>
                </View>
                <View style={styles.map}>
                    {map2}
                </View>
                {
                    this.state.type == 1 ? tip2 : tip1
                }
                {
                    this.state.type == 1 ? <View></View> : button
                }
            </View >
        )
    }
    handleMessage = (event) => {
        const distance = event.nativeEvent.data;
        if (distance <= this.state.validDistance) {
            this.setState({
                status: 1
            })
        } else {
            this.setState({
                status: 2
            })
        }
    }
    success = (result) => {

    }
}

const styles = StyleSheet.create({
    page: {
        //height: 200
        flex: 1,
        margin: 20,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        elevation: 100,
        justifyContent: 'space-between'
    },
    head: {
        height: 60,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#6699ff',
        padding: 19,
    },
    title: {
        color: '#ffffff',
        fontSize: 22
    },
    map: {
        flex: 1,
        backgroundColor: '#d8edbe'
    },
    status: {
        flex: 1,
        margin: 20,
    },
    button: {
        marginBottom: 20,
    }
})
