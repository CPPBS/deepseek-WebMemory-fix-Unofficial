// Copyright (c) 2026 CPPBS & planets-online[力大砖飞科技（韶关市）有限公司]
// url planets-online.com
// ==UserScript==
// @name         deepseek内存溢出问题[临时解决方案]
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  检测内存，满了提示刷新
// @match        https://chat.deepseek.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 配置常量
    const REAL_TIME_INTERVAL = 30000; // 实时监测间隔：30秒
    const FALLBACK_INTERVAL = 300000; // 降级监测间隔：5分钟
    const DEBUG = false;              // 调试模式开关

    // 状态变量
    let flag = false;                 // 提示是否已显示
    let checkInterval = null;         // 定时器引用

    // 根据API可用性选择监测间隔
    const memoryApiAvailable = !!(window.performance && performance.memory);
    const CHECK_INTERVAL = memoryApiAvailable ? REAL_TIME_INTERVAL : FALLBACK_INTERVAL;

    // 延迟1秒执行以确保页面元素加载完成
    setTimeout(function() {
        // 首次检查
        checkAndPrompt();

        // 设置定时器（根据API可用性智能选择间隔）
        setInterval(checkAndPrompt, CHECK_INTERVAL);
    }, 1000);

    function checkAndPrompt() {
        if (flag) return;

        if (window.performance?.memory) {
            const mem = performance.memory;
            const usage = mem.usedJSHeapSize / mem.jsHeapSizeLimit;

            if (usage > 0.75 || DEBUG) {
                showPrompt();
                flag = true;
            }
        } else {
            if (DEBUG) {
                showPrompt();
                flag = true;
            }
        }
    }

    function showPrompt() {
        const targetElement = document.querySelector('div._0fcaa63');

        const promptContent = document.createElement('span');
        promptContent.innerHTML = '内存将满，建议刷新 <button style="font-size:11px; border:none; padding:0; margin:0; background:yellow; color:red; cursor:pointer;" onclick="location.reload()">刷新</button> <button style="font-size:11px; border:none; padding:0; margin:0; background:yellow; color:red; cursor:pointer;" onclick="this.parentNode.remove(); flag = false;">稍后</button>';

        promptContent.style.cssText = `
            display: inline-block;
            background: #fff;
            font-size: 11px;
            color:red;
        `;

        targetElement.appendChild(promptContent);
    }
})();
