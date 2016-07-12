export const LARGE_SCREEN_MIN = 992

export const removeItem = (list, index) => {
  return list.slice(0, index).concat(list.slice(index + 1))
}

export const noTilde = (s) => {
  if (s.normalize !== undefined) {
    s = s.normalize('NFKD')
  }
  return s.replace(/[\u0300-\u036F]/g, '')
}

export const isLargeScreen = () => {
  return window.innerWidth >= LARGE_SCREEN_MIN
}

export const chunkify = (a, n, balanced) => {
  if (n < 2) {
    return [a]
  }

  var len = a.length
  var out = []
  var i = 0
  var size

  if (len % n === 0) {
    size = Math.floor(len / n)
    while (i < len) {
      out.push(a.slice(i, i += size))
    }
  } else if (balanced) {
    while (i < len) {
      size = Math.ceil((len - i) / n--)
      out.push(a.slice(i, i += size))
    }
  } else {
    n--
    size = Math.floor(len / n)
    if (len % size === 0) {
      size--
    }
    while (i < size * n) {
      out.push(a.slice(i, i += size))
    }
    out.push(a.slice(size * n))
  }
  return out
}

export const getColumns = () => {
  let columns
  if (window.innerWidth >= 1300) {
    columns = 3
  } else if (window.innerWidth < 700) {
    columns = 1
  } else {
    columns = 2
  }
  return columns
}
