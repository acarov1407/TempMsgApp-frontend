import { createContext, useState, useEffect } from "react";
import { generateChatId, generateChatNumberId } from "../helpers/generateId";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL);
const ChatContext = createContext();

function ChatProvider({ children }) {

    const [chat, setChat] = useState({});
    const [isLoadingChat, setIsLoadingChat] = useState(true);
    const [alert, setAlert] = useState('');

    const navigate = useNavigate();

    const loadChat = () => {
        const chatData = JSON.parse(sessionStorage.getItem('chat'));
        if (!chatData) {
            setIsLoadingChat(false);
            return;
        }

        setChat(chatData);
        setIsLoadingChat(false);
    }

    useEffect(() => {
        loadChat();
    }, []);

    useEffect(() => {

        socket.on('receiving_chat_data', (chatData) => {
            if (chatData.id === chat.id) {
                const chatStorage = JSON.parse(sessionStorage.getItem('chat'));
                if (!chatStorage) {
                    saveDataFromServer(chatData);
                    navigate(`/chat/${chatData.id}`);
                }
            }
        });

        socket.on('new_message', (message) => {
            if (message.chat === chat.id) addMessageToState(message);
        });

        socket.on('member_joined', (user) => {
            if (chat.messages) {
                if (user.chatId === chat.id) {
                    const { chatId, ...updatedUser } = user;
                    addLogToState(updatedUser);
                    addMemberToChat(updatedUser);
                    socket.emit('sending_chat_data', chat);
                }
            }
        });

        socket.on('member_logout', (user) => {
            removeMemberFromChat(user);
        });

        socket.on('chat_not_found', (chatId) => {
            if (chat.id === chatId)
                setAlert('Sala no encontrada');
        });

        socket.on('updated_chat_name', (chatInfo) => {

            editChatName(chatInfo.name);
        });

        return () => {
            socket.off('new_message');
            socket.off('create_chat');
            socket.off('member_joined');
            socket.off('member_logout');
            socket.off('chat_not_found');
            socket.off('updated_chat_name');
        }
    });

    const sendChatName = (chatInfo) => {
        socket.emit('update_chat_name', chatInfo);
    }

    const editChatName = (name) => {
        const updatedChat = {...chat};
        updatedChat.name = name;
        setChat(updatedChat);
        sessionStorage.setItem('chat', updatedChat);
    }

    const removeMemberFromChat = (user) => {
        const updatedChat = {...chat};
        updatedChat.members = updatedChat.members.filter(_user => _user.id !== user.id);
        setChat(updatedChat);
    }

    const addMemberToChat = (user) => {
        const updatedChat = { ...chat };
        updatedChat.members.push(user);
        setChat(updatedChat);
    }


    const saveDataFromServer = (chatData) => {
        setChat(chatData);
        sessionStorage.setItem('chat', JSON.stringify(chatData));
        setIsLoadingChat(false);
    }

    const reJoinChat = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        user.chatId = chat.id;
        socket.emit('re_join_chat', user);
    }


    const createChat = () => {
        const id = generateChatNumberId();
        const owner = JSON.parse(sessionStorage.getItem('user'));

        const chatData = {
            id,
            name: `Chat ${id}`,
            owner,
            members: [
                owner
            ],
            messages: []
        }

        setChat(chatData);
        sessionStorage.setItem('chat', JSON.stringify(chatData));
        socket.emit('create_chat', chatData);
        navigate(`/chat/${id}`);
    }

    const sendMessage = (message) => {
        socket.emit('send_message', message);
    }


    const getLastMessage = (messages) => {
        if (messages.length === 0) return {};
        return messages[messages.length - 1];
    }

    const checkPrimary = (messages, message) => {
        const lastMessage = getLastMessage(messages);
        message.isPrimary = message?.author?.id !== lastMessage?.author?.id || lastMessage?.type === 'log';
        message.type = 'message';
        return message;
    }

    const addLogToState = (user) => {
        const updatedChat = { ...chat };

        const message = {
            author: user,
            messageText: `${user.username} se ha unido al chat`,
            chat: chat.id,
            isPrimary: false,
            type: 'log'
        }

        updatedChat.messages.push(message);
        setChat(updatedChat);
        sessionStorage.setItem('chat', JSON.stringify(updatedChat));

    }

    const addMessageToState = (message) => {
        const updatedChat = { ...chat };
        const updatedMessage = checkPrimary(updatedChat.messages, message);
        updatedChat.messages.push(updatedMessage);
        setChat(updatedChat);
        sessionStorage.setItem('chat', JSON.stringify(updatedChat));
    }

    const joinToChat = (chatId) => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        user.chatId = chatId;

        setChat({ id: chatId });

        socket.emit('join_chat', user);
    }



    const resetChat = () => {
        setChat({});
        sessionStorage.removeItem('chat');
    }



    return (
        <ChatContext.Provider
            value={{
                chat,
                setChat,
                isLoadingChat,
                setIsLoadingChat,
                createChat,
                sendMessage,
                addMessageToState,
                addLogToState,
                joinToChat,
                reJoinChat,
                resetChat,
                sendChatName,
                alert,
                setAlert,
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContext;

export {
    ChatProvider
}