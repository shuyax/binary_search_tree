/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
const { Node } = require('./node');

class Tree {
  constructor(root) {
    this.root = root;
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
    } else {
      sorted_array.push(right[j]);
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

function buildTree(sorted_array) {
  if (sorted_array.length <= 1) {
    return new Node(sorted_array[0]);
  }
  const mid = Math.floor(sorted_array.length / 2);
  const root_node = new Node(sorted_array[mid]);
  root_node.leftChild = buildTree(sorted_array.slice(0, mid));
  root_node.rightChild = buildTree(sorted_array.slice(mid + 1, sorted_array.length));
  return root_node;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
// const array_of_data = [1, 7, 4, 9, 6];
const array_of_data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const sorted_array = mergeSort(array_of_data);

console.log(sorted_array);
console.log(buildTree(sorted_array));
prettyPrint(buildTree(sorted_array));
// module.exports = { mergeSort };
