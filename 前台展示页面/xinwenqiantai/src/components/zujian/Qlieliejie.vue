<template>
  <Qdaohang></Qdaohang>
<div class="profile-page">
  <div class="profile-container">
    
    <div class="back-btn" @click="$router.back()">
      <svg class="back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
      <span>返回</span>
    </div>

    
    <div class="profile-header">
      <div class="header-bg"></div>
      <div class="avatar-section">
        <div class="avatar-ring">
          <div class="avatar">杰</div>
        </div>
        <h1 class="user-name">猎猎杰</h1>
        <p class="user-title">前端开发工程师</p>
        <div class="user-tags">
        <span class="utag">HTML</span>
        <span class="utag">CSS</span>
        <span class="utag">JavaScript</span>
        <span class="utag">Vue3</span>
        <span class="utag">TypeScript</span>
        <span class="utag">Node.js</span>

        </div>
      </div>

      
      <div class="contact-bar">
        <div class="contact-item">
          <span class="c-icon">&#9993;</span>
          <span>潍坊</span>
        </div>
        <div class="contact-item">
          <span class="c-icon">&#128197;</span>
          <span>2026.06</span>
        </div>
      </div>
    </div>

    
    <div class="section-card">
      <div class="section-title">
        <span class="st-dot"></span>
        工作职责
      </div>
      <div class="section-body">
        <ul class="duty-list">
          <li>完成 PC 端后台开发与样式调试，基于<strong>HTML5、CSS3、原生 JS</strong>实现页面布局、样式还原及基础交互，配合团队优化视觉体验与兼容性。</li>
          <li>参与 Vue3 项目开发，负责通用组件封装、页面模块拆分，实践组件化开发、父子组件通信技术方案。</li>
          <li>配合后端同事进行接口联调，使用 <strong>Axios</strong> 完成数据请求，简单接口封装，协助处理基础请求异常问题。</li>
          <li>负责项目日常 Bug 修复、页面改版、内容更新等基础工作，整理前端相关文档、静态资源，维护项目文件目录。</li>
          <li>参与项目打包构建流程，协助整理前端部署所需的静态资源与配置文件，配合团队完成上线前的准备工作。</li>
        </ul>
      </div>
    </div>

    
    <div class="section-card">
      <div class="section-title">
        <span class="st-dot st-dot-blue"></span>
        项目经验
      </div>
      <div class="section-body">
        <div class="tech-stack">
          <strong>技术栈：</strong>Vite + Vue Router + Pinia + Axios + Json-Server
        </div>
        <ul class="duty-list">
          <li>负责整体前端开发，使用 Vite 搭建项目，配置路由与路由守卫，实现页面权限控制。</li>
          <li>运用 Vue3 组合式 API、父子组件通信、自定义指令，完成页面与通用组件开发。</li>
          <li>封装 Axios 拦截器，处理请求异常；使用 Pinia 管理全局状态。</li>
          <li>对接模拟接口，完成登录、账号管理、新闻增删改、批操作等前业务功能。</li>
        </ul>
      </div>
    </div>

    
    <div class="section-card self-eval">
      <div class="section-title">
        <span class="st-dot st-dot-orange"></span>
        自我评价
      </div>
      <div class="section-body eval-content">
        本人是计算机应用技术应届毕业生，拥有近 10 个月前端实习经验。熟练掌握 HTML/CSS/JavaScript、Vue3 等主流前端技术。具备页面开发、组件封装、接口联调、Bug 修复等完整实操能力。熟悉前后端分离开发模式与团队开发规范。工作踏实细心，自主学习与问题排查能力良好，擅长团队协作。期望在前端岗位持续积累成长。
      </div>
    </div>

    
    <div class="profile-footer">
      <div class="footer-line"></div>
      <p class="footer-text">期待与你共事，共同创造价值</p>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import Qdaohang from './Qdaohang.vue';


</script>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }

.profile-page {
  width: 100%;
  background: var(--bg-color);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  transition: background 0.3s;
}


.back-btn {
  display: flex;
  align-items: center;
  padding: 8px 16px 8px 10px;
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-color);
  transition: all 0.25s;
  user-select: none;
  position: absolute;
  z-index: 1;
}

.back-btn:hover {
  background: var(--card-bg);
  box-shadow: var(--shadow);
  color: var(--primary-color);
  transform: translateX(-0.5px);
}

.back-btn:active {
  transform: translateX(-0.5px) scale(0.96);
}

.back-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.25s;
}

.back-btn:hover .back-icon {
  transform: translateX(-2px);
}

.profile-container {
  width: 100%;
  margin: 0 auto;
  position: relative;
  background: var(--card-bg);
  min-height: 100vh;
  transition: background 0.3s;
}


.profile-header {
  position: relative;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--border-color);
}

.header-bg {
  width: 100%;
  height: 160px;
  background: var(--primary-gradient);
  border-radius: 0 0 20px 20px;
  position: relative;
}

.header-bg::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(to top, var(--card-bg) 0%, transparent 100%);
}

.avatar-section {
  text-align: center;
  margin-top: -48px;
  position: relative;
  z-index: 2;
}

.avatar-ring {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: var(--primary-gradient);
  padding: 3px;
  display: inline-block;
  box-shadow: 0 4px 16px rgba(7, 193, 96, 0.35);
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--card-bg);
  color: var(--primary-color);
  font-size: 36px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-name {
  font-size: 26px;
  font-weight: 700;
  color: var(--text-color);
  margin-top: 14px;
  letter-spacing: 2px;
}

.user-title {
  font-size: 15px;
  color: var(--text-secondary);
  margin-top: 6px;
  transition: color 0.3s;
}

.user-tags {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 14px;
  flex-wrap: wrap;
}

.utag {
  padding: 4px 14px;
  background: var(--tag-bg);
  color: var(--primary-color);
  font-size: 12px;
  border-radius: 14px;
  font-weight: 500;
}


.contact-bar {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-top: 22px;
  flex-wrap: wrap;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-secondary);
}

.c-icon {
  font-size: 15px;
}


.section-card {
  margin-top: 28px;
  background: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.25s;
}

.section-card:hover {
  box-shadow: var(--shadow-hover);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
  padding: 18px 24px 0;
}

.st-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--primary-color);
  flex-shrink: 0;
}

.st-dot-blue { background: var(--info-color); }
.st-dot-orange { background: var(--warning-color); }

.section-body {
  padding: 14px 24px 22px;
  font-size: 15px;
  color: var(--text-color);
  line-height: 1.85;
  transition: color 0.3s;
}


.duty-list {
  list-style: none;
  padding-left: 0;
}

.duty-list li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 14px;
  line-height: 1.85;
  font-size: 15px;
  color: var(--text-color);
}

.duty-list li:last-child {
  margin-bottom: 0;
}

.duty-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--primary-color);
  opacity: 0.65;
}

.duty-list li strong {
  color: var(--text-color);
  font-weight: 600;
}


.tech-stack {
  padding: 12px 16px;
  background: var(--tag-bg);
  border-radius: 8px;
  border-left: 3px solid var(--info-color);
  margin-bottom: 14px;
  font-size: 14px;
  color: var(--text-color);
}

.tech-stack strong {
  color: var(--info-color);
}


.self-eval .eval-content {
  padding: 18px 22px;
  background: var(--warning-bg);
  border-radius: 10px;
  border-left: 3px solid var(--warning-color);
  color: var(--text-color);
  font-size: 15px;
  line-height: 2;
  text-indent: 2em;
}


.profile-footer {
  margin-top: 48px;
  text-align: center;
}

.footer-line {
  width: 48px;
  height: 3px;
  background: var(--primary-gradient);
  border-radius: 2px;
  margin: 0 auto 16px;
}

.footer-text {
  font-size: 14px;
  color: var(--text-muted);
  letter-spacing: 3px;
}
</style>
