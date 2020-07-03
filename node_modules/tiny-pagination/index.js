/**
 * 简单快速生成页码列表信息
 * @author tofishes
 * @param  {Number} page      当前页码数
 * @param  {Number} total     总页码数
 * @param  {Number} linkCount 中间显示几个页码，默认5
 * @return {[type]}           返回页码信息对象
 */
function pagination(page = 1, total = 1, linkCount = 5) {
  let start = Math.max(1, page - parseInt(linkCount / 2, 10));
  const end = Math.min(total, start + linkCount - 1);
  start = Math.max(1, end - linkCount + 1);

  const first = 1;
  const last = total;
  const prev = Math.max(page - 1, first);
  const next = Math.min(page + 1, last);
  const showFirst = start !== first;
  const showPrev = page > first;
  const showNext = page < last;
  const showLast = end !== total;
  const show = total !== 1;
  const length = Math.min(total, linkCount);
  const pageList = Array.apply(null, { length }).map((v, i) => i + start);

  return {
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
  };
}

module.exports = pagination;
