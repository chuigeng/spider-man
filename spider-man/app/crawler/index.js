'use strict';

/**
 * [router url 规则和 crawler 名称映射]
 * pattern - url 正则匹配规则
 * crawler - 爬取者
 */
let router = [
  { pattern: '/', crawler: 'item'}
];


// 提取 url 中的内容
// 根据 url 的不同，分配给不同的 crawler
// 先根据 url 的一级域名找到 crawler 的爷爷级目录，然后根据 url 的 host 找到 crawler 的父级目录
// 最后根据 router 进行规则匹配，交给第一个匹配到的处理器
exports.work = function* (url) {

  // 根据 URL 分配给不同的爬取者
};