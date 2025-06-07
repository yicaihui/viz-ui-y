<script lang="ts" setup>
import { computed, nextTick, ref, shallowRef, useAttrs, watch } from 'vue'
import type { InputProps, InputEmits, InputInstance } from './types'
import { useFocusController, useId } from '@viz-ui-y/hooks'
import Icon from '../Icon/Icon.vue'
import { each, noop } from 'lodash-es'
defineOptions({
  name: 'VizInput'
})
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  autocomplete: 'off'
})
const attrs = useAttrs()
const innerValue = ref(props.modelValue)
const passwordVisible = ref(false)
const showPasswordArea = computed(
  () =>
    props.type === 'password' &&
    props.showPassword &&
    !isDisabled.value &&
    !!innerValue.value
)
//ref
const inputRef = shallowRef<HTMLInputElement>()
const textareaRef = shallowRef<HTMLTextAreaElement>()
const _ref = computed(() => inputRef.value || textareaRef.value)
//showClear
const isDisabled = computed(() => props.disabled)
const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(
  _ref,
  {
    afterBlur() {
      //todo
    }
  }
)
const showClear = computed(
  () =>
    props.clearable &&
    !!innerValue.value &&
    !isDisabled.value &&
    isFocused.value
)

const emits = defineEmits<InputEmits>()
const clear: InputInstance['clear'] = function () {
  innerValue.value = ''
  each(['update:modelValue', 'input', 'change'], e => emits(e as any, ''))
  emits('clear')
}

const focus: InputInstance['focus'] = async function () {
  await nextTick()
  _ref.value?.focus()
}

const blur: InputInstance['blur'] = function () {
  _ref.value?.blur()
}

const select: InputInstance['select'] = function () {
  _ref.value?.select()
}

function handleInput() {
  emits('update:modelValue', innerValue.value)
  emits('input', innerValue.value)
}

function handleChange() {
  emits('change', innerValue.value)
}

function togglePasswordVisible() {
  passwordVisible.value = !passwordVisible.value
}
watch(
  () => props.modelValue,
  newValue => {
    innerValue.value = newValue
  }
)
defineExpose<InputInstance>({
  ref: _ref,
  focus,
  blur,
  select,
  clear
})
</script>

<template>
  <div
    class="viz-input"
    :class="{
      [`viz-input--${type}`]: type,
      [`viz-input--${size}`]: size,
      'is-disabled': isDisabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-focus': isFocused
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <div v-if="$slots.prepend" class="viz-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="viz-input__wrapper" ref="wrapperRef">
        <span v-if="$slots.prefix" class="viz-input__prefix">
          <slot name="prefix"></slot>
        </span>
        <input
          class="viz-input__inner"
          ref="inputRef"
          :id="useId().value"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="isDisabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          v-model="innerValue"
          v-bind="attrs"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <!-- suffix slot -->
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="viz-input__suffix"
        >
          <slot name="suffix"></slot>
          <Icon
            icon="circle-xmark"
            v-if="showClear"
            class="viz-input__clear"
            @click="clear"
            @mousedown.prevent="noop"
          />
          <Icon
            icon="eye"
            v-if="showPasswordArea && passwordVisible"
            class="viz-input__password"
            @click="togglePasswordVisible"
          />
          <Icon
            icon="eye-slash"
            v-if="showPasswordArea && !passwordVisible"
            class="viz-input__password"
            @click="togglePasswordVisible"
          />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="viz-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        ref="textareaRef"
        class="viz-textarea__wrapper"
        :id="useId().value"
        :disabled="isDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        v-model="innerValue"
        v-bind="attrs"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      ></textarea>
    </template>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
