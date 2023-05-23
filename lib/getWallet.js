// lib for controll wallet
const isMetaMaskInstaller = () => {
  // Have to check function to see if the MetaMask extension is installed
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
}
