/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
const { Node } = require('./node');
const { Queue } = require('./queue');

class Tree {
  constructor(sorted_array) {
    this.root = this.buildTree(sorted_array);
  }

  buildTree(sorted_array) {
    if (sorted_array.length === 1) {
      return new Node(sorted_array[0]);
    } if (sorted_array.length < 1) {
      return;
    }
    const mid = Math.floor(sorted_array.length / 2);
    const root_node = new Node(sorted_array[mid]);
    root_node.leftChild = this.buildTree(sorted_array.slice(0, mid));
    root_node.rightChild = this.buildTree(sorted_array.slice(mid + 1, sorted_array.length));
    return root_node;
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node == null) {
      return;
    }
    if (node.rightChild != null) {
      this.prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.leftChild != null) {
      this.prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  insertRec(current_node, value) {
    const new_node = new Node(value);
    if (current_node == null) {
      current_node = new_node;
      return current_node;
    }
    if (value < current_node.data) {
      current_node.leftChild = this.insertRec(current_node.leftChild, value);
    } else if (value > current_node.data) {
      current_node.rightChild = this.insertRec(current_node.rightChild, value);
    }
    return current_node;
  }

  insert(value) {
    let current_node = this.root;
    current_node = this.insertRec(current_node, value);
    return current_node;
  }

  deleteRec(current_node, value) {
    if (current_node == null) {
      return current_node;
    }
    if (value < current_node.data) {
      current_node.leftChild = this.deleteRec(current_node.leftChild, value);
      return current_node;
    }
    if (value > current_node.data) {
      current_node.rightChild = this.deleteRec(current_node.rightChild, value);
      return current_node;
    }
    if (current_node.data === value) {
      if (current_node.leftChild == null && current_node.rightChild == null) {
        // No children node exists
        return null;
      }
      if (current_node.leftChild != null && current_node.rightChild == null) {
        // Only have left node
        return current_node.leftChild;
      }
      if (current_node.leftChild == null && current_node.rightChild != null) {
        // Only have right node
        return current_node.rightChild;
      }
      if (current_node.leftChild != null && current_node.rightChild != null) {
        // Both children node exist
        let succ_parent = current_node;
        let succ = current_node.rightChild;
        while (succ.leftChild != null) {
          succ_parent = succ;
          succ = succ.leftChild;
        }
        const temp = succ;
        succ_parent.leftChild = temp.rightChild;
        succ.leftChild = current_node.leftChild;
        succ.rightChild = current_node.rightChild;
        return succ;
      }
    }
  }

  delete(value) {
    let current_node = this.root;
    current_node = this.deleteRec(current_node, value);
    return current_node;
  }

  findRec(current_node, value) {
    if (current_node.data === value) {
      return current_node;
    }
    if (current_node == null) {
      return;
    }
    if (value < current_node.data) {
      return this.findRec(current_node.leftChild, value);
    }
    if (value > current_node.data) {
      return this.findRec(current_node.rightChild, value);
    }
  }

  find(value) {
    let current_node = this.root;
    current_node = this.findRec(current_node, value);
    return current_node;
  }

  levelOrder(callback = null) {
    const queue = new Queue();
    const value = [];
    let current_node = this.root;
    queue.enQueue(current_node);
    while (current_node != null) {
      value.push(current_node.data);
      if (current_node.leftChild != null) {
        queue.enQueue(current_node.leftChild);
      }
      if (current_node.rightChild != null) {
        queue.enQueue(current_node.rightChild);
      }
      queue.deQueue(current_node);
      current_node = queue.getFirstElementInQueue();
    }
    return value;
  }

  inOrderRec(current_node, queue, value, callback) {
    if (current_node == null) {
      return;
    }
    if (current_node.leftChild != null) {
      this.inOrderRec(current_node.leftChild, queue, value, callback);
    }
    queue.enQueue(current_node);
    value.push(current_node.data);
    queue.deQueue(current_node);
    this.inOrderRec(current_node.rightChild, queue, value, callback);
    return value;
  }

  inOrder(callback = null) {
    const queue = new Queue();
    const value = [];
    const current_node = this.root;
    return this.inOrderRec(current_node, queue, value, callback);
  }

  preOrderRec(current_node, queue, value, callback) {
    if (current_node == null) {
      return;
    }
    queue.enQueue(current_node);
    value.push(current_node.data);
    queue.deQueue(current_node);

    if (current_node.leftChild != null) {
      this.preOrderRec(current_node.leftChild, queue, value, callback);
    }
    if (current_node.rightChild != null) {
      this.preOrderRec(current_node.rightChild, queue, value, callback);
    }
    return value;
  }

  preOrder(callback = null) {
    const queue = new Queue();
    const value = [];
    const current_node = this.root;
    return this.preOrderRec(current_node, queue, value, callback);
  }

  postOrderRec(current_node, queue, value, callback) {
    if (current_node == null) {
      return;
    }
    if (current_node.leftChild != null) {
      this.postOrderRec(current_node.leftChild, queue, value, callback);
    }
    this.postOrderRec(current_node.rightChild, queue, value, callback);
    queue.enQueue(current_node);
    value.push(current_node.data);
    queue.deQueue(current_node);

    return value;
  }

  postOrder(callback = null) {
    const queue = new Queue();
    const value = [];
    const current_node = this.root;
    return this.postOrderRec(current_node, queue, value, callback);
  }

  height(node) {
    const current_node = node;
    if (current_node == null) {
      return -1;
    }
    const left_height = this.height(current_node.leftChild);
    const right_height = this.height(current_node.rightChild);
    if (left_height > right_height) {
      return left_height + 1;
    }
    return right_height + 1;
  }

  depth(node) {
    let current_node = this.root;
    let node_depth = 0;
    while (current_node != null && current_node.data !== node.data) {
      if (current_node.data < node.data) {
        current_node = current_node.rightChild;
      } else if (current_node.data > node.data) {
        current_node = current_node.leftChild;
      }
      node_depth += 1;
    }
    return node_depth;
  }

  isBalancedRec(current_node) {
    if (current_node == null) {
      return true;
    }
    const left_height = this.height(current_node.leftChild);
    const right_height = this.height(current_node.rightChild);
    // eslint-disable-next-line max-len
    if (Math.abs(left_height - right_height) <= 1 && this.isBalancedRec(current_node.leftChild) == true && this.isBalancedRec(current_node.rightChild) == true) {
      return true;
    }
    return false;
  }

  isBalanced(current_node = this.root) {
    if (this.isBalancedRec(current_node) == true) {
      return true;
    }
    return false;
  }

  rebalance() {
    if (this.isBalanced(this.root) == false) {
      this.root = this.buildTree(this.inOrder());
    }
    return this.root;
  }
}

function mergeSort(array_of_data) {
  if (array_of_data.length <= 1) {
    return array_of_data;
  }
  const mid = Math.floor(array_of_data.length / 2);
  const left = mergeSort(array_of_data.slice(0, mid));
  const right = mergeSort(array_of_data.slice(mid, array_of_data.length));
  let i = 0;
  let j = 0;
  const sorted_array = [];
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      sorted_array.push(left[i]);
      i++;
    } else if (left[i] > right[j]) {
      sorted_array.push(right[j]);
      j++;
    } else {
      sorted_array.push(left[i]);
      i++;
      j++;
    }
  }
  while (i < left.length) {
    sorted_array.push(left[i]);
    i++;
  } while (j < right.length) {
    sorted_array.push(right[j]);
    j++;
  }
  return sorted_array;
}

function generateRandomArray(n) {
  const random_array = [];
  for (let i = 0; i < n; i++) {
    random_array.push(Math.floor(Math.random() * 100));
  }
  return random_array;
}

const array_of_data = generateRandomArray(10);
console.log(array_of_data);
// const array_of_data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67];
const sorted_array = mergeSort(array_of_data);
console.log(sorted_array);
const newTree = new Tree(sorted_array);
newTree.prettyPrint();
console.log(newTree.isBalanced());
console.log('Level Order: ', newTree.levelOrder());
console.log('In Order(Left -> root -> right): ', newTree.inOrder());
console.log('Pre Order(root -> left -> right): ', newTree.preOrder());
console.log('Post order(left -> right -> root): ', newTree.postOrder());
newTree.insert(324);
newTree.insert(6345);
newTree.insert(6346);
newTree.insert(6347);
console.log(newTree.isBalanced());
newTree.prettyPrint();
newTree.prettyPrint(newTree.find(324));
newTree.rebalance();
console.log(newTree.isBalanced());
newTree.prettyPrint();
console.log('Level Order: ', newTree.levelOrder());
console.log('In Order(Left -> root -> right): ', newTree.inOrder());
console.log('Pre Order(root -> left -> right): ', newTree.preOrder());
console.log('Post order(left -> right -> root): ', newTree.postOrder());
newTree.prettyPrint(newTree.find(324));
newTree.delete(6345);
newTree.prettyPrint();
console.log(newTree.height(newTree.find(324)));
console.log(newTree.depth(newTree.find(324)));

// module.exports = { mergeSort };
