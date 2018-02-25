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
 *
 * @flow
 */
"use strict";

import React from "react";
import { connect } from "react-redux";
import { skipLogin } from "../actions";
import F8Colors from "../common/F8Colors";
import F8Fonts from "../common/F8Fonts";
import { Text, Heading1 } from "../common/F8Text";
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import LoginButton from "../common/LoginButton";
import F8Button from "../common/F8Button"

/* Config/Constants
============================================================================= */

const SKIP_BTN_HEIGHT = 24,
  WINDOW_WIDTH = Dimensions.get("window").width,
  WINDOW_HEIGHT = Dimensions.get("window").height,
  VERTICAL_BREAKPOINT = WINDOW_HEIGHT <= 600,
  HEADER_HEIGHT = VERTICAL_BREAKPOINT ? 220 : 285,
  SKIP_BTN_MARGIN_TOP = VERTICAL_BREAKPOINT ? 15 : 23,
  WHENWHERE_PADDING_TOP = VERTICAL_BREAKPOINT ? 12 : 18,
  RENDER_ARROW_SECTION = VERTICAL_BREAKPOINT ? false : true,
  LOGIN_PADDING_BOTTOM = VERTICAL_BREAKPOINT ? 20 : 33,
  CONTENT_PADDING_H = VERTICAL_BREAKPOINT ? 15 : 20;

/* =============================================================================
<LoginScreen />
--------------------------------------------------------------------------------

Props:
  ?

============================================================================= */

class LoginScreen extends React.Component {
  state = {
    anim: new Animated.Value(0),
      username:'',
      password:''

  };

  componentDidMount() {
    Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();
  }

  render(){
    return (
        <View style={styles.container}>
          <StatusBar barStyle="default"/>


          <View style={styles.content}>
            <Image source={require("./img/512.png")}
                   style={styles.img}
            />
            <Heading1 style={styles.h1}>
              车辆管家
            </Heading1>
            <View style={styles.inputForm}>
            <TextInput placeholder='请输入用户名' style={styles.input}
                       autoCapitalize={'none'}
                       ref={(input)=>this.username=input}
                       onChangeText={(inputKey) => this.setState({username:inputKey})}
                       onFocus={_=>this.username.focus()}
            />
            <View style={styles.line}></View>
            <TextInput placeholder='请输入密码' style={styles.input}
                       ref={(input)=>this.password=input}
                       onChangeText={(inputKey) => this.setState({password:inputKey})}
                       onFocus={_=>this.password.focus()}
                       secureTextEntry={true}
            />
            </View>
            <LoginButton source="First screen" username={this.state.username} password={this.state.password}/>
          </View>

        </View>
    );
  }


}

/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: F8Colors.white
  },

  //header styles
  header: {
    height: HEADER_HEIGHT,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  headerPattern: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    height: HEADER_HEIGHT - 30
  },
  img: {
    width: 100,
    height:100,
      borderRadius:15


  },
    line: {
        flex: 1,
        height: 1,
        opacity:0.5,
        backgroundColor: 'darkgray',
    },

  inputForm: {
    marginTop:10,
      marginBottom:15,
    width:WINDOW_WIDTH * 0.75,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: F8Colors.lightBackground,
      paddingLeft:10,
  },
  input:{
    height:40,
    fontSize:12
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: CONTENT_PADDING_H
  },

  h1: {
    marginTop: 16,
    textAlign: "center"
  },
  whenWhereText: {
    marginTop: WHENWHERE_PADDING_TOP,
    textAlign: "center",
    color: F8Colors.tangaroa,
    fontFamily: F8Fonts.helvetica
  },

  arrowSection: {
    alignItems: "center",
    justifyContent: "center"
  },

  loginSection: {
    paddingBottom: LOGIN_PADDING_BOTTOM,
    alignItems: "center",
    paddingHorizontal: 20
  },
  loginComment: {
    textAlign: "center",
    fontSize: 15,
    color: F8Colors.pink,
    fontFamily: F8Fonts.fontWithWeight("helvetica", "semibold"),
    marginBottom: 23
  },
  skipButton: {
    marginTop: SKIP_BTN_MARGIN_TOP,
    height: SKIP_BTN_HEIGHT,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center"
  },
  skipText: {
    color: F8Colors.colorWithAlpha("tangaroa", 0.5),
    fontFamily: F8Fonts.helvetica
  }
});

/* Export
============================================================================= */
module.exports = connect()(LoginScreen);
