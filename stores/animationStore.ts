import { defineStore } from 'pinia';

export const useAnimationStore = defineStore('animation', {
  state: () => ({
    animations: new Map(),
    isReady: false,
    debug: process.env.NODE_ENV === 'development',
  }),
  

  getters: {
    activeAnimations: (state) => state.animations.size,
  },

  actions: {
    log(message: string, data?: any) {
      if (this.debug) {
        console.log(`[AnimationStore] ${message}`, data || '');
      }
    },

    register(id: string, timeline: any) {
      this.animations.set(id, timeline);
      this.log(`Registered animation: ${id}`, { total: this.activeAnimations });
    },

    play(id?: string) {
      if (id) {
        const tl = this.animations.get(id);
        if (tl) {
          tl.play();
          this.log(`Playing animation: ${id}`);
        } else {
          this.log(`Animation not found: ${id}`);
        }
      } else {
        this.log('Playing all animations');
        this.animations.forEach((tl, id) => {
          tl.play();
          this.log(`Playing: ${id}`);
        });
      }
    },

    pause(id?: string) {
      if (id) {
        const tl = this.animations.get(id);
        if (tl) {
          tl.pause();
          this.log(`Paused animation: ${id}`);
        }
      } else {
        this.log('Pausing all animations');
        this.animations.forEach((tl, id) => {
          tl.pause();
          this.log(`Paused: ${id}`);
        });
      }
    },

    reset(id?: string) {
      if (id) {
        const tl = this.animations.get(id);
        if (tl) {
          tl.pause();
          tl.progress(0);
          this.log(`Reset animation: ${id}`);
        }
      } else {
        this.log('Resetting all animations');
        this.animations.forEach((tl, id) => {
          tl.pause();
          tl.progress(0);
          this.log(`Reset: ${id}`);
        });
      }
    },

    playInView() {
      if (!process.client) return;

      this.log('Checking animations in view');
      let playedCount = 0;

      document.querySelectorAll('[data-scroll-section]').forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8;
        const id = `section_${index}`;
        const timeline = this.animations.get(id);

        if (isInView && timeline) {
          timeline.progress(0);
          timeline.play();
          playedCount++;
          this.log(`Playing in-view animation: ${id}`, {
            top: Math.round(rect.top),
            threshold: Math.round(window.innerHeight * 0.8),
          });
        }
      });

      this.log(`Played ${playedCount} animations in view`);
    },

    cleanup() {
      this.log('Cleaning up animations', { total: this.activeAnimations });
      this.animations.forEach((tl, id) => {
        tl.kill();
        this.log(`Killed animation: ${id}`);
      });
      this.animations.clear();
      this.isReady = false;
    },

    setReady(value: boolean) {
      this.isReady = value;
      this.log(`Animation system ${value ? 'ready' : 'not ready'}`);
    },
  },
});
