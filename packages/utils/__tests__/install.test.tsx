import { describe, expect, it } from 'vitest'
import { defineComponent, createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { makeInstaller, withInstall } from '../install'

const AppComp = defineComponent({
  setup() {
    return () => <div>app</div>
  }
})

const componentA = withInstall(
  defineComponent({
    name: 'compA',
    setup() {
      return () => <div>compA</div>
    }
  })
)

const componentB = withInstall(
  defineComponent({
    name: 'compB',
    setup() {
      return () => <div>compB</div>
    }
  })
)

describe('install', () => {
  it('withInstall should be worked', () => {
    const wapper = mount(() => <div id="app"></div>)
    const app = createApp(AppComp)

    app.use(componentA).use(componentB).mount(wapper.element)

    expect(componentA.install).toBeDefined()
    expect(componentB.install).toBeDefined()
    expect(app._context.components['compA']).toBeTruthy()
    expect(app._context.components['compB']).toBeTruthy()
  })

  it('makeInstaller should be worked', () => {
    const wapper = mount(() => <div id="app"></div>)
    const app = createApp(AppComp)
    const installer = makeInstaller([componentA, componentB])

    app.use(installer).mount(wapper.element)

    expect(installer).toBeDefined()
    expect(app._context.components['compA']).toBeTruthy()
    expect(app._context.components['compB']).toBeTruthy()
  })
})
