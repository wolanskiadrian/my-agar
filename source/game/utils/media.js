const desktopBreakpoint = 1120;
const mobileMessage = `Desktop only experience, sorry bwoy`

export function isDesktop() {
  if (typeof window.matchMedia === "function") {
    return !!window.matchMedia(`(min-width: ${desktopBreakpoint}px)`).matches;
  }
}

export function isMobile() {
  return !isDesktop();
}

export function blockMobileDevices(content) {
  const desktopOnly = document.createElement("div");
  desktopOnly.classList.add('desktop-experience');
  
  desktopOnly.innerHTML = content;
  
  document.body.innerHTML = '';
  document.body.appendChild(desktopOnly);
}

export function isMobileDevice() {  
  if(isMobile()) {
    blockMobileDevices(mobileMessage);
  }
  
}
