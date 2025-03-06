<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore';
import { useRouter, useRoute } from 'vue-router';
import DropdownArrow from './DropdownArrow.vue';

const props = defineProps<{
  isMobile: boolean;
}>();

const menuStore = useMenuStore();
const router = useRouter();
const route = useRoute();

/**
 * Checks if the menu item exactly matches the current route
 * For parent items, this is a direct match only (not based on children)
 */
const isMenuItemActive = (item: { link: string }) => {
  return item.link !== '#' && route.path === item.link;
};

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
  if (props.isMobile) {
    menuStore.toggleDropdown(index);
  }
};
</script>

<template>
  <nav class="nav-menu" :class="{ mobile: props.isMobile }">
    <div v-for="(item, index) in menuStore.menuItems" :key="item.label" class="nav-menu__item">
      <a
        :href="item.link"
        class="nav-menu__link"
        :class="{
          'nav-menu__link--has-children': item.children,
          '!text-primary': isMenuItemActive(item),
        }"
        @click="(e: MouseEvent) => handleClick(e, item.link, !!item.children, index)"
      >
        {{ item.label }}
        <DropdownArrow
          v-if="item.children"
          :is-active="menuStore.activeDropdownId === `dropdown-${index}`"
          @click="(e: MouseEvent) => handleArrowClick(e, index)"
        />
      </a>

      <div v-if="item.children" class="nav-menu__item-submenu">
        <NuxtLink
          v-for="child in item.children"
          :key="child.label"
          :to="child.link"
          class="nav-menu__link"
          :class="{
            '!text-primary': route.path === child.link,
          }"
          @click="(e: MouseEvent) => handleClick(e, child.link, false, index)"
        >
          {{ child.label }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
