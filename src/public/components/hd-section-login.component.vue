<script>
import i18n from "../../i18n.js";
export default {
  name: "hd-section-login",
  data(){
    return {
      logoSrc: "logo_white.webp",
      items: [
        {
          label: 'Español',
          icon: 'src/assets/images/flags_icons/spain.webp',
          command: ()=> {this.changeLanguage('es');}
        },
        {
          label: 'English',
          icon: 'src/assets/images/flags_icons/usa.webp',
          command: ()=> {this.changeLanguage('en');}
        },
        {
          label: 'Português',
          icon: 'src/assets/images/flags_icons/portugal.webp',
          command: ()=> {this.changeLanguage('pt_br');}
        },
        {
          label: 'Deutsch',
          icon: 'src/assets/images/flags_icons/germany.webp',
          command: ()=> {this.changeLanguage('de');}
        },
        {
          label: 'Italiano',
          icon: 'src/assets/images/flags_icons/italy.webp',
          command: ()=> {this.changeLanguage('it');}
        },
        {
          label: 'Français',
          icon: 'src/assets/images/flags_icons/france.webp',
          command: ()=> {this.changeLanguage('fr');}
        },
        {
          label: '한국인',
          icon: 'src/assets/images/flags_icons/korea.webp',
          command: ()=> {this.changeLanguage('ko');}
        }
      ]
    }
  },
  methods:{
    changeLanguage(lang){
      i18n.global.locale.value = lang;
    }
  }
}
</script>

<template>
  <header id="landing-header">
    <div class="landing-div">
      <router-link to="/"><pv-button><img :src="logoSrc" alt="logo" style="height: 25px; width: auto"></pv-button></router-link>
    </div>
    <nav class="landing-nav-2">
      <ul>
        <li>
          <pv-splitbutton :model="items">
            <template #menubuttonicon>
              <span class="material-symbols-outlined">
                translate
              </span>
            </template>
            <template v-slot:menuitemicon="{ item }">
              <img :src="item.icon" alt="language_icon" style="width: 2rem; padding-right: 10px"/>
            </template>
          </pv-splitbutton>
        </li>
      </ul>
    </nav>
  </header>

</template>

<style scoped>
#landing-header {
  display: flex;
  position: fixed;
  top: 0;
  z-index: 40;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #ffffff;
}
.landing-div{
  margin: 1rem;
  display: flex;
  flex-basis: 0;
  flex-grow: 1;
}
.landing-div img{
  height: 6rem;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  transition-duration: 500ms;
}
.landing-nav-2{
  display: flex;
  flex-basis: 0px;
  flex-grow: 1;
  justify-content: flex-end;
}
.landing-nav-2 ul {
  display: flex;
  font-size: 0.875rem;
}
.landing-nav-2 ul li {
  display: inline-block;
}
</style>