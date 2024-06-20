<template>
    <div>
        <LandingPageBanner v-show="showHeader" :header="headline" />
        <div v-if="ready">
            <client-only>
                <div v-for="(section, i) in sections" :key="i">
                    <component
                        :is="dynaimcComponents[section.component]"
                        :headline="section.headline"
                        :content="section.content"
                        :media="section.media"
                        :bullets="section.bullets"
                        :count_of_programs="section.countOfPrograms"
                        :count_of_reviews="section.countOfReviews"
                        :backgroundImage="section.backgroundImage"
                        :customBullets="section.customBullets"
                        :url="section.url"
                        :interactiveVideo="section.interactiveVideo"
                    />
                </div>
            </client-only>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted, computed, defineAsyncComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { abbiStore } from '../stores';
import { tagsData, headData } from '../composables/MetaTags';
import { is_global_page } from '../utils/pageUtils';
import { mapActions, mapState } from 'pinia';
// import { useAuth } from '../composables/useAuth';
import { useComponents } from '../composables/useComponents';

// Setup store and route
const store = abbiStore();
const route = useRoute();
const router = useRouter();
// const { isAdminLoggedIn , isMemberLoggedIn } = useAuth();
const dynaimcComponents = useComponents();

// Local state
const ready = ref(true);
const page_name = ref('');
const sections = ref([]);
const showHeader = ref('');
const trackingEventName = ref('');
const selected_section = ref(null);
const deletePopup = ref(false);
const headline = ref(null);

// seo meta
 const { titleFromAPI, descriptionFromAPI, cssText,headlineFromAPI } = await tagsData();
 useHead(headData(titleFromAPI, descriptionFromAPI, cssText));


// Computed properties
const renderOrganizationName = computed(() => {
  const targetPaths = ['/reviews', '/contact'];
  return targetPaths.some(path => route.path.includes(path));
});
// Use is_global_page utility
const globalPage = computed(() => is_global_page(route.path));

// Fetch page data on mount
onMounted(async () => {
  const routeParam = route.params.page;
  const page = store.allPages.find(p => p.slug === routeParam);

  if (!page) {
    window.location.href = '/';
  } else if (page.is_member_only && !store.auth.loggedIn) {
    router.push('/');
  } else {
    page_name.value = page.name;
    showHeader.value = page.show_header;
    sections.value = page.content;
    trackingEventName.value = page.tracking_event_name;
    headline.value = renderOrganizationName.value ? headlineFromAPI : page.name;
  }
});

// Methods
const { setPageEditPopup } = mapActions(abbiStore, ['setPageEditPopup']);

function editSections(index) {
  selected_section.value = index;
  setPageEditPopup(true);
}



</script>

<style scoped>
.first-section .v-image__image.v-image__image--contain {
    background: none !important;
}
.build {
    background-color: red;
    margin: 178px;
    color: yellow;
}
</style>
