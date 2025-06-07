import Message from './methods'
import { withInstallFunction } from '@viz-ui-y/utils'

export const VizMessage = withInstallFunction(Message, '$message')

export * from './types'
