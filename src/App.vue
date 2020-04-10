<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
         <router-link tag="v-list-item-title" to="/">Home</router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>
          <v-list-item-content>
          <router-link tag="v-list-item-title" to="/calendario"> Calendario</router-link>
          </v-list-item-content>
              </v-list-item>
              <v-list-item link>
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>
          <v-list-item-content>
          <router-link tag="v-list-item-title" to="/metas"> Metas e Estrégias</router-link>
          </v-list-item-content>
          
        </v-list-item>
          <v-list-item link>
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>
          <v-list-item-content>
          <router-link tag="v-list-item-title" to="/treino"> Treino</router-link>
          </v-list-item-content>
          
        </v-list-item>
             <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
           <v-list-item-content>
         <router-link  tag="v-list-item-title" to="/praticar">  Praticar</router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Gerent Music</v-toolbar-title>
    </v-app-bar>

    <v-content id="content">
     <router-view></router-view>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>

  export default {

    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
  }
</script>
<style>
#content{
      display: flex;
    justify-content: center;
    
}
</style>
