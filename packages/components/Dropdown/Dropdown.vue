<script lang="ts" setup>
import type {
  DropdownEmits,
  DropdownInstance,
  DropdownItemProps,
  DropdownProps
} from './types'
import { VizTooltip, type TooltipInstance } from '../Tooltip'
import { VizButtonGroup, VizButton, type ButtonInstance } from '../Button'
import { computed, provide, ref } from 'vue'
import { isNil, omit } from 'lodash-es'
import { DROPDOWN_CTX_KEY } from './constants'
import { useDisabledStyle } from '@viz-ui-y/hooks'

defineOptions({
  name: 'VizDropdown'
})
//props
const props = withDefaults(defineProps<DropdownProps>(), {
  hideOnClick: true,
  items: () => [] as DropdownItemProps[]
})
const tooltipProps = computed(() =>
  omit(props, ['type', 'size', 'items', 'hideOnClick', 'splitButton'])
)
//emits
const emits = defineEmits<DropdownEmits>()
const tooltipRef = ref<TooltipInstance>()
const splitButtonRef = ref<ButtonInstance>()
//依赖注入
function handleItemClick(item: DropdownItemProps) {
  props.hideOnClick && tooltipRef.value?.hide()
  !isNil(item.command) && emits('command', item.command)
}
const size = computed(() => props.size)
provide(DROPDOWN_CTX_KEY, {
  handleItemClick,
  size
})
!TEST && useDisabledStyle()
defineExpose<DropdownInstance>({
  open: () => tooltipRef.value?.show(),
  close: () => tooltipRef.value?.hide()
})
</script>

<template>
  <div class="viz-dropdown">
    <viz-tooltip
      v-bind="tooltipProps"
      @visible-change="val => emits('visible-change', val)"
      ref="tooltipRef"
      :virtualTriggering="splitButton"
      :virtualRef="splitButtonRef"
    >
      <template #default>
        <viz-button-group v-if="splitButton" :type="type" :size="size">
          <viz-button @click="e => emits('click', e)"><slot></slot></viz-button>
          <viz-button icon="angle-down" ref="splitButtonRef"></viz-button>
        </viz-button-group>
        <slot v-else></slot>
      </template>
      <template #content>
        <div class="viz-dropdown__menu">
          <slot name="dropdown">
            <template v-for="item in items" :key="item.command">
              <viz-dropdown-item v-bind="item"></viz-dropdown-item>
            </template>
          </slot>
        </div>
      </template>
    </viz-tooltip>
  </div>
</template>

<style scoped>
@import './style.css';

:deep(.viz-button-group) {
  & > :last-child {
    padding: 5px 7px;
  }
}
</style>