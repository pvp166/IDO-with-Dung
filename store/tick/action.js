import moment from 'moment';

export const tickActionTypes = {
  TICK: 'TICK',
}

export const serverRenderClock = () => (dispatch) => {
  return dispatch({
    type: tickActionTypes.TICK,
    ts: moment.now(),
  })
}

export const startClock = () => (dispatch) => {
  return setInterval(
      () => {
        return dispatch({ type: tickActionTypes.TICK, ts: moment.utc(Date.now())})
      },
      1000
  )
}


