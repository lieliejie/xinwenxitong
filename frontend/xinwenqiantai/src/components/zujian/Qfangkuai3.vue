<template>
  <footer class="site-footer">
    <p class="copyright">© 2026 猎猎杰</p>
    <div class="footer-links">
      <a href="#">关于我们</a>
      <span>|</span>
      <a href="#">联系我们</a>
      <span>|</span>
      <a href="#">用户协议</a>
      <span>|</span>
      <a href="#">隐私政策</a>
      <span>|</span>
      <a href="#">侵权举报</a>
      <span>|</span>
      <a href="#">有害信息举报</a>
      <span>|</span>
      <span>京ICP备12345678号</span>
      <span>|</span>
      <span>京公网安备 11000002002023号</span>
      <span>|</span>
      <span>网络文化经营许可证 京网文〔2026〕0001号</span>
    </div>
    <p class="copyright-tip">猎猎杰 —— 你的专属新闻资讯平台</p>
  </footer>
</template>

<script setup>

</script>

<style scoped>
.site-footer {
  width: 100%;
  padding: 30px 24px 40px;
  background: var(--card-bg);
  border-top: 1px solid var(--border-color);
  transition: background 0.3s, border-color 0.3s;
}
.copyright {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 16px;
  transition: color 0.3s;
}
.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 0;
  font-size: 12px;
  color: var(--text-muted);
  line-height: 2;
}
.footer-links a {
  text-decoration: none;
  color: var(--text-muted);
}
.footer-links a:hover {
  color: var(--primary-color);
}
.copyright-tip {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 16px;
}
</style>
