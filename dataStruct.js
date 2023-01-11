// Стек
function Stack() {
  this.stack = {};
  Object.defineProperty(this, "length", {
    enumerable: false,
    writable: true,
    configurable: true,
    value: 0,
  });
}
Stack.prototype.push = function (item) {
  this.stack[this.length] = item;
  this.length++;
  return this;
};
Stack.prototype.pop = function () {
  delete this.stack[this.length - 1];
  this.length--;
  return this;
};
Stack.prototype.peek = function () {
  if (!this.length) return "Stack пустой";
  return this.stack[this.length - 1];
};
Stack.prototype.isFull = function () {
  if (this.length >= 99) return "Stack переполнен";
  return "Stack не переполнен";
};
Stack.prototype.isEmpty = function () {
  if (!this.length) return "Stack пустой";
  return "Stack не пустой";
};
//   Связный и двусвязный список
function List() {
  this.head = null;
  this.tail = null;
}
List.prototype.append = function (item) {
  let node = {
    value: item,
    next: null,
  };
  if (this.head) {
    this.tail.next = node;
    this.tail = node;
  }
  if (!this.head) {
    this.head = node;
    this.tail = node;
  }
  let thisList = this.head;
  this.tail.prev = function () {
    let iter = thisList;
    while (iter) {
      if (thisList === this) return thisList;
      if (iter.next === this) return iter;
      iter = iter.next;
    }
  };
};
List.prototype.prepend = function (item) {
  let node = {
    value: item,
    next: null,
  };
  if (this.head) {
    node.next = this.head;
    this.head = node;
  }
  if (!this.head) {
    this.head = node;
    this.tail = node;
  }
  let thisList = this.head;
  this.head.prev = function () {
    let iter = thisList;
    while (iter) {
      if (thisList === this) return thisList;
      if (iter.next === this) return iter;
      iter = iter.next;
    }
  };
};
List.prototype.find = function (value) {
  let iter = this.head;
  while (iter) {
    if (iter.value == value) return "Значение присутствует";
    iter = iter.next;
  }
  return "Значение не найдено";
};
List.prototype.deleteHead = function () {
  if (this.head == this.tail) {
    this.head = null;
    this.tail = null;
    return;
  }
  this.head = this.head.next;
};
List.prototype.deleteTail = function () {
  if (this.head == this.tail) {
    this.head = null;
    this.tail = null;
    return;
  }
  let iter = this.head;
  while (iter) {
    if (!iter.next.next) {
      this.tail = iter;
      iter.next = null;
    }
    iter = iter.next;
  }
};
List.prototype.fromArray = function (arr) {
  arr.forEach((elem) => {
    this.append(elem);
  });
};
List.prototype.toArray = function () {
  let iter = this.head;
  let result = [];
  while (iter) {
    result.push(iter.value);
    iter = iter.next;
  }
  return result;
};
List.prototype.toString = function () {
  return this.toArray() + "";
};
List.prototype.reverse = function () {
  let result = this.toArray();
  result = result.reverse();
  this.head = null;
  this.tail = null;
  result.forEach((elem) => {
    this.append(elem);
  });
};
List.prototype.delete = function (value) {
  let iter = this.head;
  while (iter) {
    if (iter == this.tail && iter.value == this.tail.value) {
      this.deleteTail();
      break;
    }
    if (this.head && this.head.value == value) {
      this.deleteHead();
      continue;
    }
    if (iter.next && iter.next.value == value && iter.next != this.tail) {
      iter.next = iter.next.next;
      continue;
    }
    iter = iter.next;
  }
};
//   Очередь и двусторонняя очередь
function Queue() {
  this.queue = {};
  this.length = 0;
}
Queue.prototype.shift = function (item, p) {
  let node = {
    value: item,
    p: p,
  };
  this.queue[this.length] = node;
  this.length++;
};
Queue.prototype.unshift = function () {
  let length = 0;
  let acc = null;
  while (length < this.length) {
    let elem = this.queue[length];
    if (!acc) {
      acc = { [length]: elem };
      length++;
      continue;
    }
    if (elem.p >= acc[length - 1].p) {
      acc = { [length]: elem };
      length++;
      continue;
    }
    length++;
  }
  let key = +Object.keys(acc)[0];
  while (key < this.length) {
    if (!this.queue[key + 1]) break;
    this.queue[key] = this.queue[key + 1];
    key++;
  }
  this.length--;
  delete this.queue[this.length];
};
Queue.prototype.isEmpty = function () {
  if (!this.length) return "Queue пустая";
  return "Queue не пустая";
};
Queue.prototype.peek = function () {
  let length = 0;
  let acc = null;
  while (length < this.length) {
    let elem = this.queue[length];
    if (!acc) {
      acc = { [length]: elem };
      length++;
      continue;
    }
    if (elem.p >= acc[length - 1].p) {
      acc = { [length]: elem };
      length++;
      continue;
    }
    length++;
  }
  if (acc) return acc;
  return "Значений нет";
};

//   Бинарное дерево

TreeBinary.prototype.add = function (item) {
  const node = {
    value: item,
    left: null,
    right: null,
  };
  if (!this.head) {
    this.head = node;
    return;
  }
  const queue = [this.head];
  while (queue.length > 0) {
    const root = queue.shift();
    if (root.value < item && !root.right) {
      root.right = node;
      break;
    }
    if (root.value > item && !root.left) {
      root.left = node;
      break;
    }
    if (root.value < item && root.right) {
      queue.push(root.right);
    }
    if (root.value > item && root.left) {
      queue.push(root.left);
    }
  }
};
TreeBinary.prototype.find = function (item) {
  const queue = [this.head];
  while (queue.length) {
    const root = queue.shift();
    if (root.value == item) return "Значение присутствует!";
    if (root.value < item && root.right) queue.push(root.right);
    if (root.value > item && root.left) queue.push(root.left);
  }
  return "Данные отсутствуют!";
};
TreeBinary.prototype.BFS = function () {
  const queue = [this.head];
  const result = [];
  while (queue.length) {
    const root = queue.shift();
    result.push(root.value);
    if (root.left) queue.push(root.left);
    if (root.right) queue.push(root.right);
  }
  return result;
};
TreeBinary.prototype.DFS = function () {
  const queue = [this.head];
  const result = [];
  while (queue.length) {
    const root = queue.pop();
    result.push(root.value);
    if (root.left) queue.push(root.left);
    if (root.right) queue.push(root.right);
  }
  return result;
};
TreeBinary.prototype.delete = function (item) {
  const queue = [this.head];
  let length = 0;
  while (queue) {
    if (length != -1 && !queue[length]) return "Данные не найдены";

    const root = queue[length];
    if (root.value == item) {
      // HEAD ELEMENT
      if (length - 1 == -1) {
        // Если дочерних элементов нет
        if (!root.left && !root.right) {
          this.head = null;
          return;
        }
        // Если есть один из дочерних элементов
        if (root.left && !root.right) {
          this.head = root.left;
          return;
        }
        if (root.right && !root.left) {
          this.head = root.right;
          return;
        }
        // Если есть оба дочерних элемента
        if (root.left && root.right) {
          let iter = root.right;
          while (iter) {
            if (!iter.left) {
              iter.left = root.left;
              break;
            }
            iter = iter.left;
          }
          this.head = root.right;
          return;
        }
      }
      // Для SUB где дочерних элементов не существует
      if (!root.left && !root.right) {
        const parent = queue[length - 1];
        if (parent.left && parent.left == root) {
          parent.left = null;
          return;
        }
        if (parent.right && parent.right == root) {
          parent.right = null;
          return;
        }
      }
      // Для SUB где один из дочерних элементов существует
      if (root.left && !root.right) {
        const parent = queue[length - 1];
        if (parent.left && parent.left == root) {
          parent.left = root.left;
          return;
        }
        if (parent.right && parent.right == root) {
          parent.right = root.left;
          return;
        }
      }
      if (root.right && !root.left) {
        const parent = queue[length - 1];
        if (parent.left && parent.left == root) {
          parent.left = root.right;
          return;
        }
        if (parent.right && parent.right == root) {
          parent.right = root.right;
          return;
        }
      }
      // Для SUB где оба дочерних элемента существуют
      if (root.right && root.left) {
        const parent = queue[length - 1];
        let iter = root.right;
        while (iter) {
          if (!iter.left) {
            iter.left = root.left;
            break;
          }
          iter = iter.left;
        }
        if (parent.left && parent.left == root) {
          parent.left = root.right;
          return;
        }
        if (parent.right && parent.right == root) {
          parent.right = root.right;
          return;
        }
      }
    }

    if (root.value < item && root.right) {
      queue.push(root.right);
      length++;
      continue;
    }
    if (root.value > item && root.left) {
      queue.push(root.left);
      length++;
      continue;
    }
    length++;
  }
};
// Куча

function Heap(array) {
  this.heap = array;
}
Heap.prototype.maxHeap = function () {
  const heap = this.heap;
  for (let i = 0; i < heap.length; ) {
    if (heap[i] < heap[i + 1] || heap[i] < heap[i + 2]) {
      if (heap[i] < heap[i + 1]) {
        [heap[i], heap[i + 1]] = [heap[i + 1], heap[i]];
      }
      if (heap[i] < heap[i + 2]) {
        [heap[i], heap[i + 2]] = [heap[i + 2], heap[i]];
      }
      if (i - 1 == -1) {
        i++;
        continue;
      }
      if (i - 1 != -1) {
        i--;
        continue;
      }
    }
    i++;
  }
};
Heap.prototype.minHeap = function () {
  const heap = this.heap;
  for (let i = 0; i < heap.length; ) {
    if (heap[i] > heap[i + 1] || heap[i] > heap[i + 2]) {
      if (heap[i] > heap[i + 1]) {
        [heap[i], heap[i + 1]] = [heap[i + 1], heap[i]];
      }
      if (heap[i] > heap[i + 2]) {
        [heap[i], heap[i + 2]] = [heap[i + 2], heap[i]];
      }
      if (i - 1 == -1) {
        i++;
        continue;
      }
      if (i - 1 != -1) {
        i--;
        continue;
      }
    }
    i++;
  }
};
// Хэш таблица

function Hash(length) {
  this.hash = new Array(length);
}
Hash.prototype.hashing = function (key) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i);
  }
  return hash % this.hash.length;
};
Hash.prototype.add = function (key, value) {
  const i = this.hashing(key);
  if (this.hash[i])
    return "Не удалось добавить, т.к. данная ячейка занята. Попробуйте изменить ключ";
  this.hash[i] = value;
};
Hash.prototype.find = function (key) {
  const i = this.hashing(key);
  if (this.hash[i]) return this.hash[i];
  return "Значение отсутствует!";
};
Hash.prototype.delete = function (key) {
  const i = this.hashing(key);
  if (this.hash[i]) {
    this.hash[i] = null;
    return "Значение удалено";
  }
  return "Значение отсутствует";
};
// Система множеств
function System() {
  this.system = {};
}
System.prototype.makeSystem = function (item) {
  if (this.system[item]) return "Множество уже существует";
  this.system[item] = {
    value: item,
    parent: item,
    weight: 0,
  };
};
System.prototype.findSystem = function (item) {
  if (!this.system[item]) return "Множество не существует";
  if (this.system[item].parent == item) return this.system[item];
  return this.findSystem(this.system[item].parent);
};
System.prototype.unionSystem = function (x, y) {
  if (!this.system[x] || !this.system[y])
    return "Одного либо двух множеств не существует";
  const xItem = this.findSystem(x);
  const yItem = this.findSystem(y);
  if (xItem.weight == yItem.weight) {
    this.system[x].parent = this.system[y].parent;
    this.system[y].weight = ++this.system[y].weight;
    return;
  }
  if (xItem.weight > yItem.weight) {
    this.system[x].parent = this.system[y].parent;
    this.system[y].weight = ++this.system[y].weight;
    return;
  }
  if (xItem.weight < yItem.weight) {
    this.system[y].parent = this.system[x].parent;
    this.system[x].weight = ++this.system[x].weight;
    return;
  }
};

// Дерево Фенвика

function Fenwick(array) {
  this.fenwickMaxMin = array;
  Object.defineProperty(this, "fenwick", {
    get() {
      const subArray = array;
      const result = [];
      for (let i = 0; i < subArray.length; i++) {
        if (!i) {
          result.push(subArray[i]);
        }
        if (i) {
          result.push(subArray[i] + result[i - 1]);
        }
      }
      return result;
    },
  });
}
Fenwick.prototype.getSum = function (i, j) {
  if (i < 0 || i == this.fenwick.length - 2) {
    return "Вы неверно указали начальную точку!";
  }
  if (j > this.fenwick.length - 1 || j < 1) {
    return "Вы неверно указали конечную точку";
  }
  return this.fenwick[j] - this.fenwick[i];
};
Fenwick.prototype.getMaxValue = function (i, j) {
  if (i < 0 || i == this.fenwick.length - 2) {
    return "Вы неверно указали начальную точку!";
  }
  if (j > this.fenwick.length - 1 || j < 1) {
    return "Вы неверно указали конечную точку";
  }
  const result = this.fenwickMaxMin.slice(i, j);
  return Math.max(...result);
};
Fenwick.prototype.getMinValue = function (i, j) {
  if (i < 0 || i == this.fenwick.length - 2) {
    return "Вы неверно указали начальную точку!";
  }
  if (j > this.fenwick.length - 1 || j < 1) {
    return "Вы неверно указали конечную точку";
  }
  const result = this.fenwickMaxMin.slice(i, j);
  return Math.min(...result);
};
// Префиксное дерево

function PrefixTree() {
  this.head = {};
}
PrefixTree.prototype.uniqData = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i - 1]) {
      arr.splice(i, 1);
      i--;
    }
  }
  return arr;
};
PrefixTree.prototype.add = function (string, data) {
  let node = this.head;
  let str = string.toLowerCase().split("");
  let i = 0;
  let array = this.uniqData(str);
  while (i < array.length) {
    if (!node[array[i]])
      node[array[i]] = { name: "", isBool: false, translate: "" };

    if (i === array.length - 1) {
      if (node[array[i]].name) {
        if (typeof node[array[i]].name == "string") {
          let value = node[array[i]].name;
          node[array[i]].name = [];
          node[array[i]].name.push(value);
          let valueData = node[array[i]].translate;
          node[array[i]].translate = [];
          node[array[i]].translate.push(valueData);
        }
        let bool = node[array[i]].name.find((elem) => elem === string);
        if (bool) return;
        node[array[i]].name.push(string);
        node[array[i]].translate.push(data);
      }

      if (!node[array[i]].name) {
        node[array[i]].name = string;
        node[array[i]].isBool = true;
        node[array[i]].translate = data;
      }
    }

    node = node[array[i]];
    i++;
  }
};
PrefixTree.prototype.find = function (string) {
  let node = this.head;
  let str = string.toLowerCase().split("");
  let i = 0;
  let array = this.uniqData(str);
  while (i < array.length) {
    if (
      typeof node[array[i]].name == "string" &&
      node[array[i]].name == string
    ) {
      return "Найдено";
    }
    if (Array.isArray(node[array[i]].name)) {
      const elem = node[array[i]].name.find((e) => e == string);
      if (elem) return "Найдено";
    }
    node = node[array[i]];
    i++;
  }
  return "Значения нет";
};
function PrefTree() {
  this.head = {};
}

PrefTree.prototype.uniqData = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i - 1]) {
      arr.splice(i, 1);
      i--;
    }
  }
  return arr;
};

PrefTree.prototype.add = function (string, data) {
  let node = this.head;
  let str = string.toLowerCase().split("");
  let i = 0;
  let array = this.uniqData(str);
  while (i < array.length) {
    if (!node[array[i]])
      node[array[i]] = { name: "", isBool: false, translate: data };
    if (i === array.length - 1) {
      if (node[array[i]].name) {
        if (typeof node[array[i]].name == "string") {
          let value = node[array[i]].name;
          node[array[i]].name = [];
          node[array[i]].name.push(value);
        }
        let bool = node[array[i]].name.find((elem) => elem === string);
        if (bool) return;
        node[array[i]].name.push(string);
      }
      if (!node[array[i]].name) {
        node[array[i]].name = string;
        node[array[i]].isBool = true;
      }
    }
    node = node[array[i]];
    i++;
  }
};

PrefTree.prototype.find = function (string) {
  let str = string.toLowerCase().split("");
  let array = this.uniqData(str);
  if (!this.head[array[0]]) return null;
  let node = this.head;
  let i = 0;
  string = string.toLowerCase();
  while (i < array.length) {
    if (!node[array[i]]) return null;
    if (typeof node[array[i]].name == "string") {
      if (node[array[i]].name.toLowerCase() === string)
        return node[array[i]].translate;
    }
    if (typeof node[array[i]].name == "object") {
      let value = node[array[i]].name.find(
        (elem) => elem.toLowerCase() === string
      );
      if (value) return node[array[i]].translate;
    }
    node = node[array[i]];
    i++;
  }
};

PrefixTree.prototype.allWords = function () {
  let arr = this.head;
  let result = [];
  function rec(arr) {
    for (let key in arr) {
      if (typeof arr[key] == "string" && arr[key]) result.push(arr[key]);
      if (typeof arr[key] == "object") rec(arr[key]);
    }
  }
  rec(arr);
  return result;
};
PrefixTree.prototype.delete = function (string) {
  let node = this.head;
  let str = string.toLowerCase().split("");
  let i = 0;
  let array = this.uniqData(str);
  let result = [];
  while (i < array.length) {
    result.push(node[array[i]]);
    if (i == array.length - 1) {
      if (
        Array.isArray(node[array[i]].name) &&
        node[array[i]].name.length > 1
      ) {
        let iElem = node[array[i]].name.indexOf(string);
        node[array[i]].name.splice(iElem, 1);
        node[array[i]].translate.splice(iElem, 1);
        return "Удалено";
      }
      if (
        (Array.isArray(node[array[i]].name) &&
          node[array[i]].name.length == 1) ||
        (node[array[i]].name && typeof node[array[i]].name == "string")
      ) {
        let deleteIndex = false;
        for (let i = result.length - 2; i >= 0; i--) {
          if (result[i].name || Object.keys(result[i]).length > 4)
            deleteIndex = i;
        }
        if (deleteIndex) deleteIndex = string[deleteIndex];
        let nodeNode = this.head;
        let strNode = string.toLowerCase().split("");
        let iNode = 0;
        let arrayNode = this.uniqData(strNode);
        while (iNode < arrayNode.length) {
          if (arrayNode[iNode] == deleteIndex) {
            delete nodeNode[arrayNode[iNode]][arrayNode[iNode + 1]];
            return "Удалено";
          }
          nodeNode = nodeNode[arrayNode[iNode]];
          iNode++;
        }
        if (!deleteIndex) {
          deleteIndex = string[0];
          deleteIndex = deleteIndex.toLowerCase();
          delete this.head[deleteIndex];
          return "Удалено";
        }
      }
    }
    node = node[array[i]];
    i++;
  }
  return "Значение не найдено";
};
// Красно-черное дерево
function RBT() {
  this.tree = null;
}

RBT.prototype.add = function (value) {
  const node = {
    value,
    color: "red",
    left: null,
    right: null,
  };
  if (!this.tree) {
    node.color = "black";
    this.tree = node;
    return "Добавлено";
  }
  const queue = [this.tree];
  while (queue.length) {
    const child = queue.shift();
    if (child.value == value) return "Значение уже присутствует";
    if (child.value < value && !child.right) {
      child.right = node;
      return "Добавлено";
    }
    if (child.value > value && !child.left) {
      child.left = node;
      return "Добавлено";
    }
    if (child.value > value && child.left) queue.push(child.left);
    if (child.value < value && child.right) queue.push(child.right);
  }
};
RBT.prototype.switchColor = function (root) {
  root.left.color = "black";
  root.right.color = "black";
  root.color = "red";
  if (this.tree == root) {
    root.color = "black";
  }
};
RBT.prototype.turnRightBig = function (root) {
  const acc = {
    value: root.value,
    color: root.color,
    left: root.left.right,
    right: root.right,
  };
  root.value = root.left.value;
  root.color = root.left.color;
  root.left = root.left.left;
  root.right = acc;
  root.left.color = "black";
  root.right.color = "black";
};
RBT.prototype.turnLeftBig = function (root) {
  const acc = {
    value: root.value,
    color: root.color,
    left: root.left,
    right: root.right.left,
  };
  root.value = root.right.value;
  root.color = root.right.color;
  root.left = acc;
  root.right = root.right.right;
  root.left.color = "black";
  root.right.color = "black";
};
RBT.prototype.turnLeftSmall = function (root) {
  const acc = {
    value: root.left.value,
    color: root.left.color,
    left: root.left.left,
    right: root.left.right.left,
  };
  root.left.value = root.left.right.value;
  root.left.color = root.left.right.color;
  root.left.right = root.left.right.right;
  root.left.left = acc;
};
RBT.prototype.turnRightSmall = function (root) {
  const acc = {
    value: root.right.value,
    color: root.right.color,
    left: root.right.left.right,
    right: root.right.right,
  };
  root.right.value = root.right.left.value;
  root.right.color = root.right.left.color;
  root.right.left = root.right.left.left;
  root.right.right = acc;
};
RBT.prototype.balance = function () {
  const queue = [this.tree];
  let i = 0;
  while (queue[i]) {
    const root = queue[i];
    if (root?.left?.color == "red" && root?.left?.right?.color == "red") {
      this.turnLeftSmall(root);
    }
    if (root?.right?.color == "red" && root?.right?.left?.color == "red") {
      this.turnRightSmall(root);
    }
    if (
      (root?.left?.color == "black" || !root?.left) &&
      root?.right?.color == "red" &&
      root?.right?.right?.color == "red"
    ) {
      this.turnLeftBig(root);
    }
    if (
      (root?.right?.color == "black" || !root?.right) &&
      root?.left?.color == "red" &&
      root?.left?.left?.color == "red"
    ) {
      this.turnRightBig(root);
    }
    if (
      root?.left?.color == "red" &&
      root?.right?.color == "red" &&
      root?.right?.right?.color == "red"
    ) {
      this.switchColor(root);
    }
    if (
      root?.right?.color == "red" &&
      root?.left?.color == "red" &&
      root?.left?.left?.color == "red"
    ) {
      this.switchColor(root);
    }
    if (root.left) queue.push(root.left);
    if (root.right) queue.push(root.right);
    i++;
  }
};

// АВЛ балансировка
function AVL() {
  this.tree = null;
}

AVL.prototype.add = function (value) {
  const node = {
    value,
    left: null,
    right: null,
  };
  if (!this.tree) {
    this.tree = node;
    return "Добавлено";
  }
  const queue = [this.tree];
  while (queue.length) {
    const child = queue.shift();
    if (child.value == value) return "Значение уже присутствует";
    if (child.value < value && !child.right) {
      child.right = node;
      return "Добавлено";
    }
    if (child.value > value && !child.left) {
      child.left = node;
      return "Добавлено";
    }
    if (child.value > value && child.left) queue.push(child.left);
    if (child.value < value && child.right) queue.push(child.right);
  }
};
AVL.prototype.turnLeftSmall = function (node) {
  const acc = {
    value: node.left.value,
    left: node.left.left,
    right: node.left.right.left,
  };
  node.left.value = node.left.right.value;
  node.left.left = acc;
  node.left.right = node.left.right.right;
};
AVL.prototype.turnRightSmall = function (node) {
  const acc = {
    value: node.right.value,
    left: node.right.left.right,
    right: node.right.right,
  };
  node.right.value = node.right.left.value;
  node.right.left = node.right.left.left;
  node.right.right = acc;
};
AVL.prototype.turnRightBig = function (node) {
  const acc = {
    value: node.value,
    left: node.left.right,
    right: node.right,
  };
  node.value = node.left.value;
  node.left = node.left.left;
  node.right = acc;
};
AVL.prototype.turnLeftBig = function (node) {
  const acc = {
    value: node.value,
    left: node.left,
    right: node.right.left,
  };
  node.value = node.right.value;
  node.left = acc;
  node.right = node.right.right;
};
AVL.prototype.height = function (node) {
  if (!node) return 0;
  const queue = [node];
  const height = [];
  while (queue.length) {
    height.push([]);
    const length = queue.length;
    for (let i = 0; i < length; i++) {
      const root = queue.shift();
      if (root.left) queue.push(root.left);
      if (root.right) queue.push(root.right);
    }
  }
  return height.length;
};
AVL.prototype.balance = function () {
  const queue = [this.tree];
  let i = 0;
  while (queue[i] !== undefined) {
    const node = queue[i];
    let left = null;
    let right = null;
    if (node.left) left = node.left;
    if (node.right) right = node.right;
    let length = this.height(left) - this.height(right);
    if (length > 0 && length != 1) {
      if (node?.left?.right) this.turnLeftSmall(node);
      if (node?.left?.left) {
        this.turnRightBig(node);
        continue;
      }
    }
    if (length < 0 && length != -1) {
      if (node?.right?.left) this.turnRightSmall(node);
      if (node?.right?.right) {
        this.turnLeftBig(node);
        continue;
      }
    }
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
    i++;
  }
};
// Фильтр Блума
function FilterBloom(length) {
  this.bloom = (function () {
    let result = [];
    for (let i = 0; i < length; i++) {
      result.push(0);
    }
    return result;
  })(length);
}

FilterBloom.prototype.hashMain = function (str, num) {
  let result = 0;
  str = str.split("");
  for (let i = 0; i < str.length; i++) {
    result += str[i].codePointAt(0);
    result = result % num;
  }
  return result;
};

FilterBloom.prototype.hashSub = function (str, num) {
  let result = 0;
  str = str.split("");
  for (let i = 0; i < str.length; i++) {
    result += str[i].codePointAt(0) + i;
    result = result % num;
  }
  return result;
};

FilterBloom.prototype.add = function (data) {
  let resultMain = this.hashMain(data, this.bloom.length);
  let resultSub = this.hashSub(data, this.bloom.length);
  this.bloom[resultMain] = 1;
  this.bloom[resultSub] = 1;
};

FilterBloom.prototype.find = function (data) {
  let resI = this.bloom[this.hashMain(data, this.bloom.length)];
  let resJ = this.bloom[this.hashSub(data, this.bloom.length)];
  return resI && resJ ? true : false;
};

// Дерево отрезков

function TreeRoot() {
  this.root = new Tree();
  this.length = 0;
}
function Tree() {
  this.data = null;
  this.left = null;
  this.right = null;
  this.len = function () {
    if (typeof this.left != "string" && typeof this.right != "string")
      return [this.left.len()[0], this.right.len()[1]];
  };
  this.sum = function () {
    if (typeof this.left == "string" && typeof this.right == "string")
      return this.data;
    if (typeof this.left != "string" && typeof this.right != "string")
      return this.left.sum() + this.right.sum();
  };
  Object.defineProperties(this, {
    len: {
      enumerable: false,
    },
    sum: {
      enumerable: false,
    },
  });
}
TreeRoot.prototype.add = function (arrData) {
  let len = arrData.length - 2;
  let arr = [];
  arr.push(this.root);
  while (len) {
    if (len < 1) break;
    let node = arr[0];
    if (!node.left) {
      node.left = new Tree();
      len--;
    }
    if (!node.right) {
      node.right = new Tree();
      len--;
    }
    if (node.left) arr.push(node.left);
    if (node.right) arr.push(node.right);
    arr.splice(0, 1);
  }
  function add(data, thisNode) {
    let arr = [];
    arr.push(thisNode.root);
    let value = {
      data: data,
      left: "End",
      right: "End",
      len: function () {
        return this.length;
      },
      length: [thisNode.length, thisNode.length],
      sum: function () {
        return this.data;
      },
    };
    while (arr.length) {
      let node = arr.pop();
      if (!node.left) {
        node.left = value;
        thisNode.length++;
        return;
      }
      if (!node.right) {
        node.right = value;
        thisNode.length++;
        return;
      }
      if (node.right && typeof node.right != "string") arr.push(node.right);
      if (node.left && typeof node.left != "string") arr.push(node.left);
    }
  }
  for (let i = 0; i < arrData.length; i++) {
    add(arrData[i], this);
  }
};
TreeRoot.prototype.calcSum = function (l, r, thisNode = this.root) {
  let arr = [];
  arr.push(thisNode);
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    let node = arr[i];
    if (node.len()[0] < l && node.len()[1] > r) {
      if (node.left) arr.push(node.left);
      if (node.right) arr.push(node.right);
    }
    if (
      (node.len()[0] < l && node.len()[1] >= l && node.len()[1] <= r) ||
      (node.len()[1] > r && node.len()[0] >= l && node.len()[0] <= r)
    ) {
      if (node.left) arr.push(node.left);
      if (node.right) arr.push(node.right);
    }
    if (node.len()[0] >= l && node.len()[1] <= r) {
      result += node.sum();
      continue;
    }
    if (node.len[1] < l) continue;
    if (node.len[0] > r) continue;
  }
  return result;
};
TreeRoot.prototype.minOrMaxValue = function (l, r, bool = true) {
  let arr = [];
  arr.push(this.root);
  let result = [];
  while (arr.length) {
    let node = arr[0];
    if (
      typeof node.left == "string" &&
      typeof node.right == "string" &&
      node.len()[0] >= l &&
      node.len()[1] <= r
    )
      result.push(node.data);
    if (node.left) arr.push(node.left);
    if (node.right) arr.push(node.right);
    arr.splice(0, 1);
  }
  return bool ? Math.max(...result) : Math.min(...result);
};
let tree = new TreeRoot();

//Фабрика графов

function Graph(bool = true) {
  return bool ? new GraphUndirected() : new GraphDirected();
}

//Граф ориентированный, не взвешенный

function GraphDirected() {
  this.arrayGraph = {};
  this.obj = {};
}

GraphDirected.prototype.addVertex = function (data) {
  if (!this.arrayGraph[data]) {
    this.arrayGraph[data] = { vertex: data };
    this.obj[data] = data;
  }
};

GraphDirected.prototype.addEdge = function (xEdge, yEdge) {
  if (!this.arrayGraph[xEdge][yEdge] && !this.arrayGraph[yEdge][xEdge])
    this.arrayGraph[xEdge][yEdge] = yEdge + "";
};

GraphDirected.prototype.breadthFirstTraversal = function (data) {
  let object = {};
  let boolObj = {};
  let array = [];
  let result = [];
  let obj = this.obj;
  let i = 0;
  result.push([]);
  array.push(this.arrayGraph[data]);
  object[data] = data;
  while (array.length) {
    let node = array[0];
    if (!boolObj[node.vertex]) {
      boolObj[node.vertex] = node.vertex;
      result[i].push(node.vertex);
    }
    delete obj[node.vertex + ""];
    for (let i in node) {
      if (i != "vertex") {
        if (!object[i]) {
          object[i] = i;
          array.push(this.arrayGraph[i]);
        }
      }
    }
    array.splice(0, 1);
    if (array.length === 0) {
      let arr = Object.keys(obj);
      if (arr.length > 0) {
        i++;
        result.push([]);
        array.push(this.arrayGraph[arr[0]]);
      }
    }
  }
  return result;
};

GraphDirected.prototype.depthFirstTraversal = function (data) {
  let object = {};
  let boolObj = {};
  let array = [];
  let result = [];
  let obj = this.obj;
  let i = 0;
  result.push([]);
  array.push(this.arrayGraph[data]);
  object[data] = data;
  while (array.length) {
    let node = array.pop();
    if (!boolObj[node.vertex]) {
      boolObj[node.vertex] = node.vertex;
      result[i].push(node.vertex);
    }
    delete obj[node.vertex + ""];
    for (let i in node) {
      if (i != "vertex") {
        if (!object[i]) {
          object[i] = i;
          array.push(this.arrayGraph[i]);
        }
      }
    }
    if (array.length === 0) {
      let arr = Object.keys(obj);
      if (arr.length > 0) {
        i++;
        result.push([]);
        array.push(this.arrayGraph[arr[0]]);
      }
    }
  }
  return result;
};

GraphDirected.prototype.minTrackToData = function (data, to) {
  let object = {};
  let boolObj = {};
  let array = [];
  let result = [];
  let track = {};
  track[this.arrayGraph[data].vertex] = "" + data;
  let obj = this.obj;
  let i = 0;
  result.push([]);
  array.push(this.arrayGraph[data]);
  object[data] = data;
  while (array.length) {
    let node = array[0];
    if (!boolObj[node.vertex]) {
      boolObj[node.vertex] = node.vertex;
      result[i].push(node.vertex);
    }
    delete obj[node.vertex + ""];
    for (let i in node) {
      if (i != "vertex") {
        if (!object[i]) {
          object[i] = i;
          array.push(this.arrayGraph[i]);
          track[i] = track[node.vertex] + ":" + i;
        }
      }
    }
    if (node.vertex == to) return track[node.vertex];
    array.splice(0, 1);
  }
  return false;
};

//Граф неориентированный, не взвешенный

function GraphUndirected() {
  this.arrayGraph = {};
  this.obj = {};
}

GraphUndirected.prototype.addVertex = function (data) {
  if (!this.arrayGraph[data]) {
    this.arrayGraph[data] = { vertex: data };
    this.obj[data] = data;
  }
};

GraphUndirected.prototype.addEdge = function (xEdge, yEdge) {
  if (
    this.arrayGraph[xEdge][yEdge] === yEdge &&
    this.arrayGraph[yEdge][xEdge] === xEdge
  )
    return;
  this.arrayGraph[xEdge][yEdge] = yEdge;
  this.arrayGraph[yEdge][xEdge] = xEdge;
  return;
};

GraphUndirected.prototype.depthFirstTraversal = function (data) {
  let object = {};
  let boolObj = {};
  let array = [];
  let result = [];
  let obj = this.obj;
  let i = 0;
  result.push([]);
  array.push(this.arrayGraph[data]);
  object[data] = data;
  while (array.length) {
    let node = array.pop();
    if (!boolObj[node.vertex]) {
      boolObj[node.vertex] = node.vertex;
      result[i].push(node.vertex);
    }
    delete obj[node.vertex + ""];
    for (let i in node) {
      if (i != "vertex") {
        if (!object[i]) {
          object[i] = i;
          array.push(this.arrayGraph[i]);
        }
      }
    }
    if (array.length === 0) {
      let arr = Object.keys(obj);
      if (arr.length > 0) {
        i++;
        result.push([]);
        array.push(this.arrayGraph[arr[0]]);
      }
    }
  }
  return result;
};

GraphUndirected.prototype.breadthFirstTraversal = function (data) {
  let object = {};
  let boolObj = {};
  let array = [];
  let result = [];
  let obj = this.obj;
  let i = 0;
  result.push([]);
  array.push(this.arrayGraph[data]);
  object[data] = data;
  while (array.length) {
    let node = array[0];
    if (!boolObj[node.vertex]) {
      boolObj[node.vertex] = node.vertex;
      result[i].push(node.vertex);
    }
    delete obj[node.vertex + ""];
    for (let i in node) {
      if (i != "vertex") {
        if (!object[i]) {
          object[i] = i;
          array.push(this.arrayGraph[i]);
        }
      }
    }
    array.splice(0, 1);
    if (array.length === 0) {
      let arr = Object.keys(obj);
      if (arr.length > 0) {
        i++;
        result.push([]);
        array.push(this.arrayGraph[arr[0]]);
      }
    }
  }
  return result;
};

GraphUndirected.prototype.minTrackToData = function (data, to) {
  let object = {};
  let boolObj = {};
  let array = [];
  let result = [];
  let track = {};
  track[this.arrayGraph[data].vertex] = "" + data;
  let obj = this.obj;
  let i = 0;
  result.push([]);
  array.push(this.arrayGraph[data]);
  object[data] = data;
  while (array.length) {
    let node = array[0];
    if (!boolObj[node.vertex]) {
      boolObj[node.vertex] = node.vertex;
      result[i].push(node.vertex);
    }
    delete obj[node.vertex + ""];
    for (let i in node) {
      if (i != "vertex") {
        if (!object[i]) {
          object[i] = i;
          array.push(this.arrayGraph[i]);
          track[i] = track[node.vertex] + ":" + i;
        }
      }
    }
    if (node.vertex == to) return track[node.vertex];
    array.splice(0, 1);
  }
  return false;
};

// Взвешенный граф
function GraphUndirected() {
  this.arrayGraph = {};
  this.obj = {};
}

GraphUndirected.prototype.addVertex = function (data) {
  if (!this.arrayGraph[data]) {
    this.arrayGraph[data] = { vertex: data };
    this.obj[data] = data;
  }
};

GraphUndirected.prototype.addEdge = function (xEdge, yEdge, size) {
  if (
    this.arrayGraph[xEdge][yEdge] === yEdge &&
    this.arrayGraph[yEdge][xEdge] === xEdge
  )
    return;
  this.arrayGraph[xEdge][yEdge] = { size: size };
  this.arrayGraph[yEdge][xEdge] = { size: size };
  return;
};

GraphUndirected.prototype.minTrackToData = function (data, to) {
  let object = {};
  let boolObj = {};
  let array = [];
  let result = [];
  let track = {};
  track[this.arrayGraph[data].vertex] = "" + data;
  let obj = this.obj;
  let i = 0;
  result.push([]);
  array.push(this.arrayGraph[data]);
  object[data] = data;
  while (array.length) {
    let node = array[0];
    if (!boolObj[node.vertex]) {
      boolObj[node.vertex] = node.vertex;
      result[i].push(node.vertex);
    }
    delete obj[node.vertex + ""];
    for (let i in node) {
      if (i != "vertex") {
        if (!object[i]) {
          object[i] = i;
          array.push(this.arrayGraph[i]);
          track[i] = track[node.vertex] + ":" + i;
        }
      }
    }
    array.splice(0, 1);
  }
  function takeNum(arr, node) {
    let result = 0;
    for (let i = 1; i < arr.length; i++) {
      result += node[arr[i]][arr[i - 1]].size;
    }
    return result;
  }

  //Здесь начинаются изменения для прощета минимального пути в взвешенном графе

  let arrayNumber = {};
  let arrayRes = [];
  let arrayResIndex = [];
  for (let i in this.arrayGraph[to]) {
    if (!isNaN(i)) arrayNumber[i] = i;
  }
  for (let i in track) {
    if (i === arrayNumber[i]) arrayRes.push(track[i] + ":" + to);
  }
  for (let i = 0; i < arrayRes.length; i++)
    arrayResIndex.push(takeNum(arrayRes[i].split(":"), this.arrayGraph));
  let num = Math.min(...arrayResIndex);
  num = arrayResIndex.indexOf(num);
  return arrayRes[num];
};
