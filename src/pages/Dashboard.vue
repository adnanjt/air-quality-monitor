<template>
  <div class="content">
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <template v-if="!isRTL">
                  <h5 class="card-category">Total Shipments</h5>
                </template>
                <template v-else>
                  <h5 class="card-category">مجموع الشحنات</h5>
                </template>
                <template v-if="!isRTL">
                  <h2 class="card-title">Performance</h2>
                </template>
                <template v-else>
                  <h2 class="card-title">أداء</h2>
                </template>
              </div>
              <div class="col-sm-6">
                <div
                  class="btn-group btn-group-toggle"
                  data-toggle="buttons"
                  :class="isRTL ? 'float-left' : 'float-right'"
                >
                  <template v-if="!isRTL">
                    <label
                      v-for="(option, index) in bigLineChartCategories"
                      :key="option"
                      class="btn btn-success btn-sm btn-simple"
                      :class="{ active: bigLineChart.activeIndex === index }"
                      :id="index"
                    >
                      <input
                        type="radio"
                        @click="initBigChart(index)"
                        name="options"
                        autocomplete="off"
                        :checked="bigLineChart.activeIndex === index"
                      />
                      {{ option }}
                    </label>
                  </template>
                  <template v-else>
                    <label
                      v-for="(option, index) in bigLineChartCategoriesAr"
                      :key="option"
                      class="btn btn-success btn-sm btn-simple"
                      :class="{ active: bigLineChart.activeIndex === index }"
                      :id="index"
                    >
                      <input
                        type="radio"
                        @click="initBigChart(index)"
                        name="options"
                        autocomplete="off"
                        :checked="bigLineChart.activeIndex === index"
                      />
                      {{ option }}
                    </label>
                  </template>
                </div>
              </div>
            </div>
          </template>
          <line-chart
            v-bind:style="{ width: '100%' }"
            class="chart-area"
            ref="bigChart"
            chart-id="big-line-chart"
            v-bind:chart-data="bigLineChart.chartData"
            :gradient-colors="bigLineChart.gradientColors"
            :gradient-stops="bigLineChart.gradientStops"
            :extra-options="bigLineChart.extraOptions"
          >
          </line-chart>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import { Card } from "@/components/index";

import LineChart from "@/components/Charts/LineChart";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";
import { GET_READ_LIST } from "@/services/store/firestore.service";

export default {
  components: {
    Card,
    LineChart
  },
  data() {
    return {
      bigLineChartCategories: ["  CO  ", "Smoke", "Gas GLP"],
      bigLineChartCategoriesAr: ["حسابات", "المشتريات", "جلسات"],
      bigLineChart: {
        extraOptions: chartConfigs.bigLineChartOptions,
        allData: [],
        activeIndex: 0,
        chartData: { datasets: [{}] },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: []
      },
      greenLineChart: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          datasets: [
            {
              label: "Lecturas de hoy",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 0.1,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 1,
              pointHoverRadius: 0.15,
              pointHoverBorderWidth: 0.75,
              pointRadius: 0.15,
              data: [
                [0, 500, 1000, 700, 100, 2],
                [70, 80, 120, 8080, 100],
                [120, 150, 200, 300, 200, 50]
              ]
            }
          ]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0]
      },
      blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: ["USA", "GER", "AUS", "UK", "RO", "BR"],
          datasets: [
            {
              label: "Countries",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [53, 20, 10, 80, 100, 45]
            }
          ]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0]
      },
      purpleLineChart: {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
          labels: ["JUL", "AUG", "SEP", "OCT", "NOV"],
          datasets: [
            {
              label: "My First dataset",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [90, 27, 60, 12, 80]
            }
          ]
        },
        gradientColors: [
          "rgba(66,134,121,0.15)",
          "rgba(66,134,121,0.0)",
          "rgba(66,134,121,0)"
        ],
        gradientStops: [1, 0.4, 0]
      }
    };
  },
  computed: {
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    }
  },
  methods: {
    initBigChart(index) {
      let chartData = {
        labels: [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
          "32",
          "33",
          "34",
          "35",
          "36",
          "37",
          "38",
          "39",
          "40",
          "41",
          "42",
          "43",
          "44",
          "45",
          "46",
          "47",
          "48",
          "49",
          "50",
          "51",
          "52",
          "53",
          "54",
          "55",
          "56",
          "57",
          "58",
          "59",
          "60",
          "61",
          "62",
          "63",
          "64",
          "65",
          "66",
          "67",
          "68",
          "69",
          "70",
          "71",
          "72",
          "73",
          "74",
          "75",
          "76",
          "77",
          "78",
          "79",
          "80",
          "81",
          "82",
          "83",
          "84",
          "85",
          "86",
          "87",
          "88",
          "89",
          "90",
          "91",
          "92",
          "93",
          "94",
          "95",
          "96",
          "97",
          "98",
          "99",
          "100",
          "101",
          "102",
          "103",
          "104",
          "105",
          "106",
          "107",
          "108",
          "109",
          "110",
          "111",
          "112",
          "113",
          "114",
          "115",
          "116",
          "117",
          "118",
          "119",
          "120",
          "121",
          "122",
          "123",
          "124",
          "125",
          "126",
          "127",
          "128",
          "129",
          "130",
          "131",
          "132",
          "133",
          "134",
          "135",
          "136",
          "137",
          "138",
          "139",
          "140",
          "141",
          "142",
          "143",
          "144",
          "145",
          "146",
          "147",
          "148",
          "149",
          "150",
          "151",
          "152",
          "153",
          "154",
          "155",
          "156",
          "157",
          "158",
          "159",
          "160",
          "161",
          "162",
          "163",
          "164",
          "165",
          "166",
          "167",
          "168",
          "169",
          "170",
          "171",
          "172",
          "173",
          "174",
          "175",
          "176",
          "177",
          "178",
          "179",
          "180",
          "181",
          "182",
          "183",
          "184",
          "185",
          "186",
          "187",
          "188",
          "189",
          "190",
          "191",
          "192",
          "193",
          "194",
          "195",
          "196",
          "197",
          "198",
          "199",
          "200",
          "201",
          "202",
          "203",
          "204",
          "205",
          "206",
          "207",
          "208",
          "209",
          "210",
          "211",
          "212",
          "213",
          "214",
          "215",
          "216",
          "217",
          "218",
          "219",
          "220",
          "221",
          "222",
          "223",
          "224",
          "225",
          "226",
          "227",
          "228",
          "229",
          "230",
          "231",
          "232",
          "233",
          "234",
          "235",
          "236",
          "237",
          "238",
          "239",
          "240",
          "241",
          "242",
          "243",
          "244",
          "245",
          "246",
          "247",
          "248",
          "249",
          "250",
          "251",
          "252",
          "253",
          "254",
          "255",
          "256",
          "257",
          "258",
          "259",
          "260",
          "261",
          "262",
          "263",
          "264",
          "265",
          "266",
          "267",
          "268",
          "269",
          "270",
          "271",
          "272",
          "273",
          "274",
          "275",
          "276",
          "277",
          "278",
          "279",
          "280",
          "281",
          "282",
          "283",
          "284",
          "285",
          "286",
          "287",
          "288",
          "289",
          "290",
          "291",
          "292",
          "293",
          "294",
          "295",
          "296",
          "297",
          "298",
          "299",
          "300",
          "301",
          "302",
          "303",
          "304",
          "305",
          "306",
          "307",
          "308",
          "309",
          "310",
          "311",
          "312",
          "313",
          "314",
          "315",
          "316",
          "317",
          "318",
          "319",
          "320",
          "321",
          "322",
          "323",
          "324",
          "325",
          "326",
          "327",
          "328",
          "329",
          "330",
          "331",
          "332",
          "333",
          "334",
          "335",
          "336",
          "337",
          "338",
          "339",
          "340",
          "341",
          "342",
          "343",
          "344",
          "345",
          "346",
          "347",
          "348",
          "349",
          "350",
          "351",
          "352",
          "353",
          "354",
          "355",
          "356",
          "357",
          "358",
          "359",
          "360",
          "361",
          "362",
          "363",
          "364",
          "365",
          "366",
          "367",
          "368",
          "369",
          "370",
          "371",
          "372",
          "373",
          "374",
          "375",
          "376",
          "377",
          "378",
          "379",
          "380",
          "381",
          "382",
          "383",
          "384",
          "385",
          "386",
          "387",
          "388",
          "389",
          "390",
          "391",
          "392",
          "393",
          "394",
          "395",
          "396",
          "397",
          "398",
          "399",
          "400"
        ],
        datasets: [
          {
            fill: false,
            borderColor: config.colors.primary,
            borderWidth: 0.5,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 4,
            pointHoverRadius: 1,
            pointHoverBorderWidth: 5,
            pointRadius: 1,
            data: this.bigLineChart.allData[index]
          }
        ]
      };
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },
    getChartDataFromCloud: function(self) {
      self.$store.dispatch(GET_READ_LIST).then(result => {
        //console.log(JSON.stringify(result));
        //result.forEach(element => console.log(JSON.stringify(element.data())));
        //this.tableData = result;
        let coList = [];
        let smokeList = [];
        let gasList = [];
        result.forEach(element => {
          coList.push({
            x: new Date(element.tiempo).getTime(),
            y: element.co
          });
          smokeList.push({
            x: new Date(element.tiempo).getTime(),
            y: element.Smoke
          });
          gasList.push({
            x: new Date(element.tiempo).getTime(),
            y: element.gas
          });
        });
        console.log(JSON.stringify(coList));
        self.bigLineChart.allData = [coList, smokeList, gasList];
        self.initBigChart(0);
      });
    }
  },
  mounted() {
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = "ar";
      this.$rtl.enableRTL();
    }
    let self = this;
    setTimeout(() => {
      self.getChartDataFromCloud(self);
    }, 20);
  },
  beforeDestroy() {
    if (this.$rtl.isRTL) {
      this.i18n.locale = "en";
      this.$rtl.disableRTL();
    }
  }
};
</script>
<style></style>
