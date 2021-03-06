
/**
 * NetUitl 网络请求的实现
 * 返回promise对象
 */
import React, { Component } from 'react';
import { connect } from "react-redux";
import { logOut } from "../actions"
import { Alert } from 'react-native'

let store = GLOBAL.store;

export default function makeCancelable(promise){
    let hasCanceled_ = false;
    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then((val) =>
            hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
        );
        promise.catch((error) =>
            hasCanceled_ ? reject({isCanceled: true}) : reject(error)
        );
    });

    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true;
        },
    };
}

export default class NetUitl {
    let hasCanceled_ = false;


    /*
     *  get请求
     *  url:请求地址
     *  data:参数
     *  返回promise对象
     * */
    static get(url,params,token) {
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
        console.log(GLOBAL.store.getState());


        return new Promise(function (resolve, reject) {
            fetch(url,{
                method: 'GET',
                headers:{
                    'Authorization': 'Bearer '+ GLOBAL.store.getState().user.token
                },
            }).then((response) => {

                if (this.hasCanceled_) {
                    reject({isCanceled: true})

                } else {
                    if (response.status === 401) {
                        console.log("401");
                        return GLOBAL.store.dispatch(logOut());
                    }
                    if(response.status>=200 && response.status<300){
                        console.log('Content-Type: ' + response.headers.get('Content-Type'));
                        console.log('Date: ' + response.headers.get('Date'));
                        console.log('status: ' + response.status);
                        console.log('statusText: ' + response.statusText);
                        console.log('type: ' + response.type);
                        console.log('url: ' + response.url);
                        console.log(response);

                    } else {
                        return Promise.reject(new Error(response.statusText));
                    }
                }).done();


                }



        });
        //fetch请求

    }

    /*
     *  post请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static post(url,params,token){
        //fetch请求
        fetch(url,{
            method: 'POST',
            headers:{
                'Authorization': 'Bearer '+ GLOBAL.store.getState().user.token
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