<script setup lang="ts">
import { useMenuStore } from "@/stores/menuStore";
import { useRouter } from "vue-router";

const props = defineProps<{
  isMobile: boolean;
}>();

const menuStore = useMenuStore();
const router = useRouter();

const menuItems = [
  {
    label: "O NAS",
    link: "/buttons",
    children: [{ label: "NASZ TEAM", link: "#nasz-team" }],
  },
  {
    label: "PROJEKT WNĘTRZA",
    link: "#",
    children: [
      { label: "REALIZACJE", link: "#projekty-realizacje" },
      { label: "CENNIK", link: "#cennik-projekt" },
    ],
  },
  {
    label: "REMONT POD KLUCZ",
    link: "#",
    children: [
      { label: "REALIZACJE", link: "#remont-pod-klucz-realizacje" },
      { label: "CENNIK", link: "#remonty-cennik" },
    ],
  },
  {
    label: "DLA BIZNESU",
    link: "#",
    children: [{ label: "REALIZACJE", link: "#realizacje-dla-biznesu" }],
  },
  {
    label: "BLOG",
    link: "#blog",
  },
];

const handleClick = async (event: MouseEvent, link: string) => {
  event.preventDefault();
  await menuStore.handleMenuItemClick(link, router);
};
</script>

<template>
  <nav class="nav-menu" :class="{ mobile: props.isMobile }">
    <div v-for="item in menuItems" :key="item.label" class="nav-menu__item">
      <a
        :href="item.link"
        class="nav-menu__link"
        :class="{ 'nav-menu__link--has-children': item.children }"
        @click="(e) => handleClick(e, item.link)"
      >
        {{ item.label }}
      </a>

      <div v-if="item.children" class="nav-menu__item-submenu">
        <NuxtLink
          v-for="child in item.children"
          :key="child.label"
          :to="child.link"
          class="nav-menu__link"
          @click="(e) => handleClick(e, child.link)"
        >
          {{ child.label }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
