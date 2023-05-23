import { contractActionTypes } from './action';

const contractInitState = {
  contract: null,
  showLoading: false,
  showSuccess: false
}

export default function reducer(state = contractInitState, action) {
  switch (action.type) {
    case contractActionTypes.CONTRACT:
      return Object.assign({}, state, {
        contract: action.contract,
        showLoading: action.showLoading,
        showSuccess: action.showSuccess
      })

    case contractActionTypes.DONE:
      return Object.assign({}, state, {
        contract: state.contract,
        showLoading: state.showLoading,
        showSuccess: action.showSuccess
      })

    case contractActionTypes.LOADING:
      return Object.assign({}, state, {
        contract: state.contract,
        showLoading: action.showLoading,
        showSuccess: state.showSuccess
      })
    default:
      return state
  }
}
