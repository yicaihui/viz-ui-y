import { describe, it, expect } from 'vitest'
import { Loading } from './service'
import { rAF } from '@viz-ui-y/utils'

describe('Loading', () => {
  it('should creat Loading instance', () => {
    const instance = Loading()
    expect(instance).toBeTruthy()
  })
  it('should render mask', async () => {
    Loading()
    await rAF()
    expect(document.querySelector('.viz-loading__mask')).toBeTruthy()
  })
  it('should close Loading and remove it from DOM', async () => {
    const instance = Loading()

    await rAF()
    expect(document.querySelector('.viz-loading')).toBeTruthy()
    instance.close()
    await rAF()

    expect(document.querySelector('.viz-loading')).toBeFalsy()
  })
})
