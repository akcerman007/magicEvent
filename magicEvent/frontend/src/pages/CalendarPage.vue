<template>
  <div class="calendar-page page">
    <h1>Agenda</h1>
    <p>Consultez nos dates et horaires réservés :</p>

    <div class="calendar-grid">
      <!-- Exemple de jours -->
      <div class="calendar-day" v-for="day in days" :key="day.date">
        <h3>{{ day.date }}</h3>
        <ul>
          <li v-for="event in day.events" :key="event.id">
            <span class="event-time">{{ event.time }}</span>
            <span class="event-title">{{ event.title }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarPage",
  data() {
    return {
      days: [
        {
          date: "12/09/2025",
          events: [
            { id: 1, time: "14:00", title: "Mariage de Marie & Paul" },
            { id: 2, time: "18:00", title: "Réception privée" },
          ],
        },
        {
          date: "25/10/2025",
          events: [{ id: 3, time: "10:00", title: "Événement entreprise XYZ" }],
        },
        {
          date: "05/11/2025",
          events: [{ id: 4, time: "16:00", title: "Fête privée Dupont" }],
        },
        {
          date: "20/12/2025",
          events: [{ id: 5, time: "15:00", title: "Mariage de Clara & Julien" }],
        },
      ],
    };
  },
};
</script>
