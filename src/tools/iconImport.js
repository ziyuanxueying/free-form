import {
  IconUpload,
  IconDelete,
  IconCopy,
  IconLanguage,
  IconUserGroup,
  IconMessage,
  IconInteraction,
  IconEdit,
  IconList,
  IconOriginalSize,
  IconLayout,
  IconFolder,
  IconCalendar,
  IconDownCircle,
  IconPoweroff,
  IconDashboard,
  IconCodeBlock,
  IconSubscribed,
  IconFilePdf,
  IconBold,
  IconPlus,
} from '@arco-design/web-vue/es/icon'

const iconComponents = {
  IconUpload,
  IconDelete,
  IconCopy,
  IconLanguage,
  IconUserGroup,
  IconMessage,
  IconInteraction,
  IconEdit,
  IconList,
  IconOriginalSize,
  IconLayout,
  IconFolder,
  IconCalendar,
  IconDownCircle,
  IconPoweroff,
  IconDashboard,
  IconCodeBlock,
  IconSubscribed,
  IconFilePdf,
  IconBold,
  IconPlus,
}

export default{
  install (app) {
    Object.keys(iconComponents).forEach(key => {
      app.component(key, iconComponents[key])
    }) 
  }
}

export const icons = {
  IconUserGroup,
  IconMessage,
  IconInteraction,
  IconEdit,
  IconList,
  IconOriginalSize,
  IconLayout,
  IconFolder,
  IconCalendar,
  IconDownCircle,
  IconPoweroff,
  IconDashboard,
  IconCodeBlock,
  IconSubscribed,
  IconFilePdf,
  IconBold,
}