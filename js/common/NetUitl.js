
/**
 * NetUitl 网络请求的实现
 * 返回promise对象
 */
import React, { Component } from 'react';
import { connect } from "react-redux";
import { logOut } from "../actions"
import { Alert } from 'react-native'

class NetUitl extends React.Component{

    /*
     *  get请求
     *  url:请求地址
     *  data:参数
     *  返回promise对象
     * */
    static get(url,params,headers){
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
                return logOut();
            }
            if(response.status>=200 && response.status<300){
                console.log('Content-Type: ' + response.headers.get('Content-Type'));
                console.log('Date: ' + response.headers.get('Date'));
                console.log('status: ' + response.status);
                console.log('statusText: ' + response.statusText);
                console.log('type: ' + response.type);
                console.log('url: ' + response.url);
                return Promise.resolve(response);
            } else {
                return Promise.reject(new Error(response.statusText));
            }
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
        .then((response) => {
                if (response.status === 401) {
                    console.log("401");
                    return logOut();
                }
                if(response.status>=200 && response.status<300){
                    console.log('Content-Type: ' + response.headers.get('Content-Type'));
                    console.log('Date: ' + response.headers.get('Date'));
                    console.log('status: ' + response.status);
                    console.log('statusText: ' + response.statusText);
                    console.log('type: ' + response.type);
                    console.log('url: ' + response.url);
                    return Promise.resolve(response);
                } else {
                    return Promise.reject(new Error(response.statusText));
                }
        }).done();
    }
}

const select = (store) => {
    console.log(store);
    return {
        token: store.user.token
    }
}

module.exports = connect(select)(NetUitl);