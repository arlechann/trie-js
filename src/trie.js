export class Trie {
  constructor(TrieImplement = TreeTrie) {
    /** @type {TreeTrie} */
    this._trie = new TrieImplement;
  }

  /**
   * @param {string} str 
   * @returns {void}
   */
  insert(str) {
    this._trie.insert(str);
  }

  /**
   * @param {string} str 
   * @returns {string | undefined}
   */
  find(str) {
    return this._trie.find(str);
  }
}

class TreeTrie {
  constructor() {
    this._root = new TreeTrieNode;
    this._root.setIsEnd(true);
  }

  /**
   * @param {string} str 
   * @returns {void}
   */
  insert(str) {
    const chars = [...str];
    this._insertChars(chars, this._root);
  }

  /**
   * @param {string[]} chars 
   * @param {TreeTrieNode} node 
   * @returns {void}
   */
  _insertChars(chars, node) {
    if(chars.length === 0) {
      node.setIsEnd(true);
      return;
    }
    const [c, ...restChars] = chars;
    const nextNode = node.next(c) ?? node.addNext(c, new TreeTrieNode);
    this._insertChars(restChars, nextNode);
  }

  /**
   * @param {string} str 
   * @returns {string | undefined}
   */
  find(str) {
    const chars = [...str];
    return this._findChars(chars, this._root) ? str : undefined;
  }

  /**
   * @param {string[]} chars 
   * @param {TreeTrieNode} node 
   * @returns {boolean}
   */
  _findChars(chars, node) {
    if(chars.length === 0) {
      return node.isEnd();
    }
    const [c, ...restChars] = chars;
    const nextNode = node.next(c);
    return nextNode === undefined ? false : this._findChars(restChars, nextNode);
  }
}

class TreeTrieNode {
  constructor() {
    this._isEnd = false;
    this._next = {};
  }

  /**
   * @param {string} c 
   * @param {TreeTrieNode} next 
   * @returns {TreeTrieNode}
   */
  addNext(c, next) {
    return this._next[c] = next;
  }

  /**
   * @param {string} c 
   * @returns {TreeTrieNode | undefined}
   */
  next(c) {
    return this._next[c];
  }

  /**
   * @param {boolean} isEnd 
   * @returns {boolean}
   */
  setIsEnd(isEnd) {
    return this._isEnd = isEnd;
  }

  /**
   * @returns {boolean}
   */
  isEnd() {
    return this._isEnd;
  }
}
