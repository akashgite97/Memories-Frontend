import { applyMiddleware, legacy_createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension'

const middleWare=composeWithDevTools(applyMiddleware(thunk))
const store = legacy_createStore(reducers,middleWare );

export default store;
