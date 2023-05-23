import { walletActionTypes } from './action'

const walletInitialState = {
  address: null,
  addressType: null,
  balance: 0,
}

export default function reducer (state = walletInitialState, action) {
  switch (action.type) {
    case walletActionTypes.WALLET:
      return Object.assign({}, state, {
        address: action.address,
        addressType: action.addressType,
        balance: action.balance
      })
    default:
      return state
  }
}
