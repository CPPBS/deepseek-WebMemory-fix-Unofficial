# DeepSeek WebMemory Fix (Unofficial)

## 项目简介 / Project Introduction

这是一个非官方的用户脚本，旨在缓解 DeepSeek 网页版在长时间使用后可能出现的浏览器内存占用过高问题。它会定时检查内存状况，并在必要时提供刷新建议，以帮助改善使用体验，避免页面卡顿或无响应。

This is an unofficial user script designed to address potential high browser memory usage that may occur after prolonged use of the DeepSeek web interface. It periodically checks memory status and provides refresh suggestions when necessary to help improve the experience and reduce page lag or unresponsiveness.

## 问题背景 / Background

DeepSeek 官方网页应用在长时间对话或复杂交互后，可能会因为内存累积而变得缓慢，甚至导致浏览器标签页崩溃，造成对话内容丢失。本脚本作为一个辅助工具，尝试在问题变得严重之前提醒用户。

## 解决方案 / Solution

该脚本通过注入到 DeepSeek 页面中，安静地在后台运行。它主要执行以下操作：

1.  **定时监测**：每 5 分钟检查一次当前页面的内存使用情况。
2.  **智能判断**：当检测到内存使用率超过预设的安全阈值时，脚本判定存在内存压力。
3.  **无感提示**：在页面底部以不太显眼的方式显示一个提示栏。
3.  **提供选择**：提示栏提供“立即刷新”和“稍后提醒”两个选项，将控制权完全交给用户。

## 安装与使用 / Installation & Usage

### 前提条件 / Prerequisites
你需要先在浏览器中安装一个用户脚本管理器扩展。
*   **Chrome/Edge/Opera 等 Chromium 内核浏览器**: 推荐安装 [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)。
*   **Firefox**: 推荐安装 [Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/) 或 [Greasemonkey](https://addons.mozilla.org/firefox/addon/greasemonkey/)。

### 安装步骤 / Installation Steps
1.  点击上方链接安装适合你浏览器的脚本管理器扩展。
2.  安装完成后，扩展图标通常会出现在浏览器工具栏中。
3.  访问本项目的代码页面，找到完整的 `script.user.js` 文件。
4.  脚本管理器通常会自动识别并弹出安装对话框，点击“安装”即可。

### 使用方法 / How to Use
安装完成后，脚本会在你访问 `https://chat.deepseek.com/` 时自动生效。你无需进行任何操作，脚本会在后台静默监测。当满足条件时，提示栏会自动出现。

## 技术实现 / Technical Implementation

脚本的核心是使用浏览器的 `performance.memory` API（目前主要适用于 Chromium 内核浏览器）来获取精确的内存使用数据。通过计算已用内存占总堆内存限制的比率，并与设定的阈值进行比较，从而决定是否触发提示。

为了不影响用户体验，脚本加入了用户活动检测机制。只有在一段时间内没有检测到用户的鼠标点击、键盘输入或页面滚动操作时，才会显示提示。

## 许可证 / License

本项目采用 **MIT 许可证** 发布。这是一种非常宽松的开源许可证，允许任何人自由地使用、复制、修改、合并、发布、分发、再许可和/或销售本软件的副本。

完整许可证文本请查看项目根目录下的 [LICENSE](LICENSE) 文件。

This project is licensed under the **MIT License**. This is a very permissive open-source license that allows anyone to freely use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software.

See the [LICENSE](LICENSE) file for the full text.

## 注意事项 / Important Notes

*   **非官方性质**：此脚本完全由社区开发者创建和维护，与 DeepSeek 官方无关。DeepSeek 是深度求索公司的产品。
*   **兼容性**：脚本主要依赖的 `performance.memory` API 在 Firefox 等浏览器中可能受限或不可用。在这种情况下，脚本的监测功能可能无法正常工作。
*   **免责声明**：此脚本按“原样”提供，作者不承担任何因使用此脚本而产生的数据丢失、浏览器问题或其他任何形式的风险或损害。在使用前，建议您了解其工作原理。
*   **数据与隐私**：本脚本仅在当前浏览器标签页的本地运行，**不会**收集、存储或传输任何用户的个人数据、对话内容或浏览历史到任何远程服务器。

## 贡献与反馈 / Contribution & Feedback

欢迎通过 GitHub 的 Issues 页面提交问题或功能建议。如果你有改进代码的想法，也欢迎提交 Pull Request。

---

**Copyright (c) 2026 CPPBS of planets-online (力大砖飞科技（韶关市）有限公司)**
