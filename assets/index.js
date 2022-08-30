let maxDigit = 0
/** @type {BigInt | null} */
let PI = null

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
 * @param {typeof PI} [_PI=PI]
 * @return {BigInt}
 */
function computePI(digit, _PI = PI) {
    digit += 1
    if (digit < 0) {
        throw new Error('digit must be a positive integer')
    }
    if (digit === 0) {
        return 3n
    }
    let x = _PI
    /** @type {typeof x} */
    let pi = 0n
    compute: {
        if (digit === maxDigit) {
            pi = PI
            break compute
        } else if (digit < maxDigit) {
            pi = x / (10n ** BigInt(maxDigit - digit))
            break compute
        } else if (digit > maxDigit) {
            x = 10n ** BigInt(digit + 20)
        }

        let i = 1n
        for (; x > 0n ; i += 2n) {
            x = x * (i * i) / (4n * (i + 1n) * (i + 2n))
            pi += 3n * x
        }
        saveState(digit, pi)
    }
    return pi / (10n ** 20n)
}

function main() {
    ;[100000, 2, 3, 4].map(digit => {
        console.group(`${digit} digits`)
        console.time(`${digit} digits`)
        let pi = computePI(digit)
        console.timeEnd(`${digit} digits`)
        console.log(pi, String(pi).length - 1)
        console.groupEnd()
    })
}

main()
