const findHits = (data, string) => {
  let searchReg = new RegExp(string, 'gi');
  return data.filter((d) => {
    let ingredReg = new RegExp(d.name, 'gi');
    return d.name.match(searchReg) || string.match(ingredReg);
  });
};

export { findHits };
