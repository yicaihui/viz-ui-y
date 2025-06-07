<!-- eslint-disable vue/valid-v-slot -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PopconfirmEmits, PopconfirmProps } from './types.ts'
import { addUnit } from '@viz-ui-y/utils'

import { VizIcon } from '../Icon'
import { VizTooltip, type TooltipInstance } from '../Tooltip'
import { VizButton } from '../Button'
import { useLocale } from '@viz-ui-y/hooks'

const props = withDefaults(defineProps<PopconfirmProps>(), {
  title: '',
  confirmButtonType: 'primary',
  icon: 'question-circle',
  iconColor: '#f90',
  hideAfter: 200,
  width: 150
})
const computedStyle = computed(() => {
  return { width: addUnit(props.width) }
})
const tooltipRef = ref<TooltipInstance>()
function hidePopper() {
  tooltipRef.value?.hide()
}

function confirm(e: MouseEvent) {
  emits('confirm', e)
  hidePopper()
}

function cancel(e: MouseEvent) {
  emits('cancel', e)
  hidePopper()
}
const emits = defineEmits<PopconfirmEmits>()
//国际化
const locale = useLocale()
defineOptions({
  name: 'VizPopconfirm'
})
</script>

<template>
  <viz-tooltip ref="tooltipRef" trigger="click" :hideTimeout="hideAfter">
    <template #default>
      <slot name="default" v-if="$slots.default"></slot>
      <slot name="reference" v-if="$slots.reference"></slot>
    </template>
    <template #content>
      <!-- 弹出内容 -->
      <div class="viz-popconfirm" :style="computedStyle">
        <div class="viz-popconfirm__main">
          <viz-icon v-if="!hideIcon && icon" :icon="icon" :color="iconColor" />
          {{ title }}
        </div>
        <div class="viz-popconfirm__action">
          <viz-button
            size="small"
            class="viz-popconfirm__cancel"
            :type="cancelButtonType"
            @click="cancel"
          >
            {{ cancelButtonText || locale.t('popconfirm.cancelButtonText') }}
          </viz-button>
          <viz-button
            size="small"
            class="viz-popconfirm__confirm"
            :type="confirmButtonType"
            @click="confirm"
          >
            {{ confirmButtonText || locale.t('popconfirm.confirmButtonText') }}
          </viz-button>
        </div>
      </div>
    </template>
  </viz-tooltip>
</template>

<style scoped>
@import './style.css';
</style>