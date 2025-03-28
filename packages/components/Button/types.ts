import type { Component, ComputedRef, Ref } from 'vue'

export type ButtonType = 'primary' | 'success' | 'danger' | 'info' | 'warning'
export type ButtonSize = 'small' | 'default' | 'large'
export type NativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  tag?: string | Component
  type?: ButtonType
  size?: ButtonSize
  nativeType?: NativeType
  disabled?: boolean
  loading?: boolean
  icon?: string
  circle?: boolean
  plain?: boolean
  round?: boolean
  autofocus?: boolean
  loadingIcon?: string
  useThrottle?: boolean
  throttleDuration?: number
}
export interface ButtonEmits {
  (e: 'click', value: MouseEvent): void
}

export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>
  disabled: ComputedRef<boolean>
  size: ComputedRef<string>
  type: ComputedRef<string>
}

//button-group
export interface ButtonGroupProps {
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
}

export interface ButtonGroupContext {
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
}
