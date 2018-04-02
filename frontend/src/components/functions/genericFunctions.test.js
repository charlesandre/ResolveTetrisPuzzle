import { buildElementsArray } from './genericFunctions'

it('Test create element', () => {
  const testObject = {
    0: '2',
    2: '3'
  }

  const expectedArray = [
    [[3, 3], [3, 0]],
    [[3, 3], [3, 0]][([7], [7], [7])],
    [[7], [7], [7]],
    [[7], [7], [7]]
  ]

  const newArray = Main.builElementsArray(testObject)
  expect(newArray).toEqual(expectedArray)
})
