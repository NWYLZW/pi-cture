let maxDigit = 0
/** @type {BigInt} */
let PI

/**
 * save PI compute state
 *
 * @param {typeof maxDigit} _maxDigit
 * @param {typeof PI} _PI
 */
function saveState(_maxDigit, _PI) {
    maxDigit = _maxDigit
    PI = _PI
}

/**
 * 计算 PI 的值
 *
 * @param {number} digit
 * @param {BigInt = PI} _PI
 * @return {BigInt}
 */
function computePI(digit, _PI = PI) {
    if (digit < 0) {
        throw new Error('digit must be a positive integer')
    }
    if (digit === 0) {
        return 3n
    }
    let i = 1n
    let x = _PI
    /** @type {typeof x} */
    let pi
    compute: {
        if (x === undefined) {
            pi = x = 3n * (10n ** BigInt(digit + 20))
        } else {
            if (digit < maxDigit) {
                pi = x = x * (10n ** BigInt(digit - maxDigit))
            } else if (digit > maxDigit) {
                pi = x = x / (10n ** BigInt(maxDigit - digit))
                break compute
            } else {
                pi = PI
                break compute
            }
        }

        while (x > 0) {
            x = x * i / ((i + 1n) * 4n)
            pi += x / (i + 2n)
            i += 2n
        }
        saveState(digit, pi)
    }
    return pi / (10n ** 20n)
}

function main() {
    ;[5, 10, 100, 1000, 10000, 10000].map(digit => {
        console.group(`${digit} digits`)
        console.time(`${digit} digits`)
        let pi = computePI(digit)
        console.timeEnd(`${digit} digits`)
        console.log(pi, String(pi).length - 1)
        console.groupEnd()
    })
}

main()
