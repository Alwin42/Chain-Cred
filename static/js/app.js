(function () {
  const globalConnectButtons = [
    document.getElementById('connectWalletBtn'),
    document.getElementById('heroConnectWallet'),
    document.getElementById('loginConnectWallet'),
  ].filter(Boolean);

  const walletAddressEl = document.getElementById('walletAddress');
  const dashboardWalletEl = document.getElementById('dashboardWallet');

  function short(addr) {
    return addr ? addr.slice(0, 6) + '…' + addr.slice(-4) : '';
  }

  async function connectWallet() {
    if (!window.ethereum) {
      alert('No wallet found. Please install MetaMask.');
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts && accounts[0];
      if (account && walletAddressEl) {
        walletAddressEl.textContent = short(account);
        walletAddressEl.classList.remove('hidden');
      }
      if (dashboardWalletEl) {
        dashboardWalletEl.textContent = account;
      }
    } catch (err) {
      console.error('Wallet connect error', err);
    }
  }

  globalConnectButtons.forEach((btn) => btn.addEventListener('click', connectWallet));
})();
