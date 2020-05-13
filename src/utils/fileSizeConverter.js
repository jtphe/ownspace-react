/**
 * Convert octet to megoctet
 * @param {int} fSize - The size of the file
 */
const octetToMoConverter = fSize => {
  const newFSize = Math.abs(parseInt(fSize, 10));
  let result = '-';
  const def = [
    [1, 'octets'],
    [1024, 'ko'],
    [1048576, 'Mo'],
    [1073741824, 'Go'],
    [1099511627776, 'To']
  ];
  for (let i = 0; i < def.length; i++) {
    if (newFSize < def[i][0] && i !== 0) {
      result = `${(newFSize / def[i - 1][0]).toFixed(2)} ${def[i - 1][1]}`;
      break;
    }
  }
  return result;
};

export default octetToMoConverter;
