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

// import FacebookSDK from "../FacebookSDK";
// import ActionSheetIOS from "ActionSheetIOS";
// import { Platform } from "react-native";
// import Alert from "Alert";
// import { restoreSchedule, loadFriendsSchedules } from "./schedule";
// import { updateInstallation } from "./installation";
// import { loadSurveys } from "./surveys";

import type { Action, ThunkAction } from "./types";
import { NetApi }   from "../urls"

// async function ParseFacebookLogin(scope): Promise {
//   return new Promise((resolve, reject) => {
//     Parse.FacebookUtils.logIn(scope, {
//       success: resolve,
//       error: (user, error) => reject((error && error.error) || error)
//     });
//   });
// }
//
// async function queryFacebookAPI(path, ...args): Promise {
//   return new Promise((resolve, reject) => {
//     FacebookSDK.api(path, ...args, response => {
//       if (response && !response.error) {
//         resolve(response);
//       } else {
//         reject(response && response.error);
//       }
//     });
//   });
// }
//
async function _userLogIn(req: ?Object): Promise<Array<Action>> {


    console.log(NetApi);

    let response = await fetch(NetApi.auth_url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req)
    });
    let data = await response.json();
    const action = {
        type: "LOGGED_IN",
        data: {
            userid: data.result.userid,
            username: data.result.username,
            roles: data.result.roles,
            token:data.result.token,
            isInitPwd:data.result.isInitPwd
        }
    };

  return Promise.all([Promise.resolve(action)]);
}

function userLogIn(data: ?Object): ThunkAction {
  console.log(data);
  return dispatch => {
    const login = _userLogIn(data);

    console.log('xxxxx');

    // Loading friends schedules shouldn't block the login process
    login.then(result => {
        console.log(result);
        dispatch(result);
    });
    return login;
  };
}

function skipLogin(): Action {
  return {
    type: "SKIPPED_LOGIN"
  };
}

function logOut(): ThunkAction {
  return dispatch => {
    return dispatch({
      type: "LOGGED_OUT"
    });
  };
}
//
// function logOutWithPrompt(): ThunkAction {
//   return (dispatch, getState) => {
//     let name = getState().user.name || "there";
//
//     if (Platform.OS === "ios") {
//       ActionSheetIOS.showActionSheetWithOptions(
//         {
//           title: `Hi, ${name}`,
//           options: ["Log out", "Cancel"],
//           destructiveButtonIndex: 0,
//           cancelButtonIndex: 1
//         },
//         buttonIndex => {
//           if (buttonIndex === 0) {
//             dispatch(logOut());
//           }
//         }
//       );
//     } else {
//       Alert.alert(`Hi, ${name}`, "Log out from F8?", [
//         { text: "Cancel" },
//         { text: "Log out", onPress: () => dispatch(logOut()) }
//       ]);
//     }
//   };
// }

module.exports = {userLogIn, skipLogin, logOut};
