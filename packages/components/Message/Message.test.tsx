import { nextTick } from 'vue'
import { describe, test, expect } from 'vitest'
import { message, closeAll } from './methods'

const rAF = async () => {
  return new Promise(res => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null)
        await nextTick()
      })
    })
  })
}
function getTopValue(element: Element) {
  const styles = window.getComputedStyle(element)
  const topValue = styles.getPropertyValue('top')
  return Number.parseFloat(topValue)
}

describe('Message', () => {
  test('message() function', async () => {
    const handler = message({ message: 'hello msg', duration: 0 })
    await rAF()
    expect(document.querySelector('.viz-message')).toBeTruthy()
    handler.close()
    await rAF()
    expect(document.querySelector('.viz-message')).toBeFalsy()
  })

  test('call message() function more than once', async () => {
    message({ message: 'hello msg', duration: 0 })
    message({ message: 'hello msg1', duration: 0 })
    await rAF()
    expect(document.querySelectorAll('.viz-message').length).toBe(2)
    closeAll()
    await rAF()
    expect(document.querySelector('.viz-message')).toBeFalsy()
  })
  test('创建多个实例应该设置正确的 offset', async () => {
    message({ message: 'hello msg', duration: 0, offset: 100 })
    message({ message: 'hello msg2', duration: 0, offset: 50 })
    await rAF()
    const elements = document.querySelectorAll('.viz-message')
    expect(elements.length).toBe(2)
    // https://github.com/jsdom/jsdom/issues/1590
    // jsdom 中获取height的数值都为 0
    expect(getTopValue(elements[0])).toBe(100)
    expect(getTopValue(elements[1])).toBe(150)
  })
})
