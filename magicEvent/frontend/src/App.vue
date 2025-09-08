<template>
  <div id="app">
    <!-- Header -->
    <header>
      <div class="logo">MAGIC EVENT GUYANE</div>
      <nav>
        <ul>
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/gallery">Galerie</router-link></li>
          <li><router-link to="/calendar">Agenda</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Page content -->
    <router-view></router-view>

    <!-- Footer -->
    <footer>
      <p>© 2025 MAGIC EVENT GUYANE - Tous droits réservés</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
