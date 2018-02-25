/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 */

"use strict";

import Platform from "Platform";
import BackAndroid from "BackAndroid";

import React from "react";
import { Navigator } from "react-native-deprecated-custom-components";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";


import LoginModal from "./login/LoginModal";
import F8Colors from "./common/F8Colors";
import { switchTab } from "./actions";
import MapView from "./tabs/MapView"
import CarMap from "./tabs/CarMap"
import SearchPage from "./tabs/SearchPage"

// import F8MapView from "./tabs/maps/F8MapView";
// import DemosCarousel from "./tabs/demos/DemosCarousel";
// import SessionsCarousel from "./tabs/schedule/SessionsCarousel";
// import SharingSettingsScreen from "./tabs/schedule/SharingSettingsScreen";
// import F8WebView from "./common/F8WebView";
// import RatingScreen from "./rating/RatingScreen";
// import F8VideoView from "./tabs/videos/F8VideoView";
// import F8TabsView from "./tabs/F8TabsView";
// import FriendsScheduleView from "./tabs/schedule/FriendsScheduleView";
// import FilterScreen from "./filter/FilterScreen";

class MyNavigator extends React.Component {



    constructor(props) {
        super(props);
        this._handlers = ([]:Array<()=>boolean>)

    }

    componentDidMount() {
        BackAndroid.addEventListener("hardwareBackPress", this.handleBackButton);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener("hardwareBackPress", this.handleBackButton);
    }

    getChildContext() {
        return {
            addBackButtonListener: this.addBackButtonListener,
            removeBackButtonListener: this.removeBackButtonListener
        };
    }

    addBackButtonListener(listener) {
        this._handlers.push(listener);
    }

    removeBackButtonListener(listener) {
        this._handlers = this._handlers.filter(handler => handler !== listener);
    }

    handleBackButton() {
        for (let i = this._handlers.length - 1; i >= 0; i--) {
            if (this._handlers[i]()) {
                return true;
            }
        }

        const navigator = this._navigator;
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }

        // if (this.props.tab !== "schedule") {
        //   this.props.dispatch(switchTab("schedule"));
        //   return true;
        // }
        return false;
    }

    render() {
        return (
            <Navigator
                ref={c => (this._navigator = c)}
                style={styles.container}
                configureScene={route => {
                    console.log(route);
                    if (Platform.OS === "android") {
                        return Navigator.SceneConfigs.FloatFromBottomAndroid;
                    }
                    // TODO: Proper scene support
                    if (
                        route.shareSettings ||
                        route.friend ||
                        route.webview ||
                        route.video ||
                        route.session ||
                        route.allSession ||
                        route.allDemos
                    ) {
                        return Navigator.SceneConfigs.PushFromRight;
                    } else {
                        return Navigator.SceneConfigs.FloatFromBottom;
                    }
                }}
                initialRoute={{}}
                renderScene={this.renderScene}
            />
        );
    }

    renderScene(route, navigator) {
        console.log(route);
        if (route.maps) {
            return  <CarMap navigator={navigator} />
        } else if (route.search) {
            return  <SearchPage navigator={navigator} {...route} />
        } else {
            console.log(navigator);
            return <MapView navigator={navigator} />
        }

    }
}

MyNavigator.childContextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: F8Colors.bianca
  }
});

function select(store) {
  return {
    // tab: store.navigation.tab,
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin
  };
}

module.exports = connect(select)(MyNavigator);
