<template>
  <footer class="site-footer">
    <div class="footer-nav">
      <a href="#">猎猎杰</a>
      <span>|</span>
      <a href="#">用户协议</a>
      <span>|</span>
      <a href="#">隐私政策</a>
      <span>|</span>
      <a href="#">商务合作</a>
      <span>|</span>
      <a href="#">广告合作</a>
      <span>|</span>
      <a href="#">友情链接</a>
      <span>|</span>
      <a href="#">更多</a>
      <span>|</span>
      <a href="#">下载猎猎杰APP</a>

      <span class="footer-right">
        猎猎杰科技有限公司
        <span>违法和不良信息举报：400-888-6666</span>
        <a href="#">举报邮箱：jubao@lieliejie.com</a>
      </span>
    </div>
  </footer>
</template>

<script setup>

</script>

<style scoped>
.site-footer {
  width: 100%;
  background: var(--bg-color);
  border-top: 1px solid var(--border-color);
  transition: background 0.3s, border-color 0.3s;
}
.footer-nav {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 24px;
  font-size: 12px;
  color: var(--text-muted);
  overflow-x: auto;
  white-space: nowrap;
}
.footer-nav a {
  text-decoration: none;
  color: var(--text-muted);
}
.footer-nav a:hover {
  color: var(--primary-color);
}
.footer-nav span:not(.footer-right span) {
  color: var(--border-color);
}
.footer-right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}
.footer-right a:hover {
  color: var(--primary-color);
}
</style>
