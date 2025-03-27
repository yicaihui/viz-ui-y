<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import type { ButtonProps, ButtonEmits, ButtonInstance } from './types'
import { throttle } from 'lodash-es'
import VizIcon from '../Icon/Icon.vue'
import { BUTTON_GROUP_CTX_KEY } from './constants'

defineOptions({
  name: 'VizButton'
})

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  type: 'primary',
  nativeType: 'button',
  useThrottle: true,
  throttleDuration: 500
})
const slots = defineSlots()
const emits = defineEmits<ButtonEmits>()
const _ref = ref<HTMLButtonElement>()
//节流
const handleBtnClick = (e: MouseEvent) => {
  emits('click', e)
}
const handlBtneCLickThrottle = throttle(
  handleBtnClick,
  props.throttleDuration,
  { trailing: false }
)
//iconStyle
const iconStyle = computed(() => {
  return {
    marginRight:
      slots.default && slots.default()[0].children != '' ? '6px' : '0px'
  }
})
// 依赖注入
const buttonGroupCtx = inject(BUTTON_GROUP_CTX_KEY, void 0)
const size = computed(() => buttonGroupCtx?.size ?? props.size ?? '')
const type = computed(() => buttonGroupCtx?.type ?? props.type ?? '')
const disabled = computed(
  () => props.disabled || buttonGroupCtx?.disabled || false
)

defineExpose<ButtonInstance>({
  ref: _ref
})
</script>

<template>
  <component
    :is="tag"
    :autofocus="autofocus"
    ref="_ref"
    class="viz-button"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled="disabled || loading ? true : void 0"
    :class="{
      'is-disabled': disabled,
      'is-loading': loading,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      [`viz-button--${type}`]: type,
      [`viz-button--${size}`]: size
    }"
    @click="
      (e: MouseEvent) =>
        useThrottle ? handlBtneCLickThrottle(e) : handleBtnClick(e)
    "
  >
    <template v-if="loading">
      <slot name="loading">
        <viz-icon
          class="loading-icon"
          :icon="loadingIcon ? loadingIcon : 'spinner'"
          :style="iconStyle"
          size="1x"
          spin
        />
      </slot>
    </template>
    <viz-icon
      :icon="icon"
      size="1x"
      :style="iconStyle"
      v-if="icon && !loading"
    />
    <slot></slot>
  </component>
</template>

<style>
@import './style.css';
</style>
