import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    StyleSheet,
    View,
    Text,
    Platform,
    Button,
    Image,
    TextInput,
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

class SearchPage extends React.Component {

    constructor(props){
        super(props);
        this.keys = [],
        this.isKeyChanged = false,
        this.state={
            theme:this.props.theme,
            favoriteKeys:[],
            isLoading:false,
            rightButtonText:'搜索',
            showBottomButton:false,
        }
    }


    updateState(dict){
        if(!this)return;
        this.setState(dict)
    }

    // 头部左侧
    renderLeftItem() {
        return (
            <TouchableOpacity onPress={_ => this.onBackPress()} style={styles.navLeft}>
                <Text style={styles.navText}>返回</Text>
            </TouchableOpacity>
        )
    }
    // 头部中间
    renderTitleItem() {
        return (
            <View style={styles.searchBox}>
                <Image source={require('./img/head/search.png')} style={styles.searchIcon} />
                <TextInput onChangeText={text=>this.inputKey=text}
                           ref="input"
                           autoFocus={true}
                           style={styles.searchContent}
                           underlineColorAndroid="white"
                           clearTextOnFocus={true}
                           clearButtonMode="while-editing"
                           placeholder='请输入车牌号' >
                </TextInput>
            </View>
        )
    }
    // 头部右侧
    renderRightItem() {
        return (
            <TouchableOpacity onPress={()=>{
                this.refs.input.blur();//隐藏键盘,失去焦点
                this.onRightButtonClick();
            }} style={styles.navRight}>
                <Text style={styles.navText}>{this.state.rightButtonText}</Text>
            </TouchableOpacity>
        )
    }

    onBackPress(){
        console.log(this.refs);
        this.refs.input.blur();//隐藏键盘,失去焦点
        this.props.navigator.pop();
        return true;
    }

    onRightButtonClick(){
        if (this.state.rightButtonText ==='搜索'){
            this.updateState({rightButtonText:'取消'})
            this.loadData();

        } else if (this.state.rightButtonText ==='取消'){
            this.updateState({
                rightButtonText:'搜索',
                isLoading:false
            })

            this.cancelRequest.cancel();
        } else {

        }
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
                <View></View>
            </View>
        );
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
        color:'#fff',
        fontSize: 15,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: width * 0.7,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        height: 30,
        paddingLeft:10,
        paddingRight:10
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
    textInputStyle:{
        flex:1,
        height:(Platform.OS === 'ios')?30:40,
        borderWidth:(Platform.OS === 'ios')?1:0,
        borderColor:'white',
        alignSelf:'center',
        paddingLeft:5,
        marginRight:10,
        marginLeft:5,
        borderRadius:4,
        opacity:0.7,
        color:'white'
    },
});

module.exports = connect()(SearchPage)