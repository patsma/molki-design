<script setup>
defineProps({
  isMobile: {
    type: Boolean,
    default: false,
  },
});

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
</script>

<template>
  <nav class="nav-menu" :class="{ mobile: isMobile }">
    <div v-for="item in menuItems" :key="item.label" class="nav-menu__item">
      <NuxtLink
        :to="item.link"
        class="nav-menu__link"
        :class="{ 'nav-menu__link--has-children': item.children }"
      >
        {{ item.label }}
      </NuxtLink>

      <div v-if="item.children" class="nav-menu__item-submenu">
        <NuxtLink
          v-for="child in item.children"
          :key="child.label"
          :to="child.link"
          class="nav-menu__link"
        >
          {{ child.label }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
