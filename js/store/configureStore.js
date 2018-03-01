
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import promise from "./promise";
import array from "./array";
import analytics from "./analytics";
import reducers from "../reducers";
import createLogger from "redux-logger";
import { persistStore, autoRehydrate } from "redux-persist";
import { AsyncStorage } from "react-native";
import { ensureCompatibility } from "./compatibility";


const isDebuggingInChrome = false;
const logger = createLogger({
    predicate: (getState, action) => isDebuggingInChrome,
    collapsed: true,
    duration: true
});

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const createAppStore = composeEnhancers(applyMiddleware(thunk, promise, array, analytics, logger)(
    createStore
));

async function configureStore(onComplete: ?()=>void) {
    console.log(onComplete);

    const didReset = await ensureCompatibility();
    const store = autoRehydrate()(createAppStore)(reducers);
    persistStore(store, { storage: AsyncStorage }, () => onComplete(didReset));


    GLOBAL.store = store;
    if (isDebuggingInChrome) {
        window.store = store;
    }
    console.log(store);
    return store;

}

module.exports = configureStore;