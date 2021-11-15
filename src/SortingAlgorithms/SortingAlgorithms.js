export function getMergeSortAnimations(array) {
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
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  export function getBubbleSort(array)
  {
    let animations = [];
    let auxArray = array.slice();
    bubbleSort(auxArray, animations);
    array = auxArray;
    for(let i = 0; i < animations.length; i++)
    {
      console.log(animations[i] + ", ");
    }
     return [animations, array];
  }

  function bubbleSort(auxArray, animations)
  {
    const n = auxArray.length;
    for(let i = 0; i < n - 1; i++)
    {
      for(let j = 0; j < n - i - 1; j ++)
      {
        animations.push([j,j+1]); //We change colour twice to show the line moveing over
        animations.push([j,j+1]);
        if(auxArray[j] > auxArray[j+1]) //if j is bigger in value than j++ we swap them
        {
          animations.push([j, auxArray[j+1]]);//We show we are swapping the colours
          animations.push([j+1, auxArray[j]]);
          swap(j, j+1, auxArray);
        }else{
          animations.push([-1, -1]);
          animations.push([-1, -1]);
        }
      }
    }

  }

  export function getQuickSort(array) {
    const animations = [];
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
  }

  function quickSortHelper(array, startIndex, endIndex, animations) {
    if (startIndex >= endIndex) return;
    animations.push(-2);
    const pivot = startIndex;
    let leftIndex = startIndex + 1;
    let rightIndex = endIndex;
    animations.push([pivot, leftIndex, rightIndex, 0]);
    while (rightIndex >= leftIndex) {
      animations.push([leftIndex, rightIndex]);
      animations.push([leftIndex, rightIndex]);
      if (array[leftIndex] > array[pivot] && array[rightIndex] < array[pivot]) {
        animations.push(-2);
        animations.push([
          leftIndex,
          rightIndex,
          array[leftIndex],
          array[rightIndex]
        ]);
        swap(leftIndex, rightIndex, array);
      }
      if (array[leftIndex] <= array[pivot]) leftIndex++;
      if (array[rightIndex] >= array[pivot]) rightIndex--;
    }
    animations.push(-2);
    animations.push([pivot, rightIndex, array[pivot], array[rightIndex]]);
    swap(pivot, rightIndex, array);
    const leftSubArrayIsSmaller =
      rightIndex - 1 - startIndex < endIndex - (rightIndex + 1);
    if (leftSubArrayIsSmaller) {
      quickSortHelper(array, startIndex, rightIndex - 1, animations);
      quickSortHelper(array, rightIndex + 1, endIndex, animations);
    } else {
      quickSortHelper(array, rightIndex + 1, endIndex, animations);
      quickSortHelper(array, startIndex, rightIndex - 1, animations);
    }
  

  
  }
    
  export function getInsertionSort(array){
    const animations = [];
    insertionSortHelper(array, animations);
    return animations;

  }
  
  function insertionSortHelper(array, animations){
    for (let i = 0; i < array.length; i++) {
      for (let j = i; j > 0; j--) {
        if (array[j] < array[j - 1]) {
          animations.push([
            j, j - 1
          ]);
          animations.push([
            j, j - 1
          ]);
          animations.push([
            j - 1,
            array[j]
          ]);
          animations.push([
            j,
            array[j - 1]
          ]);
          swap(j, j -1, array);
        }
      }
    }
  }
  
  
  
    export function getHeapSort(array){
      const animatons = [];
      heapSortHelper(array, animatons);
      return animatons; 
    }

    function heapSortHelper(array, animations){
      var arrayLength = array.length;
      for(var i = Math.floor(arrayLength / 2); i >= 0; i--){
        heap(array, i, arrayLength, animations);
      }
      for(i = arrayLength - 1; i > 0; i--){
        heapSwap(array, 0, i, animations);
        arrayLength --;
        heap(array, 0, arrayLength, animations);
    }
  }

  function heap(array, index, arrayLength, animations){
    var leftIndex = 2 * index + 1;
    var rightIndex = 2 * index + 2;
    var max = index;
    if (leftIndex < arrayLength && array[leftIndex] > array[max]){
      animations.push([leftIndex, max]);
      animations.push([leftIndex, max]);
      animations.push([0, array[0]]);
      animations.push([0, array[0]]);
      max = leftIndex;
    }
    if(rightIndex < arrayLength && array[rightIndex] > array[max]){
      animations.push([rightIndex, max]);
      animations.push([rightIndex, max]);
      animations.push([0, array[0]]);
      animations.push([0, array[0]]);
      max = rightIndex;
    }
    if(max != index){
      heapSwap(array, index, max, animations);
      heap(array, max, arrayLength, animations);
    }
  }

  export function getSelectionSort(array){
    const animations = [];
    selectionSwap(array, animations);
    return animations; 
  }

  function selectionSwap(array, animations){
      for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
          animations.push([minIndex, j]); 
          animations.push([minIndex, j]);
          animations.push([0, array[0]]);
          animations.push([0, array[0]]);
          if (array[j] < array[minIndex]) {
            minIndex = j;
          }
        }
        animations.push([i, minIndex]);
        animations.push([i, minIndex]);
        animations.push([i, array[minIndex]]);
        animations.push([minIndex, array[i]]);
        swap(i, minIndex, array);
      }
  }



    function heapSwap(arr, firstIdx, lastIdx, animations) {
      animations.push([firstIdx, lastIdx]);
      animations.push([firstIdx, lastIdx]);
      animations.push([firstIdx, arr[lastIdx]]);
      animations.push([lastIdx, arr[firstIdx]]);
      var temp = arr[firstIdx];
      arr[firstIdx] = arr[lastIdx];
      arr[lastIdx] = temp;
    }
  
  function swap(i, j, array) {
    let temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }