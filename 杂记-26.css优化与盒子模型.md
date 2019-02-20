写了太久的css，从来没有总结过，所有有必要总结一下css的代码优化方式。

第一：在css外联文件上传到服务器前，压缩css文件，可以使用网上的一些css压缩工具。这样做的好处是，当我们在css的时候，为了代码的可读性跟可维护性，多出来了很多空格。这样的话，浏览器解析css时候，会多一部分精力来去除这些空格，造成时间上的浪费，所以有必要用压缩工具把这些空格去掉，最小化css文件。

第二：使用简写方式。如果要同时改变字体大小，行高，粗体。各自的属性有，font-size,font-weight,line-height.我们可能为每个属性去赋值，但是我们可以这样做

font:bold 12px/20px "微软雅黑"；这样写是最好，因为大大的减少了代码量。同样有margin、padding、border、background等...

第三：尽量使用css外联文件，少使用内联和内嵌样式。如果使用内联样式的话，一方面有相同样式的标签都要加等量代码的样式，另外一方面权重比较大，外联样式要覆盖的话需要在属性后面加important。内嵌样式的话，我觉得对性能没有什么大碍，主要提到外联文件里是因为便于维护，如果有需要修改的地方，可以去分类好的相应样式表里面修改，不必要老是在html文件里面修改，另外可能是因为html文件是最先加载的，提出去html代码量减少了。（值得注意的是：不要把带有style的内嵌样式加在body标签中，因为这样的话style会被解析两次，第一次是在构建dom时，第二次是渲染样式时）。

第四：少使用hack。从网上看到，为了不同的浏览器写不同的样式，会添加更多的代码量，让css文件变得更加冗余。有更好的解决方法就是，使用条件注释方式，如：

```css
<!–[if IE 8]> 
       <link rel=”stylesheet” type=”text/css” href=”ie8.css”> 
<![endif]–>

```
这样写的话，如果打开的浏览器不是ie或者不是ie8，因为不是识别注释条件，所以会忽略这段代码，从而不加载ie8.css。这样就可以正对ie8写专属代码了。不过对于ie8来说，它需要牺牲的就是多了一个http请求。

第五：使用雪碧图。这个优化其实属于图片的优化，但是它也更css有关，把很多小图标合并到一张图片里面，这样减少了很多http请求，然后通过css来控制这张雪碧图的哪个坐标定位在页面上自己想要的位置。不过使用的是小图标，也即页面中装饰的图片。

第六：css文件中代码多注释。为了可读性，可维护性，更以后能看的懂文件的组织逻辑，就要在代码中多注释。

第七：class跟id的合理使用。important > 内联 > ID > 类 > 标签 | 伪类 | 属性选择 > 伪对象 > 继承，class的权重为10，id的权重为100，所以想要用class覆盖id的话需要写10个，而且还要放在id选择器下面。当有共同样式布局的标签时，尽可能使用class，当要标志一个标签的独一无二的时候，使用id。

第八： 避免使用 expression 和 behavior。在页面渲染的过程中， expression 和 behavior 需要大量的计算，会大量地耗费客户端资源。所以不到迫不得已，请不要使用 expression 和 behavior 。可以式javascript代替处理相应的问题。

### 优化CSS重排重绘与浏览器性能

关于CSS重排和重绘的概念，最近看到不少这方面的文章，觉得挺有用，在制作中考虑浏览器的性能，减少重排能够节省浏览器对其子元素及父类元素的重新渲染；避免过分的重绘也能节省浏览器性能；优化动画，使用3D启用GPU硬件加速；慎重选择高消耗的样式，如box-shadow、border-radius、transform、css filters等。

#### 浏览器的渲染机制
浏览器渲染展示网页的过程，大致分为以下几个步骤：

1.解析HTML(HTML Parser)
2.构建DOM树(DOM Tree)
3.渲染树构建(Render Tree)
4.绘制渲染树(Painting)
![Uploading 1.png…](https://camo.githubusercontent.com/57627c481b3ab50fec0d01dbdf338307685736bf/687474703a2f2f696d672e63616962616f6a69616e2e636f6d2f75706c6f6164732f323031362f31312f313437383736333536343938333235362e706e67)

#### 慎重选择高消耗的样式
什么 CSS 属性是高消耗的？就是那些绘制前需要浏览器进行大量计算的属性。

- box-shadows
- border-radius
- transparency
- transforms
- CSS filters（性能杀手）

#### 什么是reflow
浏览器为了重新渲染部分或整个页面，重新计算页面元素位置和几何结构的进程叫做reflow.

通俗点说就是当开发人员定义好了样式后(也包括浏览器的默认样式),浏览器根据这些来计算并根据结果将元素放到它应该出现的位置上，这个过程叫做reflow.

由于reflow是一种浏览器中的用户拦截操作，所以我们了解如何减少reflow次数，及DOM的层级，css效率对refolw次数的影响是十分有必要的。

reflow(回流)是导致DOM脚本执行效率低的关键因素之一，页面上任何一个节点触发了reflow，会导致它的子节点及祖先节点重新渲染。

简单解释一下 Reflow：当元素改变的时候，将会影响文档内容或结构，或元素位置，此过程称为 Reflow。

```html
<body>
  <div class="hello">
    <h4>hello</h4>
    <p><strong>Name:</strong>BDing</p>
    <h5>male</h5>
    <ol>
      <li>coding</li>
      <li>loving</li>
    </ol>
  </div>
</body>
```
当p节点上发生reflow时，hello和body也会重新渲染，甚至h5和ol都会收到影响。

#### 什么时候会导致reflow发生呢？

- 改变窗口大小
- 改变文字大小
- 添加/删除样式表
- 内容的改变，(用户在输入框中写入内容也会)
- 激活伪类，如:hover
- 操作class属性
- 脚本操作DOM
- 计算offsetWidth和offsetHeight
- 设置style属性


常见的重排元素 |   |   |  
-- | -- | -- | --
width | height | padding | margin
display | border-width | border | top
position | font-size | float | text-align
overflow-y | font-weight | overflow | left
font-family | line-height | vertical-align | right
clear | white-space | bottom | min-height

#### 减少reflow对性能的影响的建议

1. 不要一条一条地修改 DOM 的样式，预先定义好 class，然后修改 DOM 的 className
把 DOM 离线后修改，比如：先把 DOM 给 display:none (有一次 Reflow)，然后你修改100次，然后再把它显示出来
2. 不要把 DOM 结点的属性值放在一个循环里当成循环里的变量
3.尽可能不要修改影响范围比较大的 DOM
4. 为动画的元素使用绝对定位 absolute / fixed
5. 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局
6. 尽可能限制reflow的影响范围，尽可能在低层级的DOM节点上，上述例子中，如果你要改变p的样式，class就不要加在div上，通过父元素去影响子元素不好。
7. 避免设置大量的style属性，因为通过设置style属性改变结点样式的话，每一次设置都会触发一次reflow，所以最好是使用class属性
8. 实现元素的动画，它的position属性，最好是设为absoulte或fixed，这样不会影响其他元素的布局
9. 动画实现的速度的选择。比如实现一个动画，以1个像素为单位移动这样最平滑，但是reflow就会过于频繁，大量消耗CPU资源，如果以3个像素为单位移动则会好很多。
10. 不要使用table布局，因为table中某个元素旦触发了reflow，那么整个table的元素都会触发reflow。那么在不得已使用table的场合，可以设置table-layout:auto;或者是table-layout:fixed这样可以让table一行一行的渲染，这种做法也是为了限制reflow的影响范围
11. 如果CSS里面有计算表达式，每次都会重新计算一遍，出发一次reflow

#### 什么是repaint

repaint是在一个元素的外观被改变，但没有改变布局的情况下发生的，如改变了visibility、outline、background等。当repaint发生时，浏览器会验证DOM树上所有其他节点的visibility属性。

通俗来说，就是当各种盒子的位置、大小以及其他属性，例如颜色、字体都确定下来后，浏览器便把这些元素都按照各自的特性绘制一遍，于是页面的内容出现了，这个过程叫做repaint

#### 避免过分重绘(Repaints)

当元素改变的时候，将不会影响元素在页面当中的位置（比如 background-color, border-color, visibility），浏览器仅仅会应用新的样式重绘此元素，此过程称为 Repaint。

常见的重绘元素 |   |   |  
-- | -- | -- | --
color | border-style | visibility | background
text-decoration | background-image | background-position | background-repeat
outline-color | outline | outline-style | border-radius
outline-width | box-shadow | background-size

#### 优化动画
css3 动画是优化的重中之重。除了做到上面两点，减少 Reflow 和 Repaints 之外，还需要注意以下方面。

启用 GPU 硬件加速

GPU（Graphics Processing Unit） 是图像处理器。GPU 硬件加速是指应用 GPU 的图形性能对浏览器中的一些图形操作交给 GPU 来完成，因为 GPU 是专门为处理图形而设计，所以它在速度和能耗上更有效率。
GPU 加速可以不仅应用于3D，而且也可以应用于2D。这里， GPU 加速通常包括以下几个部分：Canvas2D，布局合成（Layout Compositing）, CSS3转换（transitions），CSS3 3D变换（transforms），WebGL和视频(video)。

```css
/*
 * 根据上面的结论
 * 将 2d transform 换成 3d
 * 就可以强制开启 GPU 加速
 * 提高动画性能
 */
div {
  transform: translate(10px, 10px);
}
div {
  transform: translate3d(10px, 10px, 0);
}
```

需要注意的是，开启硬件加速相应的也会有额外的开销，参见这篇文章 [CSS 硬件加速的好与坏
](http://efe.baidu.com/blog/hardware-accelerated-css-the-nice-vs-the-naughty/)

### CSS盒模型详解

CSS的盒模型是CSS的基础，同时也是难点，这个问题经常在面试中会被问到，属于经典问题了。很多博客里讲得也很模糊不清，于是，我在这里重新整理一下。

可以认为每个html标签都是一个方块，然后这个方块又包着几个小方块，如同盒子一层层的包裹着，这就是所谓的盒模型。

盒模型分为IE盒模型和W3C标准盒模型。
IE盒模型和W3C标准盒模型的区别是什么？

1. W3C 标准盒模型：

属性width,height只包含内容content，不包含border和padding。

2. IE 盒模型：

属性width,height包含border和padding，指的是content+padding+border。

在ie8+浏览器中使用哪个盒模型可以由box-sizing(CSS新增的属性)控制，默认值为content-box，即标准盒模型；如果将box-sizing设为border-box则用的是IE盒模型。如果在ie6,7,8中DOCTYPE缺失会触发IE模式。在当前W3C标准中盒模型是可以通过box-sizing自由的进行切换的。

```
content-box（标准盒模型）
width = 内容的宽度
height = 内容的高度
```

```
border-box（IE盒模型）
width = border + padding + 内容的宽度
height = border + padding + 内容的高度
```

谷歌浏览器，按下F12，然后把右边栏的滚动条拉到最下面你就会看到一个东西：

![浏览器盒子模型](https://user-gold-cdn.xitu.io/2017/10/25/9cb491d4bd5d326aeb16632280411283?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

资料来源：

1. [CSS盒模型详解](https://juejin.im/post/59ef72f5f265da4320026f76?utm_medium=fe&utm_source=weixinqun)
2. [减少reflow对性能的影响的建议](http://caibaojian.com/css-reflow-repaint.html)
