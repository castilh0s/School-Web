<template>
  <VApp>
    <VToolbar app>
      <VToolbarTitle class="headline text-uppercase">
        <span>School</span>
        <span class="font-weight-light">API</span>
      </VToolbarTitle>
      <VSpacer />
      <VBtn flat href="https://github.com/castilh0s/School-Web" target="_blank">
        <span class="mr-2">View on GitHub</span>
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
      //
    };
  }
};
</script>
