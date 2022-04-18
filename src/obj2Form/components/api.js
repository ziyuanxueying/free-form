import { post } from '@/tools/request'
export const pageList = (params) => post('/oa-platform/procInstAuthRel/pageList',params)
export const getFormItems = (id) => post(`oa-platform/procInstApply/formData/${id}`)