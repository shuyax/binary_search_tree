class Queue {
  constructor() {
    this.queue = [];
  }

  enQueue(node) {
    this.queue.push(node);
  }

  deQueue() {
    this.queue.shift(1);
  }

  getFirstElementInQueue() {
    if (this.queue.length !== 0) {
      return this.queue[0];
    }
    return null;
  }
}
module.exports = { Queue };
