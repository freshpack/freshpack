const unique = array =>
  array.filter((value, index, self) => self.indexOf(value) === index);

module.exports = unique;
