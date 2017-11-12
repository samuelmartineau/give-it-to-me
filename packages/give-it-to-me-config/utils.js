module.exports = {
  cleanString: str => {
    let s = str.toLowerCase();
    if (s.normalize !== undefined) {
      s = s.normalize("NFKD");
    }
    return s.replace(/[\u0300-\u036F]/g, "").replace(/\s+/g, " ");
  }
};
