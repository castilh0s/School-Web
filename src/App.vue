<template>
  <VApp>
    <VNavigationDrawer v-model="drawer" temporary app>
      <VList dense>
        <VListTile
          v-for="item in items"
          :key="item.title"
          @click="$router.push(item.route)"
        >
          <VListTileAction>
            <VIcon>{{ item.icon }}</VIcon>
          </VListTileAction>

          <VListTileContent>
            <VListTileTitle>{{ item.title }}</VListTileTitle>
          </VListTileContent>
        </VListTile>
      </VList>
    </VNavigationDrawer>

    <VToolbar app>
      <VToolbarSideIcon @click="drawer = !drawer" />
      <VToolbarTitle class="headline text-uppercase">
        <span>School</span>
        <span class="font-weight-light">API</span>
      </VToolbarTitle>
      <VSpacer />
      <VBtn flat href="https://github.com/castilh0s/School-Web" target="_blank">
        <span class="mr-2">View web on GitHub</span>
        <VIcon>mdi-open-in-new</VIcon>
      </VBtn>
      <VBtn flat href="https://github.com/castilh0s/School-API" target="_blank">
        <span class="mr-2">View API on GitHub</span>
        <VIcon>mdi-open-in-new</VIcon>
      </VBtn>
    </VToolbar>

    <VContent>
      <router-view />
    </VContent>
  </VApp>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: false,
      items: [
        { title: "Home", icon: "mdi-home", route: "/" },
        {
          title: "Estudantes",
          icon: "mdi-account-multiple",
          route: "/students"
        },
        {
          title: "Estudantes reprovados",
          icon: "mdi-account-multiple-minus",
          route: "/students/failed"
        }
      ],
      right: null
    };
  }
};
</script>
