# ng4-icheck
本组件基于 [iCheck v1.0.2](`https://github.com/fronteed/iCheck`) 创建，适用于 Angular2 及以上版本。

# Installation
* 通过 NPM 安装 ng4-icheck 以及依赖包
```bash
npm install icheck ng4-icheck --save
```

* 导入 ICheckModule 模块到项目的 app.module.ts
```javascript
import { ICheckModule } from 'ng4-icheck';
@NgModule({
  imports: [ ICheckModule.forRoot() ]
})
```

* 引入 iCheck 的层叠样式表到项目中，你可以在 /node_modules/icheck/skins/ 文件夹中找到所有的样式表，将其中你需要的样式表加入到你的HTML文档中。 例如加载红色扁平风格的样式：
```html
<link href="node_modules/icheck/skins/flat/red.css" rel="stylesheet">
```
* 你也可以选择将他们加到 .angular-cli.json 文件的 styles 段：
```javascript
  "styles": [
    "../node_modules/icheck/skins/flat/red.css"
  ],
```

## Usage
* 在你的项目模板的单选或复选框代码中加入 icheck 属性，注意 iCheckClass 属性（以红色扁平风格的样式为例）：
```html
<input icheck iCheckClass="icheckbox_flat-red" type="checkbox">
<input icheck iCheckClass="icheckbox_flat-red" type="checkbox" checked>
<input icheck iCheckClass="iradio_flat-red" type="radio" name="exampleRadio">
<input icheck iCheckClass="iradio_flat-red" type="radio" name="exampleRadio" checked>
```
* 为了简化HTML，你可以在 ICheckModule 中进行全局配置
```javascript
import { ICheckModule } from 'ng4-icheck';
@NgModule({
  imports: [ ICheckModule.forRoot({
    checkboxClass: 'icheckbox_flat-red',
    radioClass: 'iradio_flat-red'
  }) ]
})
```

## Module Options & Attributes( Input )
模块支持的选项和组件属性
- handle: 'checkbox' | 'radio' | '', // 将 iCheck 应用到复选框 / 单选框 / 全部 ( 只能配置到Module Options，缺省全部 )
- checkboxClass: 'icheckbox', // 复选框默认样式
- radioClass: 'iradio', // 单选框默认样式
- checkedClass: 'checked', // 选中状态样式
- checkedCheckboxClass: '', // 复选框选中状态样式 ( 缺省会自动应用 checkedClass )
- checkedRadioClass: '', // 单选框选中状态样式 ( 缺省会自动应用 checkedClass )
- uncheckedClass: '', // 未选中状态样式
- uncheckedCheckboxClass: '', // 复选框未选中状态样式 ( 缺省会自动应用 uncheckedClass )
- uncheckedRadioClass: '', // 单选框未选中状态样式 ( 缺省会自动应用 uncheckedClass )
- disabledClass: 'disabled', // 禁用状态样式
- disabledCheckboxClass: '', // 复选框禁用状态样式 ( 缺省会自动应用 disabledClass )
- disabledRadioClass: '', // 单选框禁用状态样式 ( 缺省会自动应用 disabledClass )
- enabledClass: '', // 启用状态样式
- enabledCheckboxClass: '', // 复选框启用状态样式 ( 缺省会自动应用 enabledClass )
- enabledRadioClass: '', // 单选框启用状态样式 ( 缺省会自动应用 enabledClass )
- hoverClass: 'hover', // 鼠标滑入样式
- labelHover: true, // 是否将鼠标滑入样式应用到 label 标签
- labelHoverClass: 'hover', // 鼠标滑入时 label 标签样式

## Callbacks( Output )
* 回调支持
- ifClicked: 当用户点击 iCheck 时触发
- ifChanged: 当 iCheck 在 checked / unchecked / disabled / enabled 状态变更时触发
- ifChecked: 当 iCheck 从 unchecked 变更为 checked 状态时触发
- ifUnchecked: 当 iCheck 从 checked 变更为 unchecked 状态时触发
- ifDisabled: 当 iCheck 从 enabled 变更为 disabled 状态时触发
- ifEnabled: 当 iCheck 从 disabled 变更为 enabled 状态时触发
* 应用回调用举例：
```html
<input icheck type="checkbox" (ifChecked)="console.log($event)">
```

## Methods
* 组件支持的外部方法调用
- check(): iCheck 状态变更为 checked
- uncheck(): iCheck 状态变更为 unchecked
- disable(): iCheck 状态变更为 diabled
- enable(): iCheck 状态变更为 enable
- update(): 根据单选或复选框的当前状态更新模板
* 方法调用举例：
```javascript
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ICheckComponent } from 'ng4-icheck';

@Component({
  select: 'app-root',
  template: `
  <label>
    <input #exampleCheckbox icheck iCheckClass="icheckbox_flat-red" (ifChecked)="log($event)" type="checkbox">
    Example Checkbox
  </label>`,
  styles: [`
    label { padding-left: 30px; }
  `]
})
export class AppComponent implements AfterViewInit {

  @ViewChild('exampleCheckbox') iCheckComponentRef: ICheckComponent;

  ngAfterViewInit() {
    this.iCheckComponentRef.check();
  }

  log(e) {
    console.log('exampleCheckbox: ' + e.type.replace('if', '').toLowerCase());
  }

}
```

## Feedback

Please [leave your feedback](https://github.com/yiller/ng4-icheck/issues) if you have noticed any issues or have a feature request.

## License

The repository code is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
