import { newEl } from "./elements.js";

export const toast = {
    queue: [],
    createMsg(txt, type){
        return {txt, type, count: 1}
    },
    printMsg(msg){
        let counter;

        const queue = document.querySelector('#toast-con');
        const newMsg = newEl('p', `${msg.txt}`, null, [`${msg.type}`, 'toast', 'active']);

        msg.count > 1 ? counter = newEl('span', ` ${msg.count}x`) : counter = undefined;
        if (counter !== undefined) { toast.removeMsg(msg); newMsg.append(counter); }

        queue.prepend(newMsg);

        setTimeout(() => {
            newMsg.remove();
            toast.queue = toast.queue.filter(m => m.txt !== msg.txt);
        }, 4000);
    },
    removeMsg(msg){
        const queue = document.querySelector('#toast-con');
        const allMsgs = queue.querySelectorAll('p');
        if (!allMsgs.length) return;
        const toRemove = [...allMsgs].filter(m => m.textContent.includes(msg.txt)) || [];
        if (toRemove.length > 0) { toRemove.forEach(el => el.remove()); }

    },
    findMsgInQueue(msg){
        return toast.queue.find(m => m.txt === msg.txt) || undefined;
    },
    queueToast(txt, status){
    const type = (status === true ? "success" : "error");
    const msg = toast.createMsg(txt, type);
    const exists = toast.findMsgInQueue(msg);

    if (exists === undefined) {
        toast.queue.push(msg);
        toast.printMsg(msg);
    } else {
        exists.count++;
        toast.printMsg(exists);
    }
    },
}