// 设置组件
export interface Components {
  orgComponent?: string; // 原组件
  relationType?: number; // 关联类型 相等/统计
  relationTem?: string; // 关联模板
  relationCompo?: string; // 关联组件
  relationCompoId?: string; // 关联组件fileid
  relationFunc?: string; // 关联函数
  relationFuncId?: string; // 关联函数
}

export interface ValidatedError {
  /**
   * @zh 标签的文本
   * @en Label text
   * @version 2.18.0
   */
  label: string;
  /**
   * @zh 字段名
   * @en Field name
   */
  field: string;
  /**
   * @zh 字段值
   * @en Field value
   */
  value: any;
  /**
   * @zh 字段类型
   * @en Field Type
   */
  type: string;
  /**
   * @zh 是否为 `required` 错误
   * @en Is it a `required` error
   */
  isRequiredError: boolean;
  /**
   * @zh 错误信息
   * @en Error message
   */
  message: string;
}

export interface FormItemEventHandler {
  /**
   * @zh onChange
   * @en onChange
   */
  onChange?: (ev?: Event) => void;
  /**
   * @zh onInput
   * @en onInput
   */
  onInput?: (ev?: Event) => void;
  /**
   * @zh onFocus
   * @en onFocus
   */
  onFocus?: (ev?: Event) => void;
  /**
   * @zh onBlur
   * @en onBlur
   */
  onBlur?: (ev?: Event) => void;
}
