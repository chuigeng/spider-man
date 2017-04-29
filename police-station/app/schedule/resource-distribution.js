'use strict';

// 任务执行的时间间隔，单位毫秒
const interval = 1000;
// 任务执行的方式，worker - 单个 worker 执行 / all - 每个 worker 都执行；暂时不采用 all 的方式避免出现并发问题
const type = 'worker';
// 每次拉取的任务数量
const resourceAmount = 10;

// resource 分为几类: 1. 等待处理的 2. 处理中的  3. 已经处理完成的 4. 丢弃的 5. 失败的，等待重试的

module.exports = {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  schedule: {
    interval: 1000,
    type: 'worker',
  },
  // task 是真正定时任务执行时被运行的函数，第一个参数是一个匿名的 Context 实例
  * task(ctx) {

    // TODO 获取 resource
    let activatedResources = getActivatedResources({
      limit: resourceAmount
    });

    // 提交给 spider-man 处理
    for (let activatedResource of activatedResources) {
      // TODO
      distributeToSpiderMan(activatedResource);
    }
  },
};