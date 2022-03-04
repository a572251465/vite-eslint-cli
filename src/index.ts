interface IAdd {
  (a: number, b: number): number
}

const add: IAdd = (a, b) => a + b

module.exports = add
