export default class Queue {
    constructor() {
        this.queue = [];
    }

    enqueue(item) {
        if (!item) {
            throw new Error("You need to actually add something to the queue");
        }
        this.queue.push(item);
        return this.queue;
    }

    dequeue() {
        if (!this.size()) {
            throw new Error("You're trying to dequeue an empty queue");
        }        
         
        /* DISCLAIMER:
         ** this queue is by definition not a queue. 
         ** In this case though, I will give you what you asked for.
         */ 
        return this.queue.splice(0, this.queue.length).pop();
    }

    size() {
        return this.queue.length
    }
}