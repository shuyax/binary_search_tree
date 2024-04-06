/* eslint-disable camelcase */
// eslint-disable-next-line import/prefer-default-export
class Node {
  constructor(data = null, left_child = null, right_child = null) {
    this.data = data;
    this.leftChild = left_child;
    this.rightChild = right_child;
  }
}

module.exports = { Node };
