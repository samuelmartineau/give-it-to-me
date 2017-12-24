import { utils } from 'give-it-to-me-config';

const computeCellar = wines => {
  let boxId = 0;
  let availableCells = {};
  let selectedCells = {};
  let bottlesByBoxes = {};
  let selectableCells;

  CELLAR_SCHEMA.forEach(box => {
    availableCells[boxId] = Array(box.schema.reduce((x, y) => x * y, 1))
      .fill()
      .map((_, cellId) => cellId);
    boxId++;
  });

  wines.forEach(wine => {
    if (wine.isInBoxes) {
      wine.bottles.forEach(bottle => {
        const availableCellsInBox = utils.removeItem(
          availableCells[bottle.box],
          availableCells[bottle.box].indexOf(bottle.cell)
        );

        if (!bottlesByBoxes[bottle.box]) {
          bottlesByBoxes[bottle.box] = [];
        }
        bottlesByBoxes[bottle.box].push({
          cell: bottle.cell,
          wineType: wine.wineType
        });

        if (availableCellsInBox.length) {
          availableCells[bottle.box] = availableCellsInBox;
        } else {
          let {
            [bottle.box.toString()]: omit, // eslint-disable-line no-unused-vars
            ...res
          } = availableCells;
          availableCells = res;
        }
      });
    }
  });

  selectableCells = {
    ...availableCells
  };
  const selectableBoxes = Object.keys({
    ...availableCells
  });
  selectedCells[selectableBoxes[0]] = [
    availableCells[selectableBoxes[0]].slice(0, 1)[0]
  ];

  if (availableCells[selectableBoxes[0]].length === 1) {
    let {
      [boxId]: omit, // eslint-disable-line no-unused-vars
      ...res
    } = selectableCells;
    selectableCells = res;
  } else {
    selectableCells[selectableBoxes[0]] = utils.removeItem(
      availableCells[selectableBoxes[0]],
      0
    );
  }

  return {
    wines,
    availableCells,
    bottlesByBoxes,
    selectableCells,
    selectedCells
  };
};
