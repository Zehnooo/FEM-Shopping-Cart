import { newEl } from "./elements.js";

export const toast = {
    queue: [],
    createMsg(txt, type){
        return {txt, type}
    },
    printMsg(msg){
        document.querySelector('#toast-con').append(newEl('p', msg.txt, null, [`${msg.type}`, 'toast']));
        toast.toggleQueue();
    },
    findMsgInQueue(msg){
        return toast.queue.find(m => m.message === msg.message);
    },
    queueToast(txt, type){
    toast.queue.push(txt);
    toast.printMsg(toast.createMsg(txt, type));
    },
    toggleQueue(){
         const queue = document.querySelector('#toast-con');
         const check = toast.isQueueEmpty();
         check ? queue.classList.add('empty') : queue.classList.remove('empty');
    },
    isQueueEmpty(){
        return !toast.queue.length;
    }
}