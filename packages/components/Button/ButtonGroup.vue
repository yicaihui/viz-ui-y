<script lang="ts" setup>
import { provide, reactive, toRef } from 'vue'
import type { ButtonGroupProps } from './types'
import { BUTTON_GROUP_CTX_KEY } from './constants'

//1. 依赖注入 2. 特殊样式
defineOptions({
  name: 'VizButtonGroup'
})
const props = defineProps<ButtonGroupProps>()
provide(
  BUTTON_GROUP_CTX_KEY,
  reactive({
    size: toRef(props, 'size'),
    type: toRef(props, 'type'),
    disabled: toRef(props, 'disabled')
  })
)
</script>
<template>
  <div class="viz-button-group">
    <slot></slot>
  </div>
</template>