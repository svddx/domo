
/**
 * NetUitl 网络请求的实现
 * https://github.com/facebook/react-native
 *
 *    get请求,以百度为例,没有参数,没有header
 *    NetUitl.get('https://www.baidu.com/','',function (set) {
 *       //下面是请求下来的数据
 *       console.log(set)
 *   })
 */
import React, { Component } from 'react';
import { connect } from "react-redux";
import LoginScreen from "../login/LoginScreen";


class NetUitl extends React.Component{

    props:{
        token: ?string
    };

    /*
     *  get请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static get(url,params,headers,callback){
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        //fetch请求
        fetch(url,{
            method: 'GET',
            headers:{
                'Authorization': 'Bearer '+ this.props.token
            },
        })
        .then((response) => {
            if (response.status === 401) {
                console.log("401");
                return <LoginScreen />
            }
            callback(response)
        }).done();
    }
    /*
     *  post请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static post(url,params,headers,callback){
        //fetch请求
        fetch(url,{
            method: 'POST',
            headers:{
                'Authorization': 'Bearer '+ this.props.token
            },
            body:JSON.stringify(params)
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            callback(responseJSON)
        }) .done();
    }


}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}

module.exports = connect()(NetUitl);