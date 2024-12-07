function saveOptions(e) {
    e.preventDefault();
    browser.storage.local.set({
      interval: document.querySelector("#interval").value
    });
  }
  
  function restoreOptions() {
    browser.storage.local.get("interval").then((result) => {
      document.querySelector("#interval").value = result.interval || 15;
    });
  }
  
  document.addEventListener("DOMContentLoaded", restoreOptions);
  document.querySelector("form").addEventListener("submit", saveOptions);