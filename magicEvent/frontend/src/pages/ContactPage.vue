<template>
  <div class="contact-page page">
    <h1>Contactez-nous</h1>
    <p>Remplissez le formulaire ci-dessous pour toute demande ou réservation :</p>

    <form class="contact-form">
      <div class="form-row">
        <label for="name">Nom</label>
        <input type="text" id="name" placeholder="Votre nom" />
      </div>

      <div class="form-row">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="Votre email" />
      </div>

      <div class="form-row">
        <label for="event-type">Type d'événement</label>
        <select id="event-type">
          <option value="">Sélectionner</option>
          <option value="wedding">Mariage</option>
          <option value="private">Fête privée</option>
          <option value="corporate">Événement entreprise</option>
        </select>
      </div>

      <div class="form-row">
        <label for="message">Message</label>
        <textarea id="message" placeholder="Votre message"></textarea>
      </div>

      <div class="form-row">
        <button type="submit">Envoyer</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ContactPage"
};
</script>
