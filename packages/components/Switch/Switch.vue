<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import type { SwitchEmits, SwitchInstance, SwitchProps } from './types'
import { useId } from '@viz-ui-y/hooks'

defineOptions({ name: 'VizSwitch', inheritAttrs: false })
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false
})
const emits = defineEmits<SwitchEmits>()
onMounted(() => {
  inputRef.value!.checked = checked.value
})
const innerValue = ref(props.modelValue)
watch(
  () => props.modelValue,
  newVal => {
    innerValue.value = newVal
  }
)
const isDisabled = computed(() => props.disabled)
const checked = computed(() => innerValue.value === props.activeValue)
let inputRef = ref<HTMLInputElement>()
watch(checked, val => {
  inputRef.value!.checked = val
})
const inputId = useId().value
//切换
const handleChange = () => {
  if (isDisabled.value) return
  const newVal = checked.value ? props.inactiveValue : props.activeValue
  innerValue.value = newVal
  emits('update:modelValue', newVal)
  emits('change', newVal)
}
const focus: SwitchInstance['focus'] = () => {
  inputRef.value?.focus()
}
defineExpose<SwitchInstance>({
  checked,
  focus
})
</script>

<template>
  <div
    class="viz-switch"
    :class="{
      [`viz-switch--${size}`]: size,
      'is-disabled': isDisabled,
      'is-checked': checked
    }"
    @click="handleChange"
  >
    <input
      class="viz-switch__input"
      type="checkbox"
      role="switch"
      ref="inputRef"
      :id="inputId"
      :name="name"
      :disabled="isDisabled"
      :checked="checked"
      @keydown.enter="handleChange"
    />
    <div class="viz-switch__core">
      <div class="viz-switch__core-inner">
        <span
          v-if="activeText || inactiveText"
          class="viz-switch__core-inner-text"
        >
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="viz-switch__core-action"></div>
    </div>
  </div>
</template>

<style scoped>
@import './style.css';
</style>