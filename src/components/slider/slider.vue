<!-- <template>
  <div class="col-lg-12 control-section slider-default">
    <div class='content_wrapper'>
        <div class='sliderwrap default'>
            <label class='labeltext'>Default Slider</label>
            <ejs-slider id='default' v-model="value"></ejs-slider>
        </div>
        <div class='sliderwrap default'>
            <label class='labeltext'>MinRange Slider</label>
            <ejs-slider id='minrange' v-model="minValue" type="MinRange"></ejs-slider>
        </div>
        <div class='sliderwrap default'>
            <label class='labeltext'>Range Slider</label>
            <ejs-slider id='range' v-model="rangevalue" type="Range"></ejs-slider>
        </div>
    </div>

  </div>
</template>
<style>
    .slider-default .content_wrapper {
        width: 40%;
        margin: 0 auto;
        min-width: 185px;
    }

    .slider-default .sliderwrap.default{
        margin-top: 40px;
    }

    .e-bigger .slider-default .content_wrapper {
        width: 80%;
    }

    .slider-default .sliderwrap label {
        padding-bottom: 26px;
        font-size: 13px;
        font-weight: 500;
        margin-top: 15px;
    }

</style>
<script>
import Vue from "vue";
import { SliderPlugin } from "@syncfusion/ej2-vue-inputs";
Vue.use(SliderPlugin);
export default Vue.extend({
  data: function() {
    return {
      value: 30,
      minValue: 30,
      rangevalue: [30,70]
    };
  }
});
</script> -->
