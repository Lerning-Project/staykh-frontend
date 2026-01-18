import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './main.css'

import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import TitleContent from './components/TitleContent.vue'
import Paragraph from './components/Paragraph.vue'
import TotalCard from './components/cards/TotalCard.vue'

/* import specific icons */
import { 
  faUserSecret, 
  faHouse, 
  faUser, 
  faCog,
  faHotel,
  faCalendarCheck,
  faUsers,
  faChartLine,
  faMagnifyingGlass,
  faBell,
  faDoorOpen,
  faLocationDot,
  faCreditCard,
  faStar,
  faImages,
  faUserLock,
  faArrowTrendUp,
  faArrowTrendDown,
  faMinus,
  faEye,
  faPen,
  faBan,
  faMoneyBill,
  faLandmark,
  faEyeSlash,
  faMoneyBillWave,
  faMoneyBillWaveAlt,
  faVideo,
  faTrash,
  faPenToSquare,
  faShieldHalved,
  faTable,
  faTableList,
  faCheck,
  faXmark,
  faCircleCheck,
  faCircleXmark,
  faCalendar,

  
  
  
  

} from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(
  faUserSecret, 
  faHouse, 
  faUser, 
  faCog, 
  faHeartRegular, 
  faGithub, 
  faTwitter,
  faHotel,
  faCalendarCheck,
  faUsers,
  faChartLine,
  faMagnifyingGlass,
  faBell,
  faDoorOpen,
  faLocationDot,
  faCreditCard,
  faStar,
  faImages,
  faUserLock,
  faArrowTrendUp,
  faArrowTrendDown,
  faMinus,
  faEye,
  faPen,
  faBan,
  faMoneyBill,
  faLandmark,
  faEyeSlash,
  faMoneyBillWave,
  faMoneyBillWaveAlt,
  faVideo,
  faTrash,
  faPenToSquare,
  faShieldHalved,
  faTable,
  faTableList,
  faCheck,
  faXmark,
  faCircleCheck,
  faCircleXmark,
  faCalendar,
)

const app = createApp(App)

/* register font-awesome-icon component globally */
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.component('TitleContent', TitleContent)
app.component('Paragraph', Paragraph)
app.component('TotalCard', TotalCard)

app.mount('#app')
