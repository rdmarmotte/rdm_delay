let intervalId;

function sendPendingEmails() {
  browser.accounts.list().then((accounts) => {
    accounts.forEach((account) => {
      browser.messages.query({
        accountId: account.id,
        folder: account.folders.find(f => f.type === "outbox")
      }).then((messages) => {
        messages.forEach((message) => {
          browser.messages.send(message).then(() => {
            console.log("E-mail envoyé avec succès :", message.subject);
          }).catch((error) => {
            console.error("Erreur lors de l'envoi de l'e-mail :", error);
          });
        });
      });
    });
  });
}

function startInterval(interval) {
  stopInterval();
  intervalId = setInterval(sendPendingEmails, interval * 60 * 1000);
}

function stopInterval() {
  if (intervalId) {
    clearInterval(intervalId);
  }
}

browser.storage.local.get("interval").then((result) => {
  if (result.interval) {
    startInterval(result.interval);
  }
});

browser.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && "interval" in changes) {
    startInterval(changes.interval.newValue);
  }
});