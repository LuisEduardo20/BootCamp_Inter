function verificaArray(array) {
  if (array === null)
    return -1; 

  else
    for(i in array) {
      if(array[i] % 2 === 0)
        array[i] = 0;
    }

  return array
}

let array = [1, 3, 4, 6, 00, 33, 23, 90];

console.log(verificaArray(array));