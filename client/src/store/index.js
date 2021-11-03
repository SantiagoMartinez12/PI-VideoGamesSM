import {applyMiddleware, createStore} from 'redux'
import reducer from './reducers/index.js'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
// npm i redux-devtools-extension
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
//const store = createStore(reducer, applyMiddleware(thunk))


export default store;