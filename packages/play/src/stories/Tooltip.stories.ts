import type { Meta, StoryObj, ArgTypes } from '@storybook/vue3'
import { fn } from '@storybook/test'
import { VizTooltip } from 'viz-ui-y'
import 'viz-ui-y/dist/theme/Tooltip.css'

type Story = StoryObj<typeof VizTooltip> & { argTypes?: ArgTypes }

const meta: Meta<typeof VizTooltip> = {
  title: 'Example/Tooltip',
  component: VizTooltip,
  tags: ['autodocs'],
  argTypes: {
    trigger: {
      control: { type: 'select' },
      options: ['hover', 'click', 'contextmenu']
    },
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right']
    }
  },
  args: { 'onVisible-change': fn() }
}

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    trigger: 'hover',
    placement: 'bottom'
  },
  render: args => ({
    components: { VizTooltip },
    setup() {
      return { args }
    },
    template: `<viz-tooltip v-bind="args"><button>tooltip test</button></viz-button>`
  })
}
export default meta
