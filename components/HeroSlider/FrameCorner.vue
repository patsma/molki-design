<script setup lang="ts">
defineProps<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}>();
</script>

<template>
  <div
    class="frame-corner absolute"
    :class="{
      'top-0 left-0': position === 'top-left',
      'top-0 right-0': position === 'top-right',
      'bottom-0 left-0': position === 'bottom-left',
      'bottom-0 right-0': position === 'bottom-right',
    }"
  >
    <!-- Top Left Frame -->
    <svg
      v-if="position === 'top-left'"
      width="140"
      height="138"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="w-[140px] h-[138px]"
    >
      <path stroke="url(#frame-tl-1)" stroke-width="2" d="M115 14H15" />
      <path stroke="url(#frame-tl-2)" stroke-width="2" d="M14 113V13" />
      <path stroke="url(#frame-tl-3)" stroke-width="2" d="M140 1H2" />
      <path stroke="url(#frame-tl-4)" stroke-width="2" d="M1 138V0" />
      <defs>
        <linearGradient
          id="frame-tl-1"
          x1="115"
          y1="12.5"
          x2="15"
          y2="12.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B76246" />
          <stop offset=".5" stop-color="#D0835F" />
          <stop offset="1" stop-color="#A04225" />
        </linearGradient>
        <linearGradient
          id="frame-tl-2"
          x1="15.5"
          y1="113"
          x2="15.5"
          y2="13"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B76246" />
          <stop offset=".5" stop-color="#D0835F" />
          <stop offset="1" stop-color="#A04225" />
        </linearGradient>
        <linearGradient
          id="frame-tl-3"
          x1="140"
          y1="-.5"
          x2="2"
          y2="-.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B76246" />
          <stop offset=".5" stop-color="#D0835F" />
          <stop offset="1" stop-color="#A04225" />
        </linearGradient>
        <linearGradient
          id="frame-tl-4"
          x1="2.5"
          y1="138"
          x2="2.5"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B76246" />
          <stop offset=".5" stop-color="#D0835F" />
          <stop offset="1" stop-color="#A04225" />
        </linearGradient>
      </defs>
    </svg>

    <!-- Bottom Right Frame -->
    <svg
      v-if="position === 'bottom-right'"
      width="140"
      height="138"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="w-[140px] h-[138px]"
    >
      <path stroke="url(#frame-br-1)" stroke-width="2" d="M25 124h100" />
      <path stroke="url(#frame-br-2)" stroke-width="2" d="M126 25v100" />
      <path stroke="url(#frame-br-3)" stroke-width="2" d="M0 137h138" />
      <path stroke="url(#frame-br-4)" stroke-width="2" d="M139 0v138" />
      <defs>
        <linearGradient
          id="frame-br-1"
          x1="25"
          y1="125.5"
          x2="125"
          y2="125.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B76246" />
          <stop offset=".5" stop-color="#D0835F" />
          <stop offset="1" stop-color="#A04225" />
        </linearGradient>
        <linearGradient
          id="frame-br-2"
          x1="124.5"
          y1="25"
          x2="124.5"
          y2="125"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B76246" />
          <stop offset=".5" stop-color="#D0835F" />
          <stop offset="1" stop-color="#A04225" />
        </linearGradient>
        <linearGradient
          id="frame-br-3"
          x1="0"
          y1="138.5"
          x2="138"
          y2="138.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B76246" />
          <stop offset=".5" stop-color="#D0835F" />
          <stop offset="1" stop-color="#A04225" />
        </linearGradient>
        <linearGradient
          id="frame-br-4"
          x1="137.5"
          y1="0"
          x2="137.5"
          y2="138"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B76246" />
          <stop offset=".5" stop-color="#D0835F" />
          <stop offset="1" stop-color="#A04225" />
        </linearGradient>
      </defs>
    </svg>

    <!-- Top Right Frame (mirrored top-left) -->
    <svg
      v-if="position === 'top-right'"
      width="140"
      height="138"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="w-[140px] h-[138px] scale-x-[-1]"
    >
      <path stroke="url(#frame-tr-1)" stroke-width="2" d="M115 14H15" />
      <path stroke="url(#frame-tr-2)" stroke-width="2" d="M14 113V13" />
      <path stroke="url(#frame-tr-3)" stroke-width="2" d="M140 1H2" />
      <path stroke="url(#frame-tr-4)" stroke-width="2" d="M1 138V0" />
      <defs>
        <linearGradient
          id="frame-tr-1"
          x1="115"
          y1="12.5"
          x2="15"
          y2="12.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B76246" />
          <stop offset=".5" stop-color="#D0835F" />
          <stop offset="1" stop-color="#A04225" />
        </linearGradient>
        <linearGradient
          id="frame-tr-2"
          x1="15.5"
          y1="113"
          x2="15.5"
          y2="13"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B76246" />
          <stop offset=".5" stop-color="#D0835F" />
          <stop offset="1" stop-color="#A04225" />
        </linearGradient>
        <linearGradient
          id="frame-tr-3"
          x1="140"
          y1="-.5"
          x2="2"
          y2="-.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B76246" />
          <stop offset=".5" stop-color="#D0835F" />
          <stop offset="1" stop-color="#A04225" />
        </linearGradient>
        <linearGradient
          id="frame-tr-4"
          x1="2.5"
          y1="138"
          x2="2.5"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B76246" />
          <stop offset=".5" stop-color="#D0835F" />
          <stop offset="1" stop-color="#A04225" />
        </linearGradient>
      </defs>
    </svg>

    <!-- Bottom Left Frame (mirrored bottom-right) -->
    <svg
      v-if="position === 'bottom-left'"
      width="140"
      height="138"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="w-[140px] h-[138px] scale-x-[-1]"
    >
      <path stroke="url(#frame-bl-1)" stroke-width="2" d="M25 124h100" />
      <path stroke="url(#frame-bl-2)" stroke-width="2" d="M126 25v100" />
      <path stroke="url(#frame-bl-3)" stroke-width="2" d="M0 137h138" />
      <path stroke="url(#frame-bl-4)" stroke-width="2" d="M139 0v138" />
      <defs>
        <linearGradient
          id="frame-bl-1"
          x1="25"
          y1="125.5"
          x2="125"
          y2="125.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B76246" />
          <stop offset=".5" stop-color="#D0835F" />
          <stop offset="1" stop-color="#A04225" />
        </linearGradient>
        <linearGradient
          id="frame-bl-2"
          x1="124.5"
          y1="25"
          x2="124.5"
          y2="125"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B76246" />
          <stop offset=".5" stop-color="#D0835F" />
          <stop offset="1" stop-color="#A04225" />
        </linearGradient>
        <linearGradient
          id="frame-bl-3"
          x1="0"
          y1="138.5"
          x2="138"
          y2="138.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B76246" />
          <stop offset=".5" stop-color="#D0835F" />
          <stop offset="1" stop-color="#A04225" />
        </linearGradient>
        <linearGradient
          id="frame-bl-4"
          x1="137.5"
          y1="0"
          x2="137.5"
          y2="138"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B76246" />
          <stop offset=".5" stop-color="#D0835F" />
          <stop offset="1" stop-color="#A04225" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>
