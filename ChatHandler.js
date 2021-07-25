export { ChatHandler, chat_names}

const chat_names = ["Manish", "Lalit", "Mayank", "Ritik", "Anmol", 
                    "Mohit", "Aman"];
const chat_names_length = chat_names.length;
const chat_msg = ["Placement season has arrived :)",
    "Perfect, I am really glad to hear that!...",
    "I have made pretty good Projects :)",
    "Amandeep, You are selected :)"];
const chat_msg_length = chat_msg.length;
const chat_img_length = 7;

class ChatHandler{
    // chat_template ?
    // Every chat item(Each row) has an fixed structure
    // it contains -> image, user_name, message, timings
    constructor(chat_template, chat_list){
        // create a Map
        this.hashmap = new Map();
        // initially there are no chats
        this.linked_list = null;
        // initialising the format of chat_template
        this.chat_template = chat_template;
        // refering to the whole chat_list
        this.chat_list = chat_list;
        // to display timings on each chat_item(Each row)
        let clock = new Date();
        this.hours = clock.getHours();
        this.mins = clock.getMinutes();
    }

    getTime(){
        // Time Stamp creation for each message
        this.mins += 1;
        if(this.mins === 60){
            this.hours += 1;
            this.mins = 0;
        }

        if(this.hours === 24){
            this.hours = 0;
        }
        // using 24-hour format
        // slice will return an array of elements
        // it is similar to slicing in python :)
        return ("0" + this.hours).slice(-2)+":"+("0" + this.mins).slice(-2);
    }

    createNode(id){
        // Creating node element
        let node = {};
        // Pointers to prev and next of node
        node['next'] = null;
        node['prev'] = null;
        // Create a copy of chat template
        // The cloneNode() method creates a copy of a node, and returns the clone.
        // it also clones all attributes and their values.
        let chat_item = this.chat_template.cloneNode(true);
        // Setting name, message, image to template item
        // used % to make sure that id value is with in 0 to 6 :)
        chat_item.querySelector('#Name').innerText = chat_names[id%chat_names_length];
        chat_item.querySelector('#Message').innerText = chat_msg[id%chat_msg_length];
        // console.log("./images/avatar" + eval(1+(id%chat_img_length)) + ".png");
        chat_item.querySelector('#Image').src = "./images/avatar" + eval(1+(id%chat_img_length)) + ".png";
        // now initialise the attribute 'chat_item' of node to this chat_item(which is just updated)
        node['chat_item'] = chat_item;
        return node;
    }

    newMsg(id){
        // in this function I have 2 options
        // 1. If new message arrives from a person who is not present in the chat list
        // will come at the top directly

        // 2. If message is from a person who is already in chat list then we must take that chat item
        // and put it at the top :)
        let node = null;
        // This is first case, when completely new message arrives and ofcos whose id is not present in hashmap
        if((id in this.hashmap ) === false){
            // If node not in linked list or this chat is not in chat-list
            // so I have to create a node with this id(taken from parameter)
            node = this.createNode(id);
            // and I have to add this node to map also
            this.hashmap[id] = node; // key is 'id' and value is 'node'
        } else{
            // If node in linked list or chat is already in chat-list
            // then I have to take that node from there and place it at the top
            node = this.getNodeFromList(id);
        }

        // if chat-list is completely empty(ofcos it will be at the starting)
        if(this.linked_list === null){
            // Setting head of empty list
            this.linked_list = node;
        } else{
            // Adding this node to prev of head of linked list
            node['next'] = this.linked_list;
            if(this.linked_list!==null)
                this.linked_list['prev'] = node;
            this.linked_list = node;
        }
        // this function will refresh the chat-list at the front-end
        this.updateList();
    }

    deleteMsg(id){
        let node = this.getNodeFromList(id);
        // No use of node since it has been deleted
        delete this.hashmap[id];
        // Clear entry from hashmap
        this.updateList();
    }

    getNodeFromList(id){
        // In this function, we also have to make changes in the pointer of previousNode and nextNode of node which
        // we need

        // getting the node from hashmap :)
        let node = this.hashmap[id];
        // this prevNode is just previous to node which we need
        let prevNode = node['prev'];
        // this nextNode is just next to node which we need 
        let nextNode = node['next'];

        // Update the pointers of prevNode and nextNode :) bcoz we are removing desired node from there to
        // place it at the top
        if(prevNode!==null)
            prevNode['next'] = nextNode;
        if(nextNode!==null)
            nextNode['prev'] = prevNode;

        // Update head of the linked list 
        // if this node is starting node then we will have to update the linked_list 
        // and make it point to nextNode :)
        if(node===this.linked_list){
            this.linked_list = nextNode;
        }
        node['next'] = null;
        node['prev'] = null;
        return node;
    }

    updateList(){
        // Update the contents of the chat list
        let innerHTML = '';
        let head = this.linked_list;
        while(head!==null){
            let element = head['chat_item'];
            if(head===this.linked_list){
                // let us make the first chat different from other chats
                // there will be a bold line at the left of chat which is at the top
                // so I have written ks-active
                element.className = "ks-item ks-active";
                element.querySelector('#Time').innerText = this.getTime();
            } else{
                // show remaining chats simply 
                element.className = "ks-item";
            }
            innerHTML += element.outerHTML;
            // now head will go to next chat-item
            head = head['next'];
        }
        this.chat_list.innerHTML = innerHTML;
    }

}