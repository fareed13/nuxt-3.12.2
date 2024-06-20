<template>
  <div class="mainIndex">
    <div v-if="ready">
      <div v-for="(section, i) in sections" :key="i">
        <component
          :is="dynaimcComponents[section.component]"
          :headline="section.headline"
          :subtitle="section.subtitle"
          :content="section.content"
          :media="section.media"
          :bullets="section.bullets"
          :count_of_programs="section.countOfPrograms"
          :count_of_reviews="section.countOfReviews"
          :backgroundImage="section.backgroundImage"
          :backgroundColor="section.backgroundColor"
          :customBullets="section.customBullets"
          :url="section.url"
          :interactiveVideo="section.interactiveVideo"
        />
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import { abbiStore } from "../stores";
// import { useAuth } from '../composables/useAuth';
import { useComponents } from '../composables/useComponents';
import { tagsData, headData } from '../composables/MetaTags';


const store = abbiStore();
const config = useRuntimeConfig().public;
// const { isAdminLoggedIn } = useAuth();
const dynaimcComponents = useComponents();


// Reactive state
const titleFromAPI = ref('');
const descriptionFromAPI = ref('');
const headlineFromAPI = ref('');
const cssText = ref('');
const selected_section = ref(null);
// const CustomTitle = ref('');
// const Description = ref('');
// const dialog = ref(false);
const ready = ref(false);
// const page_name = ref('');
const sections = ref([]);
const trackingEventName = ref('');
const page = ref(null);
const deletePopup = ref(false);
// const loading = ref(false);
const showHeader = ref(false);
// const gTag = ref('');

// Load PageEdit asynchronously

const { titleFromAPI: title, descriptionFromAPI: description, headlineFromAPI: headline, cssText: css } = await tagsData();
titleFromAPI.value = title;
descriptionFromAPI.value = description;
headlineFromAPI.value = headline;
cssText.value = css;
// Set up SEO metadata
useHead(headData(title, description, css));

onMounted( () => {
  const location = store.location;
  const homepage = location.pages.find((i) => i.slug === "homepage");
  if (homepage.length === 0) {
    this.$router.push("/");
  } else {
    page.value = homepage;
    showHeader.value = homepage.show_header;
    sections.value = homepage.content;
    ready.value = true;
    trackingEventName.value = homepage.tracking_event_name;
  }
});

const editSections = (index) => {
  selected_section.value = index;
  store.setPageEditPopup(true);
};
const jsonld = () => {
  const data = store.location;
  const organization = store.organization;
  return {
    "@context": "http://schema.org",
    "@type": "LocalBusiness",
    url: "https://" + store.domain,
    name: organization.name,
    priceRange: "$$",
    logo: `${config.AMAZONAWS_IMAGE_URL}${organization.primary_logo.uuid}_350.${organization.primary_logo.extension}`,
    image: `${config.AMAZONAWS_IMAGE_URL}${organization.primary_logo.uuid}_350.${organization.primary_logo.extension}`,
    telephone: "+1-" + data.phone,
    geo: {
      "@type": "GeoCoordinates",
      latitude: data.latitude,
      longitude: data.longitude,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: data.street,
      addressLocality: data.city,
      addressRegion: data.state.name,
      postalCode: data.zip_code,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-" + data.phone,
      contactType: "Customer service",
    },
  };
}
</script>
<style>
.mainIndex {
  margin-top: 80px;
}
@media (max-width: 667px) {
    .mainIndex{
    /* margin-top: 180px!important; */
}
}
</style>
