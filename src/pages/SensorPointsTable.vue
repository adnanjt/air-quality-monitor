<template>
  <div class="content">
    <div class="row">
      <div class="col-12">
        <card>
          <template slot="header">
            <h4 class="card-title">Registro de lecturas</h4>
          </template>
          <div class="table-responsive text-left">
            <base-table
              v-bind:data="tableData"
              :columns="columns"
              thead-classes="text-primary"
              name="points-table"
            >
              <template slot="columns">
                <th>CO</th>
                <th>Smoke</th>
                <th>Gas GLP</th>
                <th>Peligro de gas</th>
                <th>Fecha de registro</th>
                <th class="text-left">Numero de muestra</th>
                <!--<th class="text-right">Actions</th> -->
              </template>
              <template slot-scope="{ row }">
                <td>{{ row.co }}</td>
                <td>{{ row.Smoke }}</td>
                <td>{{ row.gas }}</td>
                <td>{{ row.gas_peligro }}</td>
                <td>{{ row.tiempo }}</td>
                <td class="text-left">{{ row.muestra }}</td>
                <!-- <td class="td-actions text-right">
                             <base-button type="info" size="sm" icon>
                            <i class="tim-icons icon-single-02"></i>
                            </base-button>
                            <base-button type="success" size="sm" icon>
                            <i class="tim-icons icon-settings"></i>
                            </base-button>
                            <base-button type="danger" size="sm" icon>
                            <i class="tim-icons icon-simple-remove"></i>
                            </base-button>
                        </td> -->
              </template>
            </base-table>
            <div>
              <base-button type="danger" block @click="deleteAllData()"
                >DELETE ALL!</base-button
              >
            </div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import { Card } from "@/components/index";

import BaseTable from "@/components/BaseTable";

import { GET_READ_LIST, DELETE_READ } from "@/services/store/firestore.service";
import BaseButton from "@/components/BaseButton";

export default {
  components: {
    Card,
    BaseTable,
    BaseButton
  },
  data() {
    this.sendFirestore();
    return {
      columns: [
        "id_sensor",
        "valor",
        "gas_peligro",
        "tiempo",
        "muestra",
        "actions"
      ],
      tableData: []
    };
  },
  methods: {
    sendFirestore: function() {
      //console.log(JSON.stringify(db.collection('lectura-sensores')));

      this.lectura = {
        gas_peligro: false,
        id_sensor: 1,
        tiempo: new Date(),
        valor: 69
      };

      this.$store.dispatch(GET_READ_LIST).then(result => {
        //result.forEach(element => console.log(JSON.stringify(element.data())));
        this.tableData = result;
      });
    },
    deleteAllData: function() {
      this.$store.dispatch(DELETE_READ).then(result => {
        //result.forEach(element => console.log(JSON.stringify(element.data())));
        console.log(result);
        alert("ALL DELETED");
      });
    }
  }
};
</script>
