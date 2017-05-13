const unique = (array) => {
  return array.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
};

module.exports = unique;
