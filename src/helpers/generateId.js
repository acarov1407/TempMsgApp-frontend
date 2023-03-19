
const generateChatId = () => {
    const random = Math.random().toString(16).substring(2);
    const date = Date.now().toString(16);
    return random + date;
}

const generateChatNumberId = () => {
    const random = Math.floor(Math.random()*90000) + 10000;
    return random.toString();
}

const generateUserId = () => {
    const random = Math.random().toString(32).substring(2);
    const date = Date.now().toString(32);
    return random + date;
}

export {
    generateChatId,
    generateUserId,
    generateChatNumberId
}