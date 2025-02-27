<script setup lang="ts">
import { inject, Ref, computed } from 'vue'
import { useData } from 'vitepress'
import { useSidebar } from 'vitepress/theme'

import { usePageId } from '../composables'

const DEV = inject<Ref<boolean>>('DEV')
const { theme } = useData()
const { footer, visitor } = theme.value

const { hasSidebar } = useSidebar()
const pageId = usePageId()

const isDocFooterVisible = computed(() => {
  return !DEV || footer.message || footer.copyright || visitor?.badgeId
})
</script>

<template>
  <div v-if="isDocFooterVisible" v-show="hasSidebar" class="m-doc-footer">
    <div class="m-doc-footer-message">
      <img
        v-if="!DEV && visitor"
        class="visitor"
        :src="`https://visitor-badge.laobi.icu/badge?page_id=${visitor.badgeId}.${pageId}`"
        title="当前页面累计访问数"
        onerror="this.style.display='none'"
        loading="lazy"
      />
      <img src="/icons/beian.png" alt="logo" class="logo" />
      <p v-if="footer?.message" v-html="footer.message" class="m-doc-footer-message-text"></p>
    </div>
    <p class="m-doc-footer-copyright" v-if="footer?.copyright">
      {{ footer.copyright }}
    </p>
  </div>
</template>

<style scoped>
.m-doc-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
  border-top: 1px solid var(--vp-c-gutter);
  padding: 32px 24px 0;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.m-doc-footer-message,
.m-doc-footer-copyright {
  display: flex;
  align-items: center;
  justify-content: center;
}

.m-doc-footer-message-text {
  margin-left: 8px;
}

@media (max-width: 768px) {
  .m-doc-footer-message,
  .m-doc-footer-copyright {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
  }

  .m-doc-footer-message-text {
    font-size: 10px;
    margin-left: 8px;
  }

}

.visitor {
  margin-right: 8px;
  max-height: 16px;
}

.logo {
  height: 10px;
  width: 10px;
}

@media (max-width: 414px) {
  .visitor {
    display: none;
  }

  .logo {
    height: 8px;
    width: 8px;
  }

  .m-doc-footer {
    padding: 16px 12px 0;
  }

  .m-doc-footer-message-text {
    font-size: 8px;
  }
}
</style>
