import {createStore, applyMiddleware, combineReducers} from 'redux';
import {HYDRATE, createWrapper} from 'next-redux-wrapper';
import thunkMiddlewre from 'redux-thunk';

// stores
import tick from './tick/reducer';
import wallet from './wallet/reducer';
import contract from './contract/reducer';
import vesting from './investing/reducer';
import ido from './ido/reducer';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const combinedReducer =  combineReducers({
    tick,
    wallet,
    contract,
    vesting,
    ido,
})

const reducer  = (state, action) => {
  if (action.type == HYDRATE) {
    const nextState = {
      ...state, // user previous state
      ...action.payload, // apply delta from hydration
    }
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}

const initStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddlewre]))
}

export const wrapper = createWrapper(initStore)
