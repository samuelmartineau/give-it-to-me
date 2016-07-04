export const filterWine = (wines, filters) => {
  return wines.filter(wine => {
    const wineFamilyIsSet = filters.wineFamilies.length
    const wineFamilyMatched = filters.wineFamilies.some(wineFamily => {
      return wineFamily.id === wine.wineFamily
    })
    const wineTypeIsSet = filters.wineTypes.length
    const wineTypeMatched = filters.wineTypes.some(wineType => {
      return wineType.key === wine.wineType
    })
    const wineCategoryIsSet = filters.wineCategories.length
    const wineCategoryMatched = filters.wineCategories.some(wineCategory => {
      return wineCategory.key === wine.wineCategory
    })
    const periods = filters.period.reduce((acc, periodItem) => {
      acc[periodItem.type] = periodItem.value
      return acc
    }, {})

    if (wineFamilyIsSet && !wineFamilyMatched) {
      return false
    }

    if (wineTypeIsSet && !wineTypeMatched) {
      return false
    }

    if (wineCategoryIsSet && !wineCategoryMatched) {
      return false
    }

    if (periods.min && parseInt(wine.year) < periods.min) {
      return false
    }

    if (periods.max && parseInt(wine.year) > periods.max) {
      return false
    }

    return true
  })
}
