/**
 * @typedef { Object } ElementConfig
 * @property { String } element 标签名，如div，p，el-input等
 * @property { Array} options 用于el-select组件生成选项，不是select组件可以忽略不写
 * @property { Object } attrs 动态组件的属性，相当于props或vue2的$attrs属性
 * @property { Object } methods 事件处理程序，用于传入自定义事件，用于在组件内部调用$emit
 * @property { Object } formItem  动态表单中有el-form-item组件生成，这里动态配置它的参数
 * @property { String } field 用于动态生成表单组件内部的参数，每个参数指的表单里的组件对应的v-model。执行表单提交时可获取对应的值。
 * @property { Function | Boolean } permission 用于权限认证
 * @property { Function } callback  用于给el-select组件异步请求获取数据
 * @property { Boolean } focus  true,表示focus时执行callback函数
 * @property { Boolean } change true,表示change时执行callback函数
 * @property { Boolean } async  true,表示开启初始化执行callback函数
 */

/**
 * @description select 配置
 * @type ElementConfig
 */
export const ElSelect = {
  element: 'el-select',
  children: 'el-option',
}
/**
 * @description input 配置
 * @type ElementConfig
 */
export const ElInput = {
  element: 'el-input',
}
/**
 * @description select 配置
 * @type ElementConfig
 */
export const ElRadio = {
  children: 'el-radio',
}
