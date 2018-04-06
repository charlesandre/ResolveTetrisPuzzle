export const buildElementsArray = state => {
  let elements = []
  Object.keys(state.currentElements).map((element, index) => {
    console.log(element)
    let number = state.currentElements[element]
    console.log(number)
    for (let i = 0; i < number; i++) {
      elements.push(state.allelements[Object.keys(state.allelements)[element]])
    }
  })
  console.log('result ! ')
  return elements
}
