
import React from "react";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

import MainApp from './MainApp'
import { Text } from "react-native";
import LaunchScreen from "./common/LaunchScreen";
import Playground from "./Playground"

console.disableYellowBox = true;

// TODO: Don't prevent fontScaling on iOS (currently breaks UI)
Text.defaultProps.allowFontScaling = false;

export default class Root extends React.Component {
    state: {
        isLoading: boolean,
        store: any
    };

    constructor() {
        super();
        this.state = {
            storeCreated: false,
            storeRehydrated: false,
            store: null
        };
    }

    componentDidMount() {
        configureStore(
            // rehydration callback (after async compatibility and persistStore)
            () => this.setState({ storeRehydrated: true })
        ).then(
            // creation callback (after async compatibility)
            store => {
                this.setState({ store, storeCreated: true });
            }
        );
    }

    render() {
        if (!this.state.storeCreated || !this.state.storeRehydrated) {
            return <LaunchScreen />;
        }
        return (
            <Provider store={this.state.store}>
                <MainApp />
                {/*<Playground/>*/}
            </Provider>
        );
    }
}

    
