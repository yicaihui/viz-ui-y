import type { StoryObj, Meta, ArgTypes } from '@storybook/vue3'
import { ref, watch } from 'vue'
import { fn } from '@storybook/test'
import { VizAlert, type AlertInstance } from 'viz-ui-y'
import 'viz-ui-y/dist/theme/Alert.css'

type Story = StoryObj<typeof VizAlert> & { argTypes?: ArgTypes }

const meta: Meta<typeof VizAlert> = {
  title: 'Example/Alert',
  component: VizAlert,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'warning', 'info', 'danger']
    },
    effect: {
      control: 'select',
      options: ['light', 'dark']
    },
    center: {
      control: 'boolean'
    }
  },
  args: {
    onClose: fn()
  }
}

export const Default: Story & { args: { visible: boolean } } = {
  args: {
    title: '标题',
    description: '这是一段描述',
    type: 'success',
    effect: 'light',
    closable: true,
    showIcon: true,
    visible: true
  },
  render: args => ({
    components: { VizAlert },
    setup() {
      const alertRef = ref<AlertInstance>()
      watch(
        () => (args as any).visible,
        (val: boolean) => {
          if (val) {
            alertRef.value?.open()
          } else {
            alertRef.value?.close()
          }
        }
      )
      return { args, alertRef }
    },
    template: `
     <viz-alert ref="alertRef" v-bind="args"></viz-alert>
    `
  })
}

export default meta
