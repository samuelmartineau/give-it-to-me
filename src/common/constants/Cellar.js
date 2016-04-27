export const BOX_COLOR = '#d3414a';
export const BOX_BORDER_COLOR = '#992f2f';
export const BOX_BORDER_SIZE = 1;

export const CELL_SIZE = 4;

export const ONE_CELL_WIDTH = CELL_SIZE;
export const ONE_CELL_HEIGHT = CELL_SIZE;

export const FULL_BOX_WIDTH = 4*CELL_SIZE;
export const FULL_BOX_HEIGHT = 3*CELL_SIZE;

export const HALF_BOX_WIDTH = 2*CELL_SIZE;

export const THIRD_BOX_WIDTH = 3*CELL_SIZE;

export const CANVAS_WIDTH = 5*CELL_SIZE + 12*FULL_BOX_WIDTH;
export const CANVAS_HEIGHT = 5*FULL_BOX_HEIGHT;

export const CELLAR_SCHEMA = [
  [{
    x: 0,
    y: 2*CELL_SIZE,
    width: ONE_CELL_WIDTH,
    height: ONE_CELL_HEIGHT
  }, {
    x: CELL_SIZE,
    y: 0,
    width: FULL_BOX_WIDTH,
    height: FULL_BOX_HEIGHT
  }, {
    x: CELL_SIZE + FULL_BOX_WIDTH,
    y: 0,
    width: FULL_BOX_WIDTH,
    height: FULL_BOX_HEIGHT
  }, {
    x: CELL_SIZE + 2*FULL_BOX_WIDTH,
    y: 0,
    width: FULL_BOX_WIDTH,
    height: FULL_BOX_HEIGHT
  }, {
    x: CELL_SIZE + 3*FULL_BOX_WIDTH,
    y: 0,
    width: FULL_BOX_WIDTH,
    height: FULL_BOX_HEIGHT
  }, {
    x: CELL_SIZE + 4*FULL_BOX_WIDTH,
    y: 0,
    width: FULL_BOX_WIDTH,
    height: FULL_BOX_HEIGHT
  }, {
    x: CELL_SIZE + 5*FULL_BOX_WIDTH,
    y: 0,
    width: FULL_BOX_WIDTH,
    height: FULL_BOX_HEIGHT
  }, {
    x: CELL_SIZE + 6*FULL_BOX_WIDTH,
    y: 0,
    width: FULL_BOX_WIDTH,
    height: FULL_BOX_HEIGHT
  }, {
    x: CELL_SIZE + 7*FULL_BOX_WIDTH,
    y: 0,
    width: FULL_BOX_WIDTH,
    height: FULL_BOX_HEIGHT
  }, {
    x: CELL_SIZE + 8*FULL_BOX_WIDTH,
    y: 0,
    width: FULL_BOX_WIDTH,
    height: FULL_BOX_HEIGHT
  }, {
    x: CELL_SIZE + 9*FULL_BOX_WIDTH,
    y: 0,
    width: FULL_BOX_WIDTH,
    height: FULL_BOX_HEIGHT
  }, {
    x: CELL_SIZE + 10*FULL_BOX_WIDTH,
    y: 0,
    width: FULL_BOX_WIDTH,
    height: FULL_BOX_HEIGHT
  }, {
    x: CELL_SIZE + 11*FULL_BOX_WIDTH,
    y: 0,
    width: FULL_BOX_WIDTH,
    height: FULL_BOX_HEIGHT
  }, {
    x: CELL_SIZE + 12*FULL_BOX_WIDTH,
    y: 0,
    width: HALF_BOX_WIDTH,
    height: FULL_BOX_HEIGHT
  }], [{
      x: 0,
      y: FULL_BOX_HEIGHT,
      width: THIRD_BOX_WIDTH,
      height: FULL_BOX_HEIGHT
    }, {
      x: THIRD_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      width: FULL_BOX_WIDTH,
      height: FULL_BOX_HEIGHT
    }, {
      x: THIRD_BOX_WIDTH + FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      width: FULL_BOX_WIDTH,
      height: FULL_BOX_HEIGHT
    }, {
      x: THIRD_BOX_WIDTH + 2*FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      width: FULL_BOX_WIDTH,
      height: FULL_BOX_HEIGHT
    }, {
      x: THIRD_BOX_WIDTH + 3*FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      width: FULL_BOX_WIDTH,
      height: FULL_BOX_HEIGHT
    }, {
      x: THIRD_BOX_WIDTH + 4*FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      width: FULL_BOX_WIDTH,
      height: FULL_BOX_HEIGHT
    }, {
      x: THIRD_BOX_WIDTH + 5*FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      width: FULL_BOX_WIDTH,
      height: FULL_BOX_HEIGHT
    }, {
      x: THIRD_BOX_WIDTH + 6*FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      width: FULL_BOX_WIDTH,
      height: FULL_BOX_HEIGHT
    }, {
      x: THIRD_BOX_WIDTH + 7*FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      width: FULL_BOX_WIDTH,
      height: FULL_BOX_HEIGHT
    }, {
      x: THIRD_BOX_WIDTH + 8*FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      width: FULL_BOX_WIDTH,
      height: FULL_BOX_HEIGHT
    }, {
      x: THIRD_BOX_WIDTH + 9*FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      width: FULL_BOX_WIDTH,
      height: FULL_BOX_HEIGHT
    }, {
      x: THIRD_BOX_WIDTH + 10*FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      width: FULL_BOX_WIDTH,
      height: FULL_BOX_HEIGHT
    }, {
      x: THIRD_BOX_WIDTH + 11*FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      width: FULL_BOX_WIDTH,
      height: FULL_BOX_HEIGHT
    }], [{
        x: CELL_SIZE,
        y: 2*FULL_BOX_HEIGHT,
        width: FULL_BOX_WIDTH,
        height: FULL_BOX_HEIGHT
      }, {
        x: CELL_SIZE + FULL_BOX_WIDTH,
        y: 2*FULL_BOX_HEIGHT,
        width: FULL_BOX_WIDTH,
        height: FULL_BOX_HEIGHT
      }, {
        x: CELL_SIZE + 2*FULL_BOX_WIDTH,
        y: 2*FULL_BOX_HEIGHT,
        width: FULL_BOX_WIDTH,
        height: FULL_BOX_HEIGHT
      }, {
        x: CELL_SIZE + 3*FULL_BOX_WIDTH,
        y: 2*FULL_BOX_HEIGHT,
        width: FULL_BOX_WIDTH,
        height: FULL_BOX_HEIGHT
      }, {
        x: CELL_SIZE + 4*FULL_BOX_WIDTH,
        y: 2*FULL_BOX_HEIGHT,
        width: FULL_BOX_WIDTH,
        height: FULL_BOX_HEIGHT
      }, {
        x: CELL_SIZE + 5*FULL_BOX_WIDTH,
        y: 2*FULL_BOX_HEIGHT,
        width: FULL_BOX_WIDTH,
        height: FULL_BOX_HEIGHT
      }, {
        x: CELL_SIZE + 6*FULL_BOX_WIDTH,
        y: 2*FULL_BOX_HEIGHT,
        width: FULL_BOX_WIDTH,
        height: FULL_BOX_HEIGHT
      }, {
        x: CELL_SIZE + 7*FULL_BOX_WIDTH,
        y: 2*FULL_BOX_HEIGHT,
        width: FULL_BOX_WIDTH,
        height: FULL_BOX_HEIGHT
      }, {
        x: CELL_SIZE + 8*FULL_BOX_WIDTH,
        y: 2*FULL_BOX_HEIGHT,
        width: FULL_BOX_WIDTH,
        height: FULL_BOX_HEIGHT
      }, {
        x: CELL_SIZE + 9*FULL_BOX_WIDTH,
        y: 2*FULL_BOX_HEIGHT,
        width: FULL_BOX_WIDTH,
        height: FULL_BOX_HEIGHT
      }, {
        x: CELL_SIZE + 10*FULL_BOX_WIDTH,
        y: 2*FULL_BOX_HEIGHT,
        width: FULL_BOX_WIDTH,
        height: FULL_BOX_HEIGHT
      }, {
        x: CELL_SIZE + 11*FULL_BOX_WIDTH,
        y: 2*FULL_BOX_HEIGHT,
        width: FULL_BOX_WIDTH,
        height: FULL_BOX_HEIGHT
      }, {
        x: CELL_SIZE + 12*FULL_BOX_WIDTH,
        y: 2*FULL_BOX_HEIGHT,
        width: FULL_BOX_WIDTH,
        height: FULL_BOX_HEIGHT
      }], [{
          x: 3*CELL_SIZE,
          y: 3*FULL_BOX_HEIGHT,
          width: FULL_BOX_WIDTH,
          height: FULL_BOX_HEIGHT
        }, {
          x: 3*CELL_SIZE + FULL_BOX_WIDTH,
          y: 3*FULL_BOX_HEIGHT,
          width: FULL_BOX_WIDTH,
          height: FULL_BOX_HEIGHT
        }, {
          x: 3*CELL_SIZE + 2*FULL_BOX_WIDTH,
          y: 3*FULL_BOX_HEIGHT,
          width: FULL_BOX_WIDTH,
          height: FULL_BOX_HEIGHT
        }, {
          x: 3*CELL_SIZE + 3*FULL_BOX_WIDTH,
          y: 3*FULL_BOX_HEIGHT,
          width: FULL_BOX_WIDTH,
          height: FULL_BOX_HEIGHT
        }, {
          x: 3*CELL_SIZE + 4*FULL_BOX_WIDTH,
          y: 3*FULL_BOX_HEIGHT,
          width: FULL_BOX_WIDTH,
          height: FULL_BOX_HEIGHT
        }, {
          x: 3*CELL_SIZE + 5*FULL_BOX_WIDTH,
          y: 3*FULL_BOX_HEIGHT,
          width: FULL_BOX_WIDTH,
          height: FULL_BOX_HEIGHT
        }, {
          x: 3*CELL_SIZE + 6*FULL_BOX_WIDTH,
          y: 3*FULL_BOX_HEIGHT,
          width: FULL_BOX_WIDTH,
          height: FULL_BOX_HEIGHT
        }, {
          x: 3*CELL_SIZE + 7*FULL_BOX_WIDTH,
          y: 3*FULL_BOX_HEIGHT,
          width: FULL_BOX_WIDTH,
          height: FULL_BOX_HEIGHT
        }, {
          x: 3*CELL_SIZE + 8*FULL_BOX_WIDTH,
          y: 3*FULL_BOX_HEIGHT,
          width: FULL_BOX_WIDTH,
          height: FULL_BOX_HEIGHT
        }, {
          x: 3*CELL_SIZE + 9*FULL_BOX_WIDTH,
          y: 3*FULL_BOX_HEIGHT,
          width: FULL_BOX_WIDTH,
          height: FULL_BOX_HEIGHT
        }, {
          x: 3*CELL_SIZE + 10*FULL_BOX_WIDTH,
          y: 3*FULL_BOX_HEIGHT,
          width: FULL_BOX_WIDTH,
          height: FULL_BOX_HEIGHT
        }, {
          x: 3*CELL_SIZE + 11*FULL_BOX_WIDTH,
          y: 3*FULL_BOX_HEIGHT,
          width: FULL_BOX_WIDTH,
          height: FULL_BOX_HEIGHT
        }, {
          x: 3*CELL_SIZE + 12*FULL_BOX_WIDTH,
          y: 3*FULL_BOX_HEIGHT,
          width: HALF_BOX_WIDTH,
          height: FULL_BOX_HEIGHT
        }], [{
            x: 5*CELL_SIZE,
            y: 4*FULL_BOX_HEIGHT,
            width: FULL_BOX_WIDTH,
            height: FULL_BOX_HEIGHT
          }, {
            x: 5*CELL_SIZE + FULL_BOX_WIDTH,
            y: 4*FULL_BOX_HEIGHT,
            width: FULL_BOX_WIDTH,
            height: FULL_BOX_HEIGHT
          }, {
            x: 5*CELL_SIZE + 2*FULL_BOX_WIDTH,
            y: 4*FULL_BOX_HEIGHT,
            width: FULL_BOX_WIDTH,
            height: FULL_BOX_HEIGHT
          }, {
            x: 5*CELL_SIZE + 3*FULL_BOX_WIDTH,
            y: 4*FULL_BOX_HEIGHT,
            width: FULL_BOX_WIDTH,
            height: FULL_BOX_HEIGHT
          }, {
            x: 5*CELL_SIZE + 4*FULL_BOX_WIDTH,
            y: 4*FULL_BOX_HEIGHT,
            width: FULL_BOX_WIDTH,
            height: FULL_BOX_HEIGHT
          }, {
            x: 5*CELL_SIZE + 5*FULL_BOX_WIDTH,
            y: 4*FULL_BOX_HEIGHT,
            width: FULL_BOX_WIDTH,
            height: FULL_BOX_HEIGHT
          }, {
            x: 5*CELL_SIZE + 6*FULL_BOX_WIDTH,
            y: 4*FULL_BOX_HEIGHT,
            width: FULL_BOX_WIDTH,
            height: FULL_BOX_HEIGHT
          }, {
            x: 5*CELL_SIZE + 7*FULL_BOX_WIDTH,
            y: 4*FULL_BOX_HEIGHT,
            width: FULL_BOX_WIDTH,
            height: FULL_BOX_HEIGHT
          }, {
            x: 5*CELL_SIZE + 8*FULL_BOX_WIDTH,
            y: 4*FULL_BOX_HEIGHT,
            width: FULL_BOX_WIDTH,
            height: FULL_BOX_HEIGHT
          }, {
            x: 5*CELL_SIZE + 9*FULL_BOX_WIDTH,
            y: 4*FULL_BOX_HEIGHT,
            width: FULL_BOX_WIDTH,
            height: FULL_BOX_HEIGHT
          }, {
            x: 5*CELL_SIZE + 10*FULL_BOX_WIDTH,
            y: 4*FULL_BOX_HEIGHT,
            width: FULL_BOX_WIDTH,
            height: FULL_BOX_HEIGHT
          }, {
            x: 5*CELL_SIZE + 11*FULL_BOX_WIDTH,
            y: 4*FULL_BOX_HEIGHT,
            width: FULL_BOX_WIDTH,
            height: FULL_BOX_HEIGHT
          }]
];
