import { ChatHandler, chat_names } from './ChatHandler.js';

onload = function () {

    const chatlist = document.getElementById('chat-list');
    const add = document.getElementById('generate-step');

    const insertChat = document.getElementById('insert-a-chat');
    const deleteChat = document.getElementById('delete-a-chat');

    // temptext is the text shown on the right side
    const text = document.getElementById('temptext');
    const textRight = document.getElementById('temptext2');

    const numberOfChats = document.getElementById('numberOfChats');

    const templates = document.getElementsByTagName('template')[0];
    const chat_item = templates.content.querySelector("li");

    const chatHandler = new ChatHandler(chat_item, chatlist);
    let chats = [];

    insertChat.onclick = function(){
        // if chat-list is empty,
        // generate an id of chat-item
        let idOfMsg = Math.floor(Math.random()*7);
        // if this id is not present in chat[] then push it into it
        if(chats.includes(idOfMsg)===false){
            chats.push(idOfMsg);
        }
        chatHandler.newMsg(idOfMsg);
        text.innerHTML = "Message from "+ chat_names[idOfMsg].fontcolor("green") + "<br>" + text.innerHTML;

        numberOfChats.innerHTML = ' ' +  chats.length;
    };

    deleteChat.onclick = function(){
        let index = Math.floor(Math.random()*chats.length);
        let idToDelete = chats[index];
        chatHandler.deleteMsg(idToDelete);
        textRight.innerHTML = "Deleted message from "+chat_names[idToDelete].fontcolor("red") + "<br>" + textRight.innerHTML;
        chats.splice(index, 1);

        numberOfChats.innerHTML = ' ' +  chats.length;
    }

    // this function will run when user clicks on 'GENERATE NEW STEP' button
    add.onclick = function () {
        if(Math.random()>0.75 && chats.length > 0){
            let index = Math.floor(Math.random()*chats.length);
            let idToDelete = chats[index];
            chatHandler.deleteMsg(idToDelete);
            textRight.innerHTML = "Deleted message from "+chat_names[idToDelete].fontcolor("red") + "<br>" + textRight.innerHTML;
            chats.splice(index, 1);
        } else{
            // if chat-list is empty,
            // generate an id of chat-item
            let idOfMsg = Math.floor(Math.random()*7);
            // if this id is not present in chat[] then push it into it
            if(chats.includes(idOfMsg)===false){
                chats.push(idOfMsg);
            }
            chatHandler.newMsg(idOfMsg);
            text.innerHTML = "Message from "+ chat_names[idOfMsg].fontcolor("green") + "<br>" + text.innerHTML;
        }
        numberOfChats.innerHTML = ' ' +  chats.length;
    };
};