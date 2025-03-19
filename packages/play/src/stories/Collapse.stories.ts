import type { Meta, StoryObj } from "@storybook/vue3";
import { VizCollapse, VizCollapseItem } from "viz-ui-y";
import 'viz-ui-y/dist/theme/Collapse.css'

type Story = StoryObj<typeof VizCollapse>;

const meta: Meta<typeof VizCollapse> = {
  title: "Example/Collapse",
  component: VizCollapse,
  subcomponents: { VizCollapseItem },
  tags: ["autodocs"],
};

export const Default: Story = {
  render: (args) => ({
    components: {
      VizCollapse,
      VizCollapseItem,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
    <viz-collapse v-bind="args">
      <viz-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </viz-collapse-item>
      <viz-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </viz-collapse-item>
      <viz-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </viz-collapse-item>
    </viz-collapse>
    `,
  }),
  args: {
    accordion: true,
    modelValue: ["a"],
  },
};

export default meta;