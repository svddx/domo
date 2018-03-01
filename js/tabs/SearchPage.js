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
    ActivityIndicator,
    ScrollView,
    Dimensions,
} from 'react-native';

// 引用头部组件
import CommonHead from '../common/commonHead';
import Toast, {DURATION} from 'react-native-easy-toast'
import F8Colors from "../common/F8Colors";
import { NetApi } from "../urls";
import makeCancelable from "../util/Cancelable"
import NetUtil from "../common/NetUitl"
import FavoriteDao from '../expand/dao/FavoriteDao'
import MyList from  "../common/MyList"

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
        this.favoriteDao = new FavoriteDao('search');
        this.favoritKeys = [];
        this.state={
            inputKey:'',
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
                <TextInput
                           ref="input"
                           autoFocus={true}
                           style={styles.searchContent}
                           underlineColorAndroid="white"
                           clearTextOnFocus={true}
                           clearButtonMode="while-editing"
                           placeholder='请输入车牌号'
                           onChangeText={(inputKey) => this.setState({inputKey})}>
                </TextInput>
            </View>
        )
    }
    // 头部右侧
    renderRightItem() {
        return (
            <TouchableOpacity onPress={()=>{
                console.log(this);
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

    genFetchUrl(){
        return NetApi.vehicle_page + "?currentPage=" + 1
        + "&pageSize=" + 20
        + "&status=" + 'all'
        + "&searchInput=" + this.state.inputKey;
    }

    getFavoriteKeys() {//获取本地用户收藏的ProjectItem
        this.favoriteDao.getFavoriteKeys().then((keys)=> {
            this.favoritKeys = keys || [];
            this.flushFavoriteState();
        }).catch((error)=> {
            this.flushFavoriteState();
            console.log(error);
        });
    }

    flushFavoriteState() {//更新ProjectItem的Favorite状态
        let projectModels = [];
        let items = this.items;
        for (var i = 0, len = items.length; i < len; i++) {
            projectModels.push(new ProjectModel(items[i], Utils.checkFavorite(items[i], this.favoritKeys)));
        }
        this.updateState({
            isLoading: false,
            dataSource: this.getDataSource(projectModels),
            rightButtonText: 'Go',
        });
    }

    checkKeyIsExist(keys, key) {
        for (let i = 0, l = keys.length; i < l; i++) {
            if (key.toLowerCase() === keys[i].name.toLowerCase())return true;
        }
        return false;
    }

    saveKey() {
        let key = this.state.inputKey;
        if (this.checkKeyIsExist(this.keys, key)) {
            this.refs.toast.show(this.state.inputKey + ' already exists.', DURATION.LENGTH_SHORT)
        } else {
            key = {
                "path": key,
                "name": key,
                "checked": true
            };
            this.keys.unshift(key);
            this.languageDao.save(this.keys)
            this.refs.toast.show(this.state.inputKey + ' saved successfully.', DURATION.LENGTH_SHORT);
            this.isKeyChange = true;
        }
    }

    loadData() {
        this.updateState({
            isLoading: true,
            showBottomButton: false,
        });
        this.cancelable = makeCancelable(NetUtil.get(this.genFetchUrl()));
        this.cancelable.promise.then(response=>console.log(response));
        // this.cancelable.promise
        //     .then((response)=>{
        // console.log(response)})
        //     .then((responseData)=> {
        //         console.log(responseData);
        //         if (!this || !responseData || !responseData.items || responseData.items.length === 0) {
        //             this.refs.toast.show(this.state.inputKey + ' nothing found.', DURATION.LENGTH_SHORT);
        //             this.updateState({isLoading: false, rightButtonText: '搜索',});
        //             return;
        //         }
        //         this.items = responseData;
        //         this.getFavoriteKeys();
        //         if (!this.checkKeyIsExist(this.keys, this.state.inputKey)) {
        //             this.updateState({showBottomButton: true,})
        //         }
        //     })
        //     .catch((error)=> {
        //         this.updateState({
        //             isLoading: false,
        //             rightButtonText: 'Go',
        //         });
        //     });
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

            // this.cancelRequest.cancel();
        } else {

        }
    }

    render() {
        let bottomButton = this.state.showBottomButton ?
            <TouchableOpacity
                underlayColor="transparent"
                style={[styles.bottomButton, {backgroundColor: this.props.theme.themeColor}]}
                onPress={()=> {
                    this.saveKey();
                }}
            >
                <View style={{justifyContent: 'center',}}>
                    <Text style={styles.title}>Add Key {this.state.inputKey} </Text>
                </View>
            </TouchableOpacity>
            : null;
        let indicatorView = this.state.isLoading ?
            <ActivityIndicator
                animating={this.state.isLoading}
                style={[styles.centering,]}
                size="large"
            /> : null;
        let listView = !this.state.isLoading ?
            <MyList
                ref="listView"
                data={this.state.dataSource}
                navigator = {this.props.navigator}
            /> : null;
        let resultView =
            <View style={{flex: 1}}>
                {indicatorView}
                {listView}
            </View>;
        return (
            <View style={styles.container}>
                <View style={[{width:width,
                    zIndex:99,
                    height:45 + STATUS_BAR_HEIGHT,
                    paddingTop: STATUS_BAR_HEIGHT,
                    backgroundColor: F8Colors.blue,
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems: 'center'}
                ]}>
                    <View>
                        {this.renderLeftItem()}
                    </View>
                    <View>
                        {this.renderTitleItem()}
                    </View>
                    <View>
                        {this.renderRightItem()}
                    </View>

                </View>
                <View>
                    {resultView}
                    {bottomButton}
                </View>
                <Toast ref="toast" position='bottom'/>
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
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        flex: 1,
    }
});

module.exports = connect()(SearchPage)