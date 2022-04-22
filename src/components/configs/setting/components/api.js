import { post } from '@/tools/request'
export const selectListFlat = () => post('/oa-platform/procTplConfig/selectListFlat')
export const componentList = (id) => post('/oa-platform/procTplConfig/componentList',{ procTplConfigIdList:[id] })