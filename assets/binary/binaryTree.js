(function () {
  // 存放树变量
  var root = null;

  /**
   * 节点构造器
   * @param {number} key 节点值
   */
  var Node = function (key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }

  /**
   * 插入节点
   * @param {Object} node 
   * @param {Object} newNode 
   */
  var insertNode = function(node, newNode) {
    if (node.key > newNode.key) {
      if (node.left) {
        insertNode(node.left, newNode);
      } else {
        node.left = newNode;
      }
    } else if (node.key < newNode.key) {
      if (node.right) {
        insertNode(node.right, newNode);
      } else {
        node.right = newNode;
      }
    }
  }

  /**
   * 中序便利（升序排列）
   * @param {Object} node 
   * @param {Function} callback 
   */
  var inorderTraversal = function (node, callback) {
    if (node === null) return;
    /**
     * 左 -> 中 -> 右
     */
    inorderTraversal(node.left, callback);
    callback(node.key);
    inorderTraversal(node.right, callback);
  }

  /**
   * 先序便利（一般用于复制二叉树）
   * @param {Object} node 
   * @param {Function} callback 
   */
  var preorderTraversal = function (node, callback) {
    if (node === null) return;
    /**
     * 中 -> 左 -> 右
     */
    callback(node.key);
    preorderTraversal(node.left, callback);
    preorderTraversal(node.right, callback);
  }

  /**
   * 先序便利（一般用于目录树遍历）
   * @param {Object} node 
   * @param {Function} callback 
   */
  var nextorderTraversal = function (node, callback) {
    if (node === null) return;
    /**
     * 左 -> 右 -> 中
     */
    nextorderTraversal(node.left, callback);
    nextorderTraversal(node.right, callback);
    callback(node.key);
  }

  /**
   * 获取最小节点
   */
  var minNode = function (node) {
    if (node.left) {
      return minNode(node.left);
    } else {
      return node.key;
    }
  }

  /**
   * 获取最大节点
   */
  var maxNode = function (node) {
    if (node.right) {
      return maxNode(node.right);
    } else {
      return node.key;
    }
  }

  /**
   * 获取指定节点
   * @param {Object} node 
   * @param {number} key 
   */
  var searchNode = function (node, key) {
    if (!node) return false;
    if (node.key > key) {
      return searchNode(node.left, key);
    } else if (node.key < key) {
      return searchNode(node.right, key);
    } else {
      return true;
    }

    return false;
  }

  /**
   * 删除指定节点
   * @param {Object} node 
   * @param {number} key 
   */
  var removeNode = function (node, key) {
    if (node.key > key) {
      node.left = removeNode(node.left, key);
      return node;
    } else if (node.key < key) {
      node.right = removeNode(node.right, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      } else if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      } else {
        var min = minNode(node.right);
        node.key = min;
        node.right = removeNode(node.right, min);
        return node;
      }
    }
  } 

  var BinaryTree = function () {
    /**
     * 获取二叉树
     */
    this.getTree = function () {
      return root;
    }

    /**
     * 插入节点
     * @param {number} key 插入值
     */
    this.insert = function (key) {
      var newNode = new Node(key);
      if (root === null) {
        root = newNode;
      } else {
        insertNode(root, newNode);
      }
    }

    /**
     * 中序便利
     * @param {Function} callback 
     */
    this.inorderTraversal = function (callback) {
      inorderTraversal(root, callback);
    }

    /**
     * 先序遍历
     * @param {Function} callback 
     */
    this.preorderTraversal = function (callback) {
      preorderTraversal(root, callback);
    }

    /**
     * 后序遍历
     * @param {Function} callback 
     */
    this.nextorderTraversal = function (callback) {
      nextorderTraversal(root, callback);
    }

    /**
     * 最小节点
     */
    this.min = function () {
      return minNode(root);
    }

    /**
     * 最大节点
     */
    this.max = function () {
      return maxNode(root);
    }

    /**
     * 获取指定节点
     */
    this.search = function (key) {
      return searchNode(root, key);
    }

    /**
     * 删除节点
     * @param {number} key 
     */
    this.remove = function (key) {
      return removeNode(root, key);
    }
  }

  window.BinaryTree = BinaryTree;
})()