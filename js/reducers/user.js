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

import type { Action } from "../actions/types";

export type State = {
  isLoggedIn: boolean,
  hasSkippedLogin: boolean,
  sharedSchedule: ?boolean,
  userid: ?string,
  username: ?string,
  token: ?string,
  roles: ?string,
  isInitPwd: ?boolean
};

const initialState = {
  isLoggedIn: false,
  hasSkippedLogin: false,
  sharedSchedule: null,
  userid: null,
  username: null,
  token: 'XXX',
  roles: null,
  isInitPwd: false
};

function user(state: State = initialState, action: Action): State {
  if (action.type === "LOGGED_IN") {
    console.log(action.data);
    let { userid, username, token, roles, isInitPwd} = action.data;

    return {
      isLoggedIn: true,
      hasSkippedLogin: false,
      token,
      userid,
      username,
      roles,
      isInitPwd
    };
  }
  if (action.type === "SKIPPED_LOGIN") {
    return {
      ...initialState,
      hasSkippedLogin: true
    };
  }
  if (action.type === "LOGGED_OUT") {
    return initialState;
  }
  if (action.type === "SET_SHARING") {
    return {
      ...state,
      sharedSchedule: action.enabled
    };
  }
  if (action.type === "RESET_NUXES") {
    return { ...state, sharedSchedule: null };
  }
  return state;
}

module.exports = user;
