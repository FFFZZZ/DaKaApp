import React, {
    Component
} from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default class mtip extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    static defaultProps = {
        type: 'left',
        title: '这是对话框'
    }
    render() {
        return (
            <View style={styles.tip}>
                <View style={styles.icon}></View >
                <View style={styles.text} >
                    <Text>
                        {this.props.title}
                    </Text>
                </View>
            </View >
        )
    }
}
const styles = StyleSheet.create({
    tip: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 0,
        height: 0,
        borderBottomColor: '#ffffff',
        borderBottomWidth: 10,
        borderTopColor: '#ffffff',
        borderTopWidth: 10,
        borderLeftColor: '#ffffff',
        borderLeftWidth: 10,
        borderRightColor: '#d8edbe',
        borderRightWidth: 10,
    },
    text: {
        borderWidth: 1,
        borderColor: '#d8edbe',
        padding: 10,
        backgroundColor: '#d8edbe',
        borderRadius: 5,
    },
})

