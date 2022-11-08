const exercise = require('../exercise')

describe('Fizzbuzz', () => {
    it('should check for type input', () => {
       expect(() =>  exercise.fizzBuzz('a').toThrow())
       expect(() =>  exercise.fizzBuzz(null).toThrow())
       expect(() =>  exercise.fizzBuzz(undefined).toThrow())
       expect(() =>  exercise.fizzBuzz(' ').toThrow())
    })
    it('should check for input 3 %  && 5 %', () => {
        const result = exercise.fizzBuzz(15)
        expect(result).toBe('FizzBuzz')
    })
    it('should check for 3 % ', () => {
        const result = exercise.fizzBuzz(3)
        expect(result).toBe('Fizz')
    })
    it('should check for 5 %', () => {
       const result = exercise.fizzBuzz(5)
       expect(result).toBe('Buzz')
    })
    it('should return the number if its either', () => {
        const result = exercise.fizzBuzz(1)
        expect(result).toBe(1)
     })
})