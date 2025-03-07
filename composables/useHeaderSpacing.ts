import { computed, ComputedRef } from 'vue';

/**
 * Composable to handle header spacing logic
 * By default, adds spacing unless headerSpacing is explicitly set to false
 *
 * @param pageData - The page data object from useAsyncData
 * @returns computed boolean determining if header spacing should be applied
 */
export const useHeaderSpacing = (pageData: any): ComputedRef<boolean> => {
  // Determine if header spacing should be applied
  // Default is true - add spacing unless explicitly disabled
  return computed(() => {
    // If no page data is available, no spacing by default
    if (!pageData.value) return false;

    // If headerSpacing is explicitly set to false, don't add spacing
    // Otherwise add spacing by default
    return pageData.value?.headerSpacing !== false;
  });
};
