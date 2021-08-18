<template>
  <div>
    <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%">
      <el-table-column
          prop="id"
          label="ID"
          width="40"
      >
      </el-table-column>
      <el-table-column
          prop="q"
          label="Open-ended Question">
      </el-table-column>
      <el-table-column
          prop="a"
          label="Answer">
      </el-table-column>
      <el-table-column label="RELE">
        <template slot-scope="rele">
          <el-button-group>
            <el-button :class="{'primary': rele.row.releIndex===0}" @click="f_rele(rele.$index,rele.row,0)">0
            </el-button>
            <el-button :class="{'primary': rele.row.releIndex===1}" @click="f_rele(rele.$index,rele.row,1)">1
            </el-button>
            <el-button :class="{'primary': rele.row.releIndex===2}" @click="f_rele(rele.$index,rele.row,2)">2
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
      <el-table-column label="CLAR">
        <template slot-scope="clar">
          <el-button-group>
            <el-button :class="{'primary': clar.row.clarIndex===0}" @click="f_clar(clar.$index,clar.row,0)">0
            </el-button>
            <el-button :class="{'primary': clar.row.clarIndex===1}" @click="f_clar(clar.$index,clar.row,1)">1
            </el-button>
            <el-button :class="{'primary': clar.row.clarIndex===2}" @click="f_clar(clar.$index,clar.row,2)">2
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
      <el-table-column label="SPEC">
        <template slot-scope="spec">
          <el-button-group>
            <el-button :class="{'primary': spec.row.specIndex===0}" @click="f_spec(spec.$index,spec.row,0)">0
            </el-button>
            <el-button :class="{'primary': spec.row.specIndex===1}" @click="f_spec(spec.$index,spec.row,1)">1
            </el-button>
            <el-button :class="{'primary': spec.row.specIndex===2}" @click="f_spec(spec.$index,spec.row,2)">2
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
      <el-table-column label="SELDIS">
        <template slot-scope="seldis">
          <el-input-number v-model="SELDIS[seldis.$index]" @change="f_seldis" :min="-1" :max="100"></el-input-number>
        </template>
      </el-table-column>
    </el-table>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :span="6" :offset="10">
        <div class="grid-content bg-purple">
          <el-button type="warning" @click="save">Save</el-button>
          <el-button type="primary" @click="getNewOne">Next</el-button>
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import {instance} from '../network/request';

export default {
  name: "Index",
  data: function () {
    return {
      id: "",
      coder: "",
      tableData: [],
      RELE: ['', '', '', '', '', '', ''],
      CLAR: ['', '', '', '', '', '', ''],
      SPEC: ['', '', '', '', '', '', ''],
      SELDIS: [-1, -1, -1, -1, -1, -1, -1],
    }
  },
  created: function () {
    this.coder = parseInt(this.$route.params.coder);
  },
  mounted() {
    this.getNewOne();
  },
  methods: {
    getNewOne: function () {
      console.log(this.coder);
      if (this.coder === 1) {
        instance.get('/c1new').then((res) => {
          if (parseInt(res.data['id']) > 0) {
            this.tableData = res.data['rec'];
            this.id = res.data['id'];
          } else {
            alert("Cannot get new data")
          }
          console.log(res.data)
        })
      } else if (this.coder === 2) {
        instance.get('/c2new').then((res) => {
          if (parseInt(res.data['id']) > 0) {
            this.tableData = res.data['rec'];
            this.id = res.data['id'];
          } else {
            alert("Cannot get new data")
          }
          console.log(res.data)
        })
      }
    },
    f_rele: function (index, row, score) {
      this.$set(row, 'releIndex', score);
      this.RELE[index] = score;
      console.log(this.RELE)
    },
    f_clar: function (index, row, score) {
      this.$set(row, 'clarIndex', score);
      this.CLAR[index] = score;
      console.log(this.CLAR)
    },
    f_spec: function (index, row, score) {
      this.$set(row, 'specIndex', score);
      this.SPEC[index] = score;
      console.log(this.SPEC)
    },
    f_seldis: function (value) {
      console.log(this.SELDIS);
      console.log(value)
    },
    save: function () {
      let that = this;
      if(this.data_check()) {
        instance.post('/save', {
          'id': this.id,
          'coder': this.coder,
          'rele': this.RELE,
          'clar': this.CLAR,
          'spec': this.SPEC,
          'seldis': this.SELDIS,
        }).then((res) => {
          console.log(res);
          that.$message('Success');
          that.getNewOne();
        })
      }else{
        this.$message('Some items not completed!');
      }
    },
    data_check:function(){
      for(let i = 0, len = this.RELE.length; i < len; i++){
        console.log(this.RELE[i])
        if(this.RELE[i] === ""){
          return false;
        }
      }
      for (let i = 0, len = this.CLAR.length; i < len; i++) {
        if(this.CLAR[i] === ""){
          return false;
        }
      }
      for (let i = 0, len = this.SPEC.length; i < len; i++) {
        if(this.SPEC[i] === ""){
          return false;
        }
      }
      for (let i = 0, len = this.SELDIS.length; i < len; i++) {
        if(this.SELDIS[i] === -1){
          return false;
        }
      }
      return true;
    }
  }
}
</script>

<style scoped>
button.primary {
  background-color: #409eff;
  color: #ffffff;
}
</style>
