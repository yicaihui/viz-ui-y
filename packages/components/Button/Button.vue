<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ButtonProps, ButtonEmits, ButtonInstance } from './types'
import { throttle, pick } from 'lodash-es'
import VizIcon from '../Icon/Icon.vue'
import { useBem } from '@viz-ui-y/utils'

defineOptions({
  name: 'VizButton'
})
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
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
const handlBtneCLickThrottle = throttle(handleBtnClick, props.throttleDuration)
//iconStyle
const iconStyle = computed(() => ({
  marginRight: slots.default ? '6px' : '0px'
}))
defineExpose<ButtonInstance>({
  ref: _ref
})
//style
const computedClass = useBem('viz-button', () => ({
  ...pick(props, 'disabled', 'loading', 'round', 'plain'),
  small: props.size === 'small',
  normal: !props.size || props.size === 'default',
  large: props.size === 'large'
}))
</script>

<template>
  <component
    :is="tag"
    :autofocus="autofocus"
    ref="_ref"
    class="viz-button"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled="disabled || loading ? true : void 0"
    :class="computedClass"
    @click="
      (e: MouseEvent) =>
        useThrottle ? handlBtneCLickThrottle(e) : handleBtnClick(e)
    "
  >
    <template v-if="loading">
      <slot name="loading">
        <viz-icon
          class="loading-icon"
          :icon="loadingIcon ?? 'spinner'"
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

<style scoped>
@import './style.css';
</style>
