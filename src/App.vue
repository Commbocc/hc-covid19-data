<template>
  <div>
    <!-- error -->
    <div v-if="error" class="text-center lead text-muted">
      Unable to load Hillsborough County COVID-19 statistics. View the
      <a
        href="https://experience.arcgis.com/experience/96dd742462124fa0b38ddedb9b25e429"
        target="_blank"
      >Florida Department of Health</a> statistics or try again later.
    </div>

    <!-- statistics -->
    <div v-else>
      <div class="row align-items-stretch">
        <!-- Tests -->
        <div class="col-sm-6 col-md-3">
          <div class="card card-body text-center">
            <p class="font-weight-bold mb-0 text-secondary">Total Tests</p>
            <p class="h3 mt-1 font-weight-bold">{{ total_tests }}</p>
          </div>
        </div>
        <!-- Cases -->
        <div class="col-sm-6 col-md-3">
          <div class="card card-body text-center">
            <p class="font-weight-bold mb-0 text-secondary">Positive Cases</p>
            <p class="h3 mt-1 font-weight-bold">{{ positive_cases }}</p>
          </div>
        </div>
        <!-- Hospitalizations -->
        <div class="col-sm-6 col-md-3">
          <div class="card card-body text-center">
            <p class="font-weight-bold mb-0 text-secondary">Hospitalizations</p>
            <p class="h3 mt-1 font-weight-bold">{{ hospitalizations }}</p>
          </div>
        </div>
        <!-- Deaths -->
        <div class="col-sm-6 col-md-3">
          <div class="card card-body text-center">
            <p class="font-weight-bold mb-0 text-secondary">Deaths</p>
            <p class="h3 mt-1 font-weight-bold">{{ deaths }}</p>
          </div>
        </div>
      </div>

      <slot>
        <p class="text-center">
          <a
            href="https://experience.arcgis.com/experience/96dd742462124fa0b38ddedb9b25e429"
            target="_blank"
            class="text-muted small font-italic"
          >Reported by the Florida Department of Health</a>
        </p>
      </slot>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HcCovid19Data',
  data: () => ({
    error: false,
    total_tests: 0,
    positive_cases: 0,
    hospitalizations: 0,
    deaths: 0
  }),
  mounted() {
    this.getData().catch(() => {
      this.error = true
      // console.warn(err)
    })
  },
  methods: {
    async getData() {
      const url =
        // 'https://services1.arcgis.com/CY1LXxl9zlJeBuRZ/arcgis/rest/services/Florida_COVID19_Cases/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=true&spatialRel=esriSpatialRelIntersects&objectIds=20&outFields=*&outSR=102100&cacheHint=true'
        'https://services1.arcgis.com/CY1LXxl9zlJeBuRZ/arcgis/rest/services/Florida_COVID19_Cases/FeatureServer/0/20?f=json'

      let {
        data: {
          feature: { attributes }
        }
      } = await axios.get(url)

      this.total_tests = this.numberWithCommas(attributes.T_total)
      this.positive_cases = this.numberWithCommas(attributes.CasesAll)
      this.hospitalizations = this.numberWithCommas(attributes.C_HospYes_Res)
      this.deaths = this.numberWithCommas(attributes.Deaths)

      // console.log(attributes)
    },
    numberWithCommas(n) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
</script>
