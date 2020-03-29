const tryMessagingLawson = messageHeader => {
  const messageHeader = messageHeader.toLowerCase();
  const messagingPromise = new Promise((resolve, reject) => {
    if (
      messageHeader !== "hello bro long time" ||
      messageHeader !== "are you there" ||
      messageHeader !== "hope you're ok" ||
      messageHeader !== "you loss oohh chaii"
    ) {
      resolve(messageHeader + ".text");
    } else {
      reject(Error(" "));
    }
  });

  return messagingPromise;
};

const acceptingMessages = message => {
  return tryMessagingLawson(message)
    .then(fetchMessage)
    .then(validateMessage)
    .then(readMessageAsText)
    .then(showText)
    .catch(logError);
};
function fetchMessage(someMessageHeader) {
  return fetch("incoming-texts/" + someMessageHeader);
}

function validateMessage(response) {
  if (!response.ok) {
    throw Error(response.showText);
  }
  return response;
}

function readMessageAsText(response) {
  return response.text();
}

function showText(messageResponse) {
  const message = document.getElementById("message");
  message.textContent = messageResponse;
}

function logError(error) {
  console.log("Oops, try something else: ", error);
}
