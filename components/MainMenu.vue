<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore';
import { useRouter } from 'vue-router';

const props = defineProps<{
  isMobile: boolean;
}>();

const menuStore = useMenuStore();
const router = useRouter();

const menuItems = [
  {
    label: 'O NAS',
    link: '/buttons',
    children: [{ label: 'NASZ TEAM', link: '/buttons' }],
  },
  {
    label: 'PROJEKT WNĘTRZA',
    link: '#spacer1',
    children: [
      { label: 'REALIZACJE', link: '#projekty-realizacje' },
      { label: 'CENNIK', link: '#cennik-projekt' },
    ],
  },
  {
    label: 'REMONT POD KLUCZ',
    link: '#',
    children: [
      { label: 'REALIZACJE', link: '#remont-pod-klucz-realizacje' },
      { label: 'CENNIK', link: '#remonty-cennik' },
    ],
  },
  {
    label: 'DLA BIZNESU',
    link: '#',
    children: [{ label: 'REALIZACJE', link: '#realizacje-dla-biznesu' }],
  },
  {
    label: 'BLOG',
    link: '#blog',
  },
];

const handleClick = async (event: MouseEvent, link: string, hasChildren = false, index: number) => {
  event.preventDefault();

  // Don't do anything for parent items with '#' link on mobile
  if (props.isMobile && hasChildren && link === '#') {
    return;
  }

  // Only handle navigation, not dropdown toggling
  await menuStore.handleMenuItemClick(link, router, event);
};

const handleArrowClick = (event: MouseEvent, index: number) => {
  event.preventDefault();
  event.stopPropagation(); // Important to prevent parent click
  if (props.isMobile) {
    menuStore.toggleDropdown(index);
  }
};
</script>

<template>
  <nav class="nav-menu" :class="{ mobile: props.isMobile }">
    <div v-for="(item, index) in menuItems" :key="item.label" class="nav-menu__item">
      <a
        :href="item.link"
        class="nav-menu__link"
        :class="{ 'nav-menu__link--has-children': item.children }"
        @click="(e) => handleClick(e, item.link, !!item.children, index)"
      >
        {{ item.label }}
        <span
          v-if="item.children"
          class="dropdown-arrow"
          @click="(e) => handleArrowClick(e, index)"
        />
      </a>

      <div v-if="item.children" class="nav-menu__item-submenu">
        <NuxtLink
          v-for="child in item.children"
          :key="child.label"
          :to="child.link"
          class="nav-menu__link"
          @click="(e) => handleClick(e, child.link, false, index)"
        >
          {{ child.label }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
