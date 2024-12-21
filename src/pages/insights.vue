<template>
  <div class="q-px-md">
    <div class="q-gutter-y-md q-my-sm" style="max-width: 600px">
      <q-tabs
        v-model="tab"
        no-caps
        align="justify"
        active-class="active-insight-tab"
        indicator-color="transparent"
        class="text-primary header-text"
      >
        <q-tab name="mails">
          <div class="header-text text-primary" style="font-weight: 700;font-size: 20px;">My health</div>
        </q-tab>
        <q-tab name="alarms">
          <div class="caption-text text-primary" style="font-weight: 700;font-size: 20px;">My Feed</div>
        </q-tab>
      </q-tabs>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      tab: ref('mails')
    }
  }
}
</script>

<style>
.active-insight-tab {
  background-color: #006b302d;
  border-radius: 16px;
}

.tab-item:hover {
  background-color: white;
}
</style>
