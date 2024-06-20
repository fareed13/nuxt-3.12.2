<template>
    <div>
        <LandingPageBanner :header="customHeader" />
        <BlogDetails
            :title="customHeader"
            :media="media"
            :content="content"
            :files="files"
            :extension="extension"
        />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import LandingPageBanner from '@/components/LandingPageBanner';
import BlogDetails from '@/components/blog/BlogDetail';
import { abbiStore } from '../../stores';
import { tagsData, headData } from '@/composables/MetaTags';

// for seo  
  const { titleFromAPI, descriptionFromAPI, headlineFromAPI, cssText } = await tagsData();
  useHead(headData(titleFromAPI, descriptionFromAPI, cssText));
  
const store = abbiStore();
const route = useRoute();

const CustomTitle = ref('Blog');
const customHeader = ref(null);
const media = ref(null);
const files = ref([]);
const content = ref(null);
const extension = ref(null);

onMounted(async () => {
  const blogSlug = route.params.slug;
  const blogId = parseInt(blogSlug.split('-').pop());
  const targetedBlog = store.location.blogs.find((b) => b.id === blogId);
  
  customHeader.value = targetedBlog.title;
  media.value = targetedBlog.media || null;
  content.value = targetedBlog.content;
  files.value = targetedBlog.blog_files
    ? targetedBlog.blog_files.map((bf) => bf.file_path)
    : [];
  extension.value = targetedBlog.media ? targetedBlog.media.extension : '';
  
});
</script>

<style lang="scss" scoped>
@import '../../assets/sass/colors';
.video-gallery {
    h2 {
        text-align: center;
        font-size: 50px;
    }
    .col-12 {
        margin-bottom: 20px;
    }
    .video-box {
        iframe.video {
            height: 500px;
            border: 5px solid #000000;
        }

        h3 {
            text-align: center;
            font-size: 36px;
            // font-family: $Khand-Medium !important;
        }
    }

    @media (max-width: 1903px) {
        .video-box {
            iframe.video {
                height: 320px;
            }
        }
    }

    @media (max-width: 1263px) {
        .video-box {
            iframe.video {
                height: 230px;
            }
        }
        h2 {
            font-size: 36px;
        }
    }

    @media (max-width: 767px) {
        .video-box {
            iframe.video {
                height: 200px;
            }
        }
    }

    @media (max-width: 600px) {
        .video-box {
            iframe.video {
                height: 300px;
            }
        }
    }

    @media (max-width: 450px) {
        .video-box {
            iframe.video {
                height: 220px;
            }
        }
    }
}
</style>
