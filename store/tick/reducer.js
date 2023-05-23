import { tickActionTypes } from './action';
import moment from 'moment';

const tickInitialState = {
  time: ''
}

export default function reducer(state = tickInitialState, action) {
  switch (action.type) {
    case tickActionTypes.TICK:
      return Object.assign({}, state, {
        time: action.ts,
      })
    default:
      return state
  }
}
