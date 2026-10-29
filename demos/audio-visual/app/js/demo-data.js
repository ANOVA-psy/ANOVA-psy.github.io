/* 示例记录：给静态演示用的假被试数据
 *
 * 真实系统里这些数据来自被试实际做完一次测验后写入 localStorage。
 * 静态站点没有后端也没有被试，为了让结果页 / 历史页能显示完整界面，这里塞一条示例记录。
 * 阈值与 R² 是设定值，散点由同一条 logistic 生成 —— 它不是任何人的真实测量结果。
 */
(function () {
  "use strict";

  var KEY = 'audioVisualTrainingData';
  try {
    var exist = localStorage.getItem(KEY);
    if (exist && JSON.parse(exist).length) return;
  } catch (e) {
    return;
  }

  var ALPHA = -5.777, BETA = 1, GAMMA = 0.25, LAMBDA = 0.02;
  function p(x) {
    return GAMMA + (1 - GAMMA - LAMBDA) / (1 + Math.exp(-BETA * (x - ALPHA)));
  }

  var points = [];
  for (var x = -10; x <= 0; x += 2) {
    points.push({ x: x, y: Math.round(p(x) * 100) / 100, n: 20 });
  }

  // 40 个试次：SNR 沿阶梯上下走，正误按曲线概率铺开
  var snrs = [-2, -2, -3, -4, -3, -5, -4, -6, -5, -7, -6, -5, -4, -5, -3, -4,
              -2, -3, -4, -5, -6, -5, -4, -3, -4, -5, -6, -7, -6, -5,
              -4, -3, -2, -3, -4, -5, -4, -5, -6, -5];
  var results = snrs.map(function (snr, i) {
    var q = p(snr);
    // 用固定的伪随机序列，保证每次打开看到的图一样
    var r = Math.abs(Math.sin((i + 1) * 12.9898) * 43758.5453) % 1;
    return {
      trial: i + 1,
      snr: snr,
      correct: r < q,
      rt: 620 + Math.round((Math.abs(Math.cos(i * 7.13)) * 900)),
      timestamp: Date.now() - (40 - i) * 4000
    };
  });

  var record = {
    id: 'demo-sample-1',
    metadata: {
      subjectId: 'P001（示例）',
      gender: '未填',
      age: null,
      func: 1,
      phase: 'post',
      threshold: -5.0,
      timestamp: Date.now() - 86400000,
      duration: 612000
    },
    psychometricFit: {
      alpha: ALPHA, beta: BETA, gamma: GAMMA, lambda: LAMBDA,
      threshold: -5.0,
      r2: 0.89,
      data: points
    },
    results: results
  };

  try {
    localStorage.setItem(KEY, JSON.stringify([record]));
  } catch (e) {}
})();
