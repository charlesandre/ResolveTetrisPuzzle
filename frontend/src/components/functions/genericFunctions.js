export const buildElementsArray = state => {
  let elements = []
  Object.keys(state.currentElements).map((element, index) => {
    let number = state.currentElements[element]
    console.log(element, number)
    for (let i = 0; i < number; i++) {
      console.log('hello')
      elements.push(state.allelements[Object.keys(state.allelements)[index]])
    }
  })
  console.log('result ! ')
  console.log(elements)
  return elements
}
