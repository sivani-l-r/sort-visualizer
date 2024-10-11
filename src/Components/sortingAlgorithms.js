// Quick Sort
export function getQuickSortAnimation(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, animations, 0, array.length - 1);
  return animations;
}

function quickSortHelper(array, animations, low, high) {
  if (low < high) {
      let pivotIdx = partition(array, low, high, animations);
      quickSortHelper(array, animations, low, pivotIdx - 1);
      quickSortHelper(array, animations, pivotIdx + 1, high);
  }
}

function partition(array, low, high, animations) {
  let pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
      animations.push([j, high, 'compare']); 
      if (array[j] < pivot) {
          i++;
          animations.push([i, j, 'swap']); 
          swap(array, i, j);
      }
      animations.push([j, high, 'revert']); 
  }


  swap(array, i + 1, high);
  animations.push([i + 1, high, 'swap']); 
  return i + 1;
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}




// Bubble Sort

export function getBubbleSortAnimation(array) {
  const animations = [];
  if(array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  bubbleSortHelper(array,auxiliaryArray,animations);
  return animations;
}
function bubbleSortHelper(array, auxiliaryArray, animations) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      animations.push([j, j + 1, "compare"]);
      if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
        animations.push([j, auxiliaryArray[j + 1], "swap"]);  
        animations.push([j + 1, auxiliaryArray[j], "swap"]); 
        let temp = auxiliaryArray[j];
        auxiliaryArray[j] = auxiliaryArray[j + 1];
        auxiliaryArray[j + 1] = temp;
      }
      animations.push([j, j + 1, "revert"]);  
    }
  }
}



// MERGE SORT
export function getMergeSortAnimation(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }