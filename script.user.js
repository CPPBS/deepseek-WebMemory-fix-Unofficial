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

    const FIVE_MINUTES = 300000;
    const DEBUG = false;
    let flag = false;

    // 延迟1秒执行以确保页面元素加载完成
    setTimeout(function() {
        // 首次检查
        checkAndPrompt();

        // 设置定时器
        setInterval(checkAndPrompt, FIVE_MINUTES);
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
