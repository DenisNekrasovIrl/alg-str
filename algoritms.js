//Пузырьковая сортировка
let count = 0;
for (let i = array.length - 1; i >= 0; i--) {
  for (let j = 0; j <= i; j++) {
    count++;
    if (array[j] > array[j + 1]) {
      let acc = array[j];
      array[j] = array[j + 1];
      array[j + 1] = acc;
    }
  }
}

//Сортировка выбором
for (let i = 0; i < array.length; i++) {
  let acc = array[i];
  let index = i;
  for (let j = i + 1; j < array.length; j++) {
    count++;
    if (array[j] && acc > array[j]) {
      acc = array[j];
      index = j;
    }
    if (j == array.length - 1) {
      let item = array[i];
      array[i] = array[index];
      array[index] = item;
    }
  }
}

// Сортировка вставками
for (let i = 0; i < array.length; i++) {
  const current = array[i];
  let j = i - 1;
  while (j >= 0 && array[j] > current) {
    array[j + 1] = array[j];
    j--;
  }
  array[j + 1] = current;
}

// Бинарный поиск
function BinarySearch(result, item) {
  while (true) {
    if (result.length == 1 && result[0] != item) {
      return false;
    }
    let length = Math.floor(result.length / 2);
    if (result[length] == item) {
      return true;
    }
    if (result[length] > item) result = result.slice(0, length);
    if (result[length] < item) result = result.slice(length);
  }
}
// Сортировка слиянием
function sort(arr) {
  let init = [];
  arr.forEach((elem) => init.push([elem])); //Инициализация итерируемого массива
  while (init.length > 1) {
    const acc = [];
    const [one, two] = init.splice(0, 2); //Массивы сравнения
    while (one.length || two.length) {
      //Сортировка дочерних массивов
      if (one[0] < two[0]) acc.push(one.splice(0, 1)[0]);
      if (one[0] > two[0]) acc.push(two.splice(0, 1)[0]);
      if (!one.length && two.length) acc.push(two.splice(0, 1)[0]);
      if (!two.length && one.length) acc.push(one.splice(0, 1)[0]);
    }
    init.push(acc); //Добавление нового дочернего массива в очередь
  }
  return init[0];
}
//   Поиск с перескоком
function search(arr, item) {
  const n = 0.2; //Множитель для шага
  let step = Math.ceil(arr.length * n); //Шаг
  let result = false; //Найден результат или нет
  for (let i = 0; ; ) {
    if (arr.length == 2) {
      //Если последняя итерация
      if (arr[0] == item) {
        result = true;
        break;
      }
      if (arr[1] == item) {
        result = true;
        break;
      }
    }
    if (i + step < arr.length && item >= arr[i] && item <= arr[i + step]) {
      //Если i + step не дадут индекс больший длины массива
      arr = arr.slice(i, step + i + 1);
      step = Math.ceil(arr.length * n);
      i = 0;
      continue;
    }
    if (
      i + step >= arr.length &&
      item >= arr[i] &&
      item <= arr[arr.length - 1]
    ) {
      //Если i + step дадут индекс больший длины массива
      arr = arr.slice(i);
      step = Math.ceil(arr.length * n);
      i = 0;
      continue;
    }
    i += step; //Если ни одно условие не выполнилось, то переходим на следующий блок массива
  }
  return result; //Конечный результат
}

//   Сортировка Шелла

function shellSort(arr) {
  const l = arr.length - 1;
  let gap = Math.floor(l / 2);
  while (gap !== 0) {
    for (let i = gap; i <= l; i++) {
      const current = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > current) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = current;
    }
    gap = Math.floor(gap / 2);
  }
  return arr;
}

// Сортировка подсчетом
function countSort(arr) {
  const min = 0;
  const max = Math.max(...arr);
  const accArray = [];
  for (let i = min; i <= max; i++) {
    accArray[i] = 0;
  }
  arr.forEach((elem) => {
    accArray[elem] += 1;
  });
  const result = [];
  for (let i = 0; i < accArray.length; i++) {
    if (accArray[i] !== 0) {
      for (let j = 0; j < accArray[i]; i++) result.push(i);
    }
  }
  return result;
}

//   Быстрая сортировка

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const acc = arr[arr.length - 1];
  const leftArr = [];
  const rightArr = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < acc) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }

  return quickSort(leftArr).concat(acc, quickSort(rightArr));
}

//  Поразрядная сортировка

function radixSort(array) {
  let position = Array(10)
    .fill(0)
    .map((value) => []);
  let = multiplier = 1;
  let = maxValue = Math.max(...array);
  while (maxValue - multiplier >= 0) {
    array.forEach((value) => {
      let slice = Math.floor(value / multiplier);
      position[slice % 10].push(value);
    });
    let indexValue = 0;
    position.forEach((values) => {
      for (let i = 0; values.length > 0; i++) {
        array[indexValue] = values.shift(0);
        indexValue++;
      }
    });
    multiplier *= 10;
  }
  return array;
}
