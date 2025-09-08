<template>
  <div class="home-page page">
    <!-- Hero -->
    <section class="hero">
      <h1>MAGIC EVENT GUYANE</h1>
      <p>Nous organisons vos mariages, cérémonies laïques, fêtes privées et événements d’entreprise en Guyane et dans les DOM.</p>
      <button>Réserver un RDV</button>
    </section>

    <!-- Services -->
    <section class="services">
      <h2>Nos prestations</h2>
      <div class="cards-container">
        <div class="card">
          <h3>Mariages</h3>
          <p>Organisation complète ou partielle selon vos besoins.</p>
        </div>
        <div class="card">
          <h3>Cérémonies laïques</h3>
          <p>Une cérémonie sur mesure et inoubliable.</p>
        </div>
        <div class="card">
          <h3>Fêtes privées</h3>
          <p>Anniversaires, soirées à thème, célébrations diverses.</p>
        </div>
        <div class="card">
          <h3>Événements d’entreprise</h3>
          <p>Team building, séminaires ou soirées professionnelles.</p>
        </div>
      </div>
    </section>

    <!-- Tarifs -->
    <section class="pricing">
      <h2>Tarifs</h2>
      <div class="cards-container">
        <div class="card">
          <h3>Organisation complète</h3>
          <p>À partir de 2000€</p>
        </div>
        <div class="card">
          <h3>Organisation partielle</h3>
          <p>À partir de 1500€</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomePage"
};
</script>
