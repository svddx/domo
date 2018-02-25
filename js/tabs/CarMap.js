import React, { Component } from 'react';
import { connect } from "react-redux";
import MapView from 'react-native-amap3d'
import {
    StyleSheet,
    View,
    Text,
    Platform,
    Button,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';

// 引用头部组件
import CommonHead from '../common/commonHead';
import F8Colors from "../common/F8Colors";

// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');
let STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 20 : 25;
if (Platform.OS === "android" && Platform.Version && Platform.Version < 21) {
    STATUS_BAR_HEIGHT = 0;
}

let NAV_STATUS_HEIGHT = 45 + STATUS_BAR_HEIGHT;

type Props = {
    searchInput: string,
};


class CarMap extends React.Component {

    props: Props;

    constructor(props) {
        super(props);
        this.state = {
            showsCompass: false,
            showsScale: true,
            showsZoomControls: true,
            showsLocationButton: false,
        }
    }


    // 头部左侧
    renderLeftItem() {
        return (
            <TouchableOpacity onPress={_ => this.props.navigator && this.props.navigator.pop()} style={styles.navLeft}>
                <Image source={require('./img/head/scanning.png')} style={styles.navIcon} />
                <Text style={styles.navText}>返回</Text>
            </TouchableOpacity>
        )
    }
    // 头部中间
    renderTitleItem() {
        return (
            <TouchableOpacity onPress={() => { this.openSearchPage() }}>
                <View style={styles.searchBox}>
                    <Image source={require('./img/head/search.png')} style={styles.searchIcon} />
                    <Text style={styles.searchContent}>请输入车牌号</Text>
                </View>
            </TouchableOpacity>
        )
    }
    // 头部右侧
    renderRightItem() {
        return (
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('MessageCenter') }} style={styles.navRight}>
                <Image source={require('./img/head/remind.png')} style={styles.navIcon} />
                <Text style={styles.navText}>消息</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <CommonHead
                    leftItem={() => this.renderLeftItem()}
                    titleItem={() => this.renderTitleItem()}
                    rightItem={() => this.renderRightItem()}
                    navBarColor={F8Colors.blue}
                />
                <View style={StyleSheet.absoluteFill}>
                    <MapView
                        locationEnabled={this.state.showsLocationButton}
                        showsCompass={this.state.showsCompass}
                        showsScale={this.state.showsScale}
                        showsLocationButton={this.state.showsLocationButton}
                        showsZoomControls={this.state.showsZoomControls}
                        style={styles.map}/>
                </View>
                <View style={styles.controls}>
                    <View style={styles.control}>
                        <Image source={require('./img/head/edit_1.png')} style={styles.navIcon} />
                    </View>
                    <View style={styles.control}>
                        <Text>在线终端数目：1</Text>
                    </View>
                    <TouchableOpacity onPress={_ => this.props.navigator && this.props.navigator.pop()} style={styles.control}>
                        <Image source={require('./img/head/pointer-right.png')} style={styles.navIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    openSearchPage() {
        if (Platform.OS === "ios") {
            this.props.navigator.push({
                search: true,
                onApply: selected => this.props.searchInput = selected,
            });
        } else {
            this.setState({ filterModal: true });
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    navLeft: {
        alignItems: 'center',
        marginLeft: 10,
    },
    navRight: {
        alignItems: 'center',
        marginRight: 10,
    },
    navIcon: {
        height: 20,
        width: 20,
    },
    navText: {
        paddingTop: 3,
        color:'#fff',
        fontSize: 10,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.7,
        backgroundColor: '#ededed',
        borderRadius: 5,
        height: 30,
    },
    searchIcon: {
        width: 16,
        height: 16,
        marginRight: 6,
    },
    searchContent: {
        color: '#666',
        fontSize: 14,
    },
    tabBarUnderline: {
        backgroundColor: '#b4282d',
        height: 2,
        width:width/8,
        marginLeft:6
    },
    map: {
        flex: 1,
        marginTop:NAV_STATUS_HEIGHT,
        ...Platform.select({
            ios: {
                marginBottom: 40,
            },
        }),
    },
    controls: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 4,
        paddingLeft: 20,
        paddingRight: 20,
        ...Platform.select({
            android: {
                backgroundColor: '#f5f5f5',
            },
            ios: {
                backgroundColor: '#fff',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                borderTopColor: '#e0e0e0',
                borderTopWidth: StyleSheet.hairlineWidth,
                zIndex: 1,
            },
        }),
    },
    control: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    switch: {
        marginTop: 5,
    }
});

module.exports = connect()(CarMap)