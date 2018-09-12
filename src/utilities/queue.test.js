import Queue from './queue';

describe('LIFO Queue', () => {
    let testQueue;
    
    beforeEach((() => {
        testQueue = new Queue();
    }))
    
    it('it is able to queue elements', async () => {
        testQueue.enqueue(1);
        testQueue.enqueue(2);
        
        let a = testQueue.enqueue(3);
        expect(a).toEqual([3, 2, 1]);
    })

    it('dequeuing an element removes all elements in queue', async () => {
        testQueue.enqueue(1);
        testQueue.enqueue(2);
        testQueue.enqueue(3);
        expect(testQueue.dequeue()).toEqual(3);
        expect(testQueue.size()).toEqual(0);
    })

    it('throws an error if dequeueing an empty queue', async () => {
        expect(testQueue.dequeue).toThrowError();
        expect(testQueue.size()).toEqual(0);
    })
})

