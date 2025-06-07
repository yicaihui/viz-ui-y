import Notification from './methods.ts'
import { withInstallFunction } from '@viz-ui-y/utils'

export const VizNotification = withInstallFunction(Notification, '$notify')

export * from './types'
