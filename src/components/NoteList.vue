<template>
  <v-row no-gutters>
    <v-col cols="2">
      <v-card
        class="font-weight-bold mr-4 pl-4 py-1 secondary lighten-4 text-uppercase"
      >
        {{ name }}
      </v-card>
    </v-col>
    <v-col :key="note.index" v-for="note of notes">
      <v-btn
        class="mr-1 primary"
        height="32"
        hover
        :class="{ 'lighten-4': !note.active }"
        @click="note.active = !note.active"
      ></v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NoteList",
  data: () => ({
    notes: Array.from({ length: 16 }, (_, index) => ({ active: false, index })),
  }),
  props: ["name"],
});
</script>
