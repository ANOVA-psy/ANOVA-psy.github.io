/* 静态演示用的最小垫片
 *
 * 原系统在真实运行时依赖 Node 后端与本地音视频素材：
 *   - js/preloader.js 会把 7 个媒体文件写进 Cache API，并在页头挂一条"实验材料已缓存"横幅
 *   - dataManager / app.js 会向 /api/* 取配置与历史
 * 静态托管没有这些资源，横幅会显示"7 个文件失败"，接口会 404。
 * 这里用等价接口的空实现替掉，让真实界面照常显示，不伪造任何"已完成"的状态。
 */
(function () {
  "use strict";

  window.Preloader = {
    isReady: function () { return true; },
    getStatus: function () { return { loaded: 0, total: 0, failed: 0, isComplete: true }; },
    waitForReady: function () { return Promise.resolve(true); },
    startPreload: function () { return Promise.resolve(true); },
    showCacheHint: function () { /* 静态演示不提示缓存 */ }
  };

  // 演示环境没有后端：把 /api/* 的请求短路成空响应，避免控制台刷 404
  var realFetch = window.fetch;
  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    if (/\/api\//.test(url)) {
      return Promise.resolve(new Response('{}', {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }));
    }
    return realFetch.apply(this, arguments);
  };
})();
