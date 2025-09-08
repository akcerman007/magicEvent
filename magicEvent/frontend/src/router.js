import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import GalleryPage from './pages/GalleryPage.vue'
import CalendarPage from './pages/CalendarPage.vue'
import ContactPage from './pages/ContactPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/gallery', name: 'Gallery', component: GalleryPage },
  { path: '/calendar', name: 'Calendar', component: CalendarPage },
  { path: '/contact', name: 'Contact', component: ContactPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
