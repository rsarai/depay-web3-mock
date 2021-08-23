import { on } from './on'
import { request } from './request'
import { setCurrentNetwork } from '../../network'
import { Web3Provider } from '@ethersproject/providers'

let mock = ({ blockchain, configuration, window, provider }) => {

  setCurrentNetwork(blockchain)

  if (provider) {
    if (provider.send) {
      provider.send = (method, params) =>
        request({ provider, request: { method: method, params: params } })
    }
    if (provider.sendTransaction) {
      provider.sendTransaction = (method, params) =>
        request({ provider, request: { method: method, params: params } })
    }
  } else {
    window.ethereum = {
      ...window.ethereum,
      on,
      request: (configuration) => {
        return request({
          request: configuration,
          provider: new Web3Provider(window.ethereum),
        })
      },
    }
  }

  return configuration
}

export { mock }
