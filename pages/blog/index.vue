<template>
  <div>
    <LandingPageBanner :header="CustomTitle" />
    <BlogList />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import LandingPageBanner from '@/components/LandingPageBanner';
import BlogList from '@/components/blog/BlogList';
import { tagsData, headData } from '@/composables/MetaTags';

  // for seo
  const { titleFromAPI, descriptionFromAPI, headlineFromAPI, cssText } = await tagsData();
  useHead(headData(titleFromAPI, descriptionFromAPI, cssText));

  const CustomTitle = ref('Blog');

</script>
