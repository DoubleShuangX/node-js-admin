# tiny-pagination
简单而快速的得到分页信息。

该模块仅是为了生成基本分页信息，而不会去生成相应的html。根据生成的分页信息，自行处理分页展示。

## pageInfo组成结构

```
{
  first,      // 第一页，值为 1
  last,       // 最后一页，值为 总页数
  prev,       // 当前页码的上一页页码
  next,       // 当前页码的下一页页码
  show,       // 是否显示页码，当总页数为1的时候，为false
  showPrev,   // 是否显示上一页
  showNext,   // 是否显示下一页
  showFirst,  // 是否显示第一页
  showLast,   // 是否显示最后一页
  pageList,   // 中间页码列表，例如总页数为30，当前页码为9，中间页码显示5个，则pageList为[7, 8, 9, 10, 11]
  page        // 当前页码
}
```

## usage用法
```
const pagination = require('tiny-pagination');

// 假设当前页码为 10，总页数为 30，中间显示页码数为 7
const pageInfo = pagination(10, 30, 7);

// 得到pageInfo后，自行根据pageInfo.pageList循环输出页码。
```