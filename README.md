# convremvw-loader

Rem or vm conversion
可以转换 rem 又可以转换 vm 的 loader 

## 安装

```
npm install convremvw-loader
```

默认转换 rem，如果是 rem 还需引入来进行根元素font-size的变化

```
function resize () {
			document.documentElement.setAttribute('style', 'font-size:'+document.documentElement.clientWidth / 7.5 + 'px !important');
}
		document.addEventListener('DOMContentLoaded',function() {
				resize()
		window.onresize = function() {
			resize()
		}
	})
```
## 参数
```
module: {
  rules: [{
    test: /\.css$/,
      use: [{
        loader: 'convremvw-loader',
        query: {
         unit: 'rem'或者是'vw'
        }
      }, {
        loader: "css-loader"
      }]
  }]
}
```
## 忽略转换
如需元素不转换单位 在属性值后面加/*i*/即可
```
.test{
  width:100px/*i*/;
}
```
