<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore';
import { useRouter } from 'vue-router';
import { useScrollHeader } from '@/composables/useScrollHeader';
import DropdownArrow from './DropdownArrow.vue';
import { watch, onMounted } from 'vue';

const props = defineProps<{
  isMobile: boolean;
}>();

const menuStore = useMenuStore();
const router = useRouter();
const { activeSection } = useScrollHeader();

const menuItems = [
  {
    label: 'O NAS',
    link: '/buttons',
  },
  {
    label: 'PROJEKT WNĘTRZA',
    link: '/#spacer1',
    children: [
      { label: 'REALIZACJE', link: '#projekty-realizacje' },
      { label: 'CENNIK', link: '#cennik-projekt' },
    ],
  },
  {
    label: 'REMONT POD KLUCZ',
    link: '/buttons/#spacer2',
    children: [
      { label: 'REALIZACJE', link: '#remont-pod-klucz-realizacje' },
      { label: 'CENNIK', link: '#remonty-cennik' },
    ],
  },
  {
    label: 'DLA BIZNESU',
    link: '/#spacer3',
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
  if (props.isMobile) {
    menuStore.toggleDropdown(index);
  }
};

// Debug initial value
onMounted(() => {
  if (process.client) {
    console.log('🔍 MainMenu - Initial Active Section:', activeSection.value);
  }
});

// Add a helper function
const normalizeLink = (link: string) => {
  return link.replace('/#', '').replace('#', '').replace('/', '');
};

// Update the watch for debugging
watch(activeSection, (newVal) => {
  console.log('🔍 MainMenu - Active Section changed:', newVal);

  // Find menu item that should be active
  const activeItem = menuItems.find((item) => newVal === normalizeLink(item.link));

  if (activeItem) {
    console.log('🎯 Should activate menu item:', {
      label: activeItem.label,
      link: activeItem.link,
      normalizedLink: normalizeLink(activeItem.link),
      activeSection: newVal,
    });
  }
});
</script>

<template>
  <nav class="nav-menu" :class="{ mobile: props.isMobile }">
    <div v-for="(item, index) in menuItems" :key="item.label" class="nav-menu__item">
      <a
        :href="item.link"
        :class="[
          'nav-menu__link',
          {
            'nav-menu__link--has-children': item.children,
            'nav-menu__link--active': activeSection === normalizeLink(item.link),
          },
        ]"
        @click="(e) => handleClick(e, item.link, !!item.children, index)"
      >
        {{ item.label }}
        <DropdownArrow
          v-if="item.children"
          :is-active="menuStore.activeDropdownId === `dropdown-${index}`"
          @click="(e) => handleArrowClick(e, index)"
        />
      </a>

      <div v-if="item.children" class="nav-menu__item-submenu">
        <NuxtLink
          v-for="child in item.children"
          :key="child.label"
          :to="child.link"
          class="nav-menu__link"
          :class="{ 'nav-menu__link--active': activeSection === child.link.replace('#', '') }"
          @click="(e) => handleClick(e, child.link, false, index)"
        >
          {{ child.label }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
