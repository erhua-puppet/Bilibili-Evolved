import {
  TestPattern,
  Executable,
  VueModule,
  I18nDescription,
} from '@/core/common-types'
import { ComponentSettings } from '@/core/settings'
import { CoreApis } from '@/core/core-apis'
import { PluginMinimalData } from '@/plugins/plugin'
import { Range } from '@/ui/range'
import { Widget } from '@/widgets/widget'
import { LanguagePack } from './i18n/types'

type Author = {
  name: string
  link: string
}
type Optional<Target, Props extends keyof Target> = {
  [P in Props]?: Target[P]
} & Omit<Target, Props>
/** 组件标签 */
export interface ComponentTag {
  /** 标签的名称 */
  name: string
  /** 标签的显示名称 */
  displayName: string
  /** 标签的颜色 */
  color: string
  /** 标签对应图标(传入`<VIcon>`的`icon`中) */
  icon: string
  /** 设置面板中的呈现顺序 */
  order: number
}
type ComponentOptionValidator<T> = (value: T) => T | undefined | null
/** 组件选项信息
 * @todo 需要 extends 出更具体的 Option 类型, 现在这样混一起太乱
 */
export interface ComponentOption {
  /** 默认值 */
  defaultValue: any
  /** 显示名称 */
  displayName: string
  /** 如果希望这个选项显示为一个下拉框, 可以用相应的`enum`提供下拉框的选值, 或者也可以传入`string[]` */
  dropdownEnum?: any
  /** 是否不显示在设置面板中(不自动生成选项UI) */
  hidden?: boolean
  /** 设为`true`时, 将用颜色选取器替代文本框 */
  color?: boolean
  /** 设为`true`时, 表示选项为多个`boolean`开关, 将显示为选择框列表 */
  switches?: boolean
  /** 设置范围, 可以显示为一个滑动条 */
  slider?: {
    min?: number
    max?: number
    step?: number
  }
  // /** 与`switches`选项配合使用, 设为`true`时, 用<RadioButton>替代<CheckBox>进行单选限制 */
  // radio?: boolean
  /** `number`, `string`或`Range`类型的选项, 可以添加验证函数来阻止非法输入 */
  validator?: ComponentOptionValidator<Range<string>> |
  ComponentOptionValidator<string> | ComponentOptionValidator<number>
}
/** 组件选项信息 */
export interface ComponentOptions {
  [key: string]: ComponentOption
}
/** 组件标签 */
export const componentsTags = {
  /** 视频 */
  video: {
    name: 'video',
    displayName: '视频',
    color: '#2196F3',
    icon: 'mdi-play-circle-outline',
    order: 1,
  } as ComponentTag,
  /** 样式 */
  style: {
    name: 'style',
    displayName: '样式',
    color: '#8BC34A',
    icon: 'mdi-palette-outline',
    order: 2,
  } as ComponentTag,
  /** 动态 */
  feeds: {
    name: 'feeds',
    displayName: '动态',
    color: '#00ACC1',
    // 用了MDI里尖角的风车图标, 因为懒得再调视觉大小了
    icon: 'mdi-pinwheel-outline',
    order: 3,
  } as ComponentTag,
  /** 直播 */
  live: {
    name: 'live',
    displayName: '直播',
    color: '#26A69A',
    icon: 'mdi-video-wireless-outline',
    order: 4,
  } as ComponentTag,
  /** 工具 */
  utils: {
    name: 'utils',
    displayName: '工具',
    color: '#A36FFD',
    icon: 'mdi-rocket-launch-outline',
    order: 5,
  } as ComponentTag,
  /** 触摸 */
  touch: {
    name: 'touch',
    displayName: '触摸',
    color: '#78909C',
    icon: 'mdi-gesture-tap-button',
    order: 6,
  } as ComponentTag,
  /** 实验性 */
  experimental: {
    name: 'experimental',
    displayName: '实验',
    color: '#FF5722',
    icon: 'mdi-flask-outline',
    order: 7,
  } as ComponentTag,
  /** 通用 */
  general: {
    name: 'general',
    displayName: '通用',
    color: '#888',
    icon: 'mdi-progress-wrench',
    order: 8,
  } as ComponentTag,
}
/** 组件入口函数 */
export type ComponentEntry<T = unknown> = (
  context: {
    /** 当前组件的设置 */
    settings: ComponentSettings
    /** 当前组件的信息 */
    metadata: ComponentMetadata
    /** 核心 API */
    coreApis: CoreApis
  }
) => T | Promise<T>
/** 带有函数/复杂对象的组件信息 */
export interface FunctionalMetadata {
  /** 主入口, 重新开启时不会再运行 */
  entry: ComponentEntry
  /** 导出小组件 */
  widget?: Omit<Widget, 'name'>
  /** 首屏样式, 会尽快注入 (before DCL) */
  instantStyles?: {
    /** 样式ID */
    name: string
    /** 样式内容, 可以是一个导入样式的函数 */
    style: string | (() => Promise<{ default: string }>)
    /** 设为`true`则注入到`document.body`末尾, 否则注入到`document.head`末尾 */
    important?: boolean
  }[]
  /** 重新开启时执行 */
  reload?: Executable
  /** 关闭时执行 */
  unload?: Executable
  /** 插件化数据定义 */
  plugin?: Optional<PluginMinimalData, 'name'>
  /** 额外想要展示在设置里的选项 UI */
  extraOptions?: Executable<VueModule>
  /** 设置匹配的URL, 不匹配则不运行此组件 */
  urlInclude?: TestPattern
  /** 设置不匹配的URL, 不匹配则不运行此组件, 优先级高于`urlInclude` */
  urlExclude?: TestPattern
}
/** 组件基本信息 */
export interface ComponentMetadata extends FunctionalMetadata {
  /** 组件名称 */
  name: string
  /** 显示名称 */
  displayName: string
  /** 标签 */
  tags: ComponentTag[]
  /** 是否默认开启, 省略时为 true */
  enabledByDefault?: boolean
  /** 是否可更改, 不可更改时启用状态固定为 `enabledByDefault` 的值 */
  configurable?: boolean
  /**  是否在设置界面中隐藏 (代码仍可操作) */
  hidden?: boolean
  /** 组件描述 (markdown), 可以设置为对象提供多语言的描述 (`key: 语言代码`) */
  description?: I18nDescription
  /** 组件子选项 */
  options?: ComponentOptions
  /** i18n 数据 */
  i18n?: Record<string, LanguagePack>
  /** 作者信息 */
  author?: Author | Author[]
}
/** 用户组件的非函数基本信息, 用于直接保存为 JSON */
export type UserComponentMetadata = Omit<ComponentMetadata, keyof FunctionalMetadata>
// export interface UserComponentMetadata extends Omit<
//   ComponentMetadata, keyof FunctionalMetadata
// > {
//   /** 是否支持 reload / unload */
//   reloadable: boolean
// }
export type ComponentMetadataFunction = (coreApis: CoreApis) => ComponentMetadata