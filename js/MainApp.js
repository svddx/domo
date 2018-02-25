/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppState, Platform, StatusBar, StyleSheet, Text, View
} from 'react-native';
import { connect } from "react-redux";
import LoginScreen from "./login/LoginScreen";
import MyNavigator from "./MyNavigator"


class App extends React.Component {
    componentDidMount() {
        AppState.addEventListener("change", this.handleAppStateChange);

        // TODO: Make this list smaller, we basically download the whole internet
        // this.props.dispatch(loadSessions());
        // this.props.dispatch(loadConfig());
        // this.props.dispatch(loadNotifications());
        // this.props.dispatch(loadVideos());
        // this.props.dispatch(loadMaps());
        // this.props.dispatch(loadFAQs());
        // this.props.dispatch(loadPages());
        // this.props.dispatch(loadPolicies());
        // console.log(this.props);
        //
        // if (this.props.isLoggedIn) {
        //     this.props.dispatch(restoreSchedule());
        //     this.props.dispatch(loadSurveys());
        //     this.props.dispatch(loadFriendsSchedules());
        // }
        //
        // updateInstallation({ version });
    }

    componentWillUnmount() {
        AppState.removeEventListener("change", this.handleAppStateChange);
    }

    handleAppStateChange = appState => {
        if (appState === "active") {
            // this.props.dispatch(loadSessions());
            // this.props.dispatch(loadVideos());
            // this.props.dispatch(loadNotifications());
            //
            // if (this.props.isLoggedIn) {
            //     this.props.dispatch(restoreSchedule());
            //     this.props.dispatch(loadSurveys());
            // }
        }
        if (this.state.currentAppState.match(/inactive|background/) && appState === 'active') {
            console.log('App has come to the foreground!')
        }
        this.setState({currentAppState: appState});
    };

    render() {
        console.log(this);
        if (!this.props.skipWelcomeScreen) {
            return <LoginScreen />;
        }
        return (
            <View style={styles.container}>
                <StatusBar
                    hidden={false}
                    translucent={true}
                    backgroundColor="rgba(0, 0, 0, 0)"
                    barStyle="light-content"
                />
                <MyNavigator />
                {/*<PushNotificationsController />*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

function select(store) {
    return {
        isLoggedIn: store.user.isLoggedIn,
        skipWelcomeScreen: store.user.isLoggedIn || store.user.hasSkippedLogin
    };
}

module.exports = connect(select)(App);
