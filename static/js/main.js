(function(){
  const $ = (sel, parent=document) => parent.querySelector(sel);
  const $$ = (sel, parent=document) => Array.from(parent.querySelectorAll(sel));

  function setYear() {
    const el = document.getElementById('yearCopy');
    if (el) el.textContent = new Date().getFullYear();
  }

  function toggleMobileNav() {
    const toggleBtn = document.querySelector('[data-action="toggle-nav"]');
    const menu = document.getElementById('mobileMenu');
    if (!toggleBtn || !menu) return;
    toggleBtn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }

  async function connectWallet() {
    if (!window.ethereum) {
      alert('MetaMask not detected. Please install MetaMask.');
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts && accounts[0] ? accounts[0] : '';
      updateWalletUI(address);
    } catch (err) {
      console.error('Wallet connection failed', err);
    }
  }

  function updateWalletUI(address) {
    const short = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
    const addrEls = ['walletAddress', 'walletAddressMobile', 'dashboardWallet']
      .map(id => document.getElementById(id))
      .filter(Boolean);
    addrEls.forEach(el => el.textContent = short);
  }

  function bindWalletButtons() {
    const ids = ['connectWalletBtn'];
    ids.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', connectWallet);
    });
    $$('[data-action="connect-wallet"]').forEach(btn => btn.addEventListener('click', connectWallet));
  }

  function init() {
    setYear();
    toggleMobileNav();
    bindWalletButtons();

    if (window.ethereum && window.ethereum.selectedAddress) {
      updateWalletUI(window.ethereum.selectedAddress);
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
