<template>
  <div class="cronometro">
    <div class="content">
      <div class="minuto">
        <div v-show="minuto<10" class="minuto">0</div>

        {{this.minuto}}
      </div>

      <div id="ponto">:</div>
      <div class="segundo">
        <div v-show="segundo<10" class="segundo">0</div>
        {{this.segundo}}
      </div>
    </div>
    <div class="btns">
      <div id="parar">
        <input
          v-show="start && !wait"
          type="button"
          style="background: #bcbcbc;width:120px;"
          value="Parar"
          @click="stop();"
        />
      </div>
      <div id="comeca">
        <input v-show="!start" @click="play()" type="button" style="width:120px" value="Play" />
      </div>

      <input
        style="width:120px;"
        v-show="start && wait"
        type="button"
        @click="conti();"
        value="Continuar"
      />
      <br />
      <br />

      <input
        style="background:red;width:120px;"
        v-show="start"
        type="button"
        @click="clean();"
        value="Limpar"
      />
      <br />
      <br />
      <div id="voltas"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cronometro",
  data: function() {
    return {
      intervalo: "",
      backM: 0,
      backS: 0,
      minuto: 0,
      segundo: 0,
      start: false,
      wait: false
    };
  },
  methods: {
    play() {
      this.start = true;
      this.intervalo = setInterval(() => {
        if (this.segundo == 60) {
          this.segundo = 0;
          this.minuto++;
        } else {
          this.segundo++;
        }

        if (this.minuto == 25) {
          // alert("Seu treino foi concluido");
          this.minuto = 0;
          this.segundo = 0;
        }
        this.backM = this.minuto;
        this.backS = this.segundo;
      }, 1000);
    },
    stop() {
      clearInterval(this.intervalo);
      this.wait = true;
    },
    conti() {
      this.wait = false;
      this.minuto = this.backM;
      this.segundo = this.backS;
      this.play();
    },
    clean() {
      clearInterval(this.intervalo);
      this.start = false;
      this.minuto = 0;
      this.segundo = 0;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

.minuto,
.segundo {
  color: #21232f;
  font-family: sans-serif;
  font-size: 100px;
  text-align: center;
  font-weight: 600 !important;
  display: flex;
  flex-direction: row;
}
#label {
  font-size: 10px;
  margin-top: -2%;
}

#ponto {
  color: #21232f;
  font-family: "Montserrat", "Open Sans", sans-serif;
  font-size: 80px;
  display: flex;
  align-items: start-end;
  justify-content: center;
  font-weight: 600;
}

.content,
.btns {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.btns {
  
}
.cronometro {
  margin-top: 20%;
  
}
.btns input {
  margin: 5px;
}
input {
  background-color: #43d688;
  color: #fff;
  font-size: 16px;
  padding: 15px 25px;
  border-radius: 50px;
  text-decoration: none;
  border: none;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  min-width: 100px;
  text-align: center;
  margin: 0 15px;
}
textarea:focus,
input:focus {
  outline: none !important;
}
</style>