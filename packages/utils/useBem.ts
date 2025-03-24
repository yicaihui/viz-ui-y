// export function createNamespace(name: string) {
//   const prefixName = `viz-${name}`
//   return createBem(prefixName)
// }
// function createBem(prefixName: string) {
//   const b = (blockSuffix: string = '') => _bem(prefixName, blockSuffix, '', '')
//   const e = (element: string = '') =>
//     element ? _bem(prefixName, '', element, '') : ''
//   const m = (modifier: string = '') =>
//     modifier ? _bem(prefixName, '', '', modifier) : ''
//   const be = (blockSuffix: string = '', element: string = '') =>
//     blockSuffix && element ? _bem(prefixName, blockSuffix, element, '') : ''
//   const bm = (blockSuffix: string = '', modifier: string = '') =>
//     blockSuffix && modifier ? _bem(prefixName, blockSuffix, '', modifier) : ''
//   const em = (element: string = '', modifier: string = '') =>
//     element && modifier ? _bem(prefixName, '', element, modifier) : ''
//   const bem = (
//     blockSuffix: string = '',
//     element: string = '',
//     modifier: string = ''
//   ) =>
//     blockSuffix && element && modifier
//       ? _bem(prefixName, blockSuffix, element, modifier)
//       : ''
//   const is = (name: string, state: boolean) => (state ? `is-${name}` : '')
//   return {
//     b,
//     e,
//     m,
//     be,
//     bm,
//     em,
//     bem,
//     is
//   }
// }
// function _bem(
//   prefixName: string,
//   blockSuffix: string,
//   element: string,
//   modifier: string
// ) {
//   if (blockSuffix) {
//     prefixName += `-${blockSuffix}`
//   }
//   if (element) {
//     prefixName += `__${element}`
//   }
//   if (modifier) {
//     prefixName += `--${modifier}`
//   }
//   return prefixName
// }

import { computed, unref, type Ref } from 'vue'
import { camelCaseToKebabCase } from '../utils/text-case'

/**
 * @description creates BEM modifiers based on transferred prefix (base BEM class) & modifiers list.
 * camelCase modifiers names will be transformed to the kebab-case.
 * @param prefix string that classes start with (base BEM class).
 * @param modifiers list of options that will serve as state BEM modifiers.
 * @returns computed classes starting with "prefix" and ending with form state BEM modifier.
 * @example
 *  const result = useBem('va-component', computed(() => pick(props, ['success, noError'])))
 *  // if success & noError are `true`
 *  { ...result }: { 'va-component--success': true, va-component--no-error: true }
 */
export const useBem = <ModifierKey extends string, Prefix extends string>(
  prefix: Prefix,
  modifiers:
    | Record<ModifierKey, boolean | undefined>
    | Ref<Record<ModifierKey, boolean | undefined>>
    | (() => Record<ModifierKey, boolean | undefined>)
) => {
  const modifiersList = computed(() =>
    typeof modifiers === 'function' ? modifiers() : unref(modifiers)
  )

  const computedBemClassesObject = computed(() => {
    return Object.entries(unref(modifiersList)).reduce(
      (classesObj: Record<string, boolean>, [modifierName, value]) => {
        if (value) {
          classesObj[`${prefix}--${camelCaseToKebabCase(modifierName)}`] = true
        }

        return classesObj
      },
      {}
    )
  })

  return computedBemClassesObject
}
