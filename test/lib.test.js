const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');


describe('absolute', () => {

    it('return positive number', () => {
        const result = lib.absolute(1)
        expect(result).toBe(1)
      })
      
      it('return negative number', () => {
          const result = lib.absolute(-1)
          expect(result).toBe(1)
       })
      
      it('return zero', () => {
          const result = lib.absolute(0)
          expect(result).toBe(0)
    })
})

describe('greeting', () => {

    it('Welcome Paul!', ()=> {

        const result = lib.greet('Paul')
        expect(result).toContain('Paul')
    })
})

describe('getCurrency', () => { 
    it('Should contain supported currencies', () => {
        const result = lib.getCurrencies()
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']))
    })
 })
describe('Beware of a misunderstanding! A sequence of dice rolls', () => {
    const expected = [1, 2, 3, 4, 5, 6];
    it('matches even with an unexpected number 7', () => {
      expect([4, 1, 6, 7, 3, 5, 2, 5, 4, 6]).toEqual(
        expect.arrayContaining(expected),
      );
    });
    it('does not match without an expected number 2', () => {
      expect([4, 1, 6, 7, 3, 5, 7, 5, 4, 6]).not.toEqual(
        expect.arrayContaining(expected),
      );
    });
});

describe('getProduct', () => {
    it('Shoud return a product', () => {
       const result = lib.getProduct(1)
       expect(result).toMatchObject({id: 1, price: 10})
    })
})

describe('register', () => {
    it("shoud throw when username is falsy", () => {
        args = [null, undefined, '', NaN, 0, false]
        args.forEach( a => {
            expect(() => lib.registerUser(a).toThrow())
        })
    })

    it("shoud return object of passed user", () => {
     const result = lib.registerUser("Paul")
     expect(result).toMatchObject({username: 'Paul'})
     expect(result.id).toBeGreaterThan(0)
    })
 })

 describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 points', () => {
    db.getCustomerSync = function(customerId) { //mock function
        return {id: customerId, points: 20}
    }
    const order = {customerId: 1, totalPrice: 10}
    lib.applyDiscount(order)
    expect(order.totalPrice).toBe(9)
    })
 })

 describe('notifyCustomer', () => {
    it('should send a message to customer', () => {
     db.getCustomerSync = jest.fn().mockReturnValue({mail: 'a'})
     
    mail.send = jest.fn()

    lib.notifyCustomer({customerId: 1})

    expect(mail.send).toHaveBeenCalled()
    expect(mail.send.mock.calls[0][0]).toBe('a')
    expect(mail.send.mock.calls[0][1]).toMatch(/order/)
    })
 })