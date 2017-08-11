export const generateUUID = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export const getNotificationColorByIndex = (index) => {
  const colorsForTheCategories = ['is-primary', 'is-info', 'is-success', 'is-waring', 'is-danger']
  return colorsForTheCategories[index % 5]
}