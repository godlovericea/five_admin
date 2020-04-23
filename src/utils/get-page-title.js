import defaultSettings from '@/settings'

const title = defaultSettings.title || '产业生态图资料收集'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
