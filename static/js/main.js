document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggleBtn = document.querySelector('[data-toggle="mobile-nav"]');
  const mobileNav = document.getElementById('mobileNav');
  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });
  }

  // Wallet connect logic
  const walletKey = 'cc_wallet_address';
  const connectButtons = document.querySelectorAll('[data-connect-wallet]');
  const walletDisplays = document.querySelectorAll('[data-wallet-display]');
  const navConnectBtn = document.getElementById('navConnectBtn');
  const navWalletDisplay = document.getElementById('navWalletDisplay');
  const mobileWalletDisplay = document.getElementById('mobileWalletDisplay');

  function shorten(addr) {
    return addr ? addr.slice(0, 6) + '...' + addr.slice(-4) : '';
  }

  function setConnected(addr) {
    localStorage.setItem(walletKey, addr);
    walletDisplays.forEach(el => {
      el.textContent = shorten(addr);
      el.title = addr + ' (click to copy)';
      el.classList.remove('hidden');
    });
    if (navWalletDisplay) navWalletDisplay.classList.remove('hidden');
    if (mobileWalletDisplay) mobileWalletDisplay.classList.remove('hidden');
    if (navConnectBtn) {
      navConnectBtn.textContent = 'Connected';
      navConnectBtn.disabled = true;
      navConnectBtn.classList.add('opacity-70', 'cursor-default');
    }
  }

  function setDisconnected() {
    localStorage.removeItem(walletKey);
    walletDisplays.forEach(el => {
      el.textContent = 'Not connected';
      el.removeAttribute('title');
    });
    if (navWalletDisplay) navWalletDisplay.classList.add('hidden');
    if (mobileWalletDisplay) mobileWalletDisplay.classList.add('hidden');
    if (navConnectBtn) {
      navConnectBtn.textContent = 'Connect Wallet';
      navConnectBtn.disabled = false;
      navConnectBtn.classList.remove('opacity-70', 'cursor-default');
    }
  }

  async function connectWallet() {
    try {
      if (!window.ethereum) {
        alert('No Web3 wallet found. Please install MetaMask or a compatible wallet extension.');
        return;
      }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const addr = accounts[0];
      if (addr) setConnected(addr);
    } catch (err) {
      console.error('Wallet connection failed:', err);
    }
  }

  // Click handlers for connect wallet
  connectButtons.forEach(btn => btn.addEventListener('click', connectWallet));

  // Copy wallet address on click
  walletDisplays.forEach(el => {
    el.addEventListener('click', async () => {
      const full = el.title?.split(' ')[0] || el.textContent;
      if (!full) return;
      try {
        await navigator.clipboard.writeText(full);
        el.textContent = 'Copied!';
        setTimeout(() => { el.textContent = shorten(full); }, 800);
      } catch { /* noop */ }
    });
  });

  // Restore state from localStorage
  const saved = localStorage.getItem(walletKey);
  if (saved) {
    setConnected(saved);
  } else {
    setDisconnected();
  }

  // Listen for account changes
  if (window.ethereum && window.ethereum.on) {
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts && accounts.length) {
        setConnected(accounts[0]);
      } else {
        setDisconnected();
      }
    });
  }
});