export * from './categories'
export * from './posts'
export * from './comments'

export const SHOW_TOAST = 'SHOW_TOAST'

export function setToastMessage(message) {
  return {
    type: SHOW_TOAST,
    message
  }
}
