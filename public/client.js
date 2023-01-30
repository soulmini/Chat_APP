const socket = io();

const textarea = document.querySelector('#textarea')

const messageArea = document.querySelector('.message__area')

let name;

do {
    name = prompt('please enter your name')
} while (!name)

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }

    // Append
    AppendMessage(msg, 'outgoing');
    textarea.value = '';
    scrollToBottom();

    // send to server

    socket.emit('message', msg);

}

function AppendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let = className = type
    mainDiv.classList.add(className, 'message')
    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv);
}


// Recieve Message

socket.on('message', (msg) => {
    AppendMessage(msg, 'incoming');
    scrollToBottom();
})


function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}