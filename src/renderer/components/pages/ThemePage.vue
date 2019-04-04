<template>
  <div id="theme" class="page-container">
    <div class="container">
      <b-card class="mt-5">
        <b-card>
          <b-card-body v-if="theme">
            <!-- <ls-navbar>
              <b-btn variant="link" to="/components">
                <div class="icon-home"></div>
              </b-btn>
              <span class="flex"></span>
              <div class="navbar-title">{{ theme.title }}</div>
              <span class="flex"></span>
            </ls-navbar>-->

            <ul class="theme-unities-list">
              <li class="theme-unit" v-for="unit in theme.units" :key="unit.id">
                <router-link
                  :to="{ 
                        name: 'unit', 
                        params: { 
                            module_slug: $route.params.module_slug, 
                            theme_slug: theme.slug,
                            unit_slug: unit.slug
                        }
                    }"
                >
                  <div class="header-unit">{{ unit.title }}</div>
                </router-link>
                <div class="unit-body">
                  <div class="unit-info">
                    <div>ATIVIDADES:</div>
                    <div class="activities-completed">0/5</div>
                    <div>----------</div>
                    <ul class="stars">
                      <li>star</li>
                      <li>star</li>
                      <li>star</li>
                    </ul>
                  </div>
                  <div class="unit-image"></div>
                </div>
              </li>
            </ul>
            <b-btn variant="link" :to="historyBack">Voltar</b-btn>
          </b-card-body>
        </b-card>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { RouteMixin } from "./index";

import ui from "@/components/ui";

export default {
  mixins: [RouteMixin],
  components: { ...ui },
  created() {
    this.fetchTheme(this.$route.params);
  },
  computed: {
    ...mapState("Theme", ["theme"])
  },
  methods: {
    ...mapActions("Theme", ["fetchTheme"])
  }
};
</script>

<style>
</style>
