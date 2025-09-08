<template>
  <div class="gallery-page page">
    <h1>Galerie</h1>
    <p>Découvrez quelques-uns de nos événements passés :</p>
    <div class="gallery-grid">
      <div class="gallery-item" v-for="n in 8" :key="n">
        <img :src="`https://picsum.photos/400/300?random=${n}`" alt="Événement"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GalleryPage"
};
</script>
