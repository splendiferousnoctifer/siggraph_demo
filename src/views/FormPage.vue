<template>
  <div>
    <h1>Fill Out Information</h1>
    <el-form @submit.prevent="submitForm" label-position="top" size="large" :label-width="100">
      <el-form-item label="Age">
        <el-input-number v-model="formData.age" required></el-input-number>
      </el-form-item>
      <el-form-item label="Gender">
        <el-select v-model="formData.gender" placeholder="Select your gender" required size="large" style="width:300px">
          <el-option label="Male" value="male"></el-option>
          <el-option label="Female" value="female"></el-option>
          <el-option label="Diverse" value="diverse"></el-option>
          <el-option label="Prefer not to say" value="prefer not to say"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Handedness">
        <el-radio-group v-model="formData.handedness" required size="large">
          <el-radio-button label="right handed">Right handed</el-radio-button>
          <el-radio-button label="left handed">Left handed</el-radio-button>
          <el-radio-button label="ambidextrous">Ambidextrous</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button class="button" @click="submitForm">Continue</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormPage',
  data() {
    return {
      formData: {
        age: '',
        gender: '',
        handedness: '',
      },
    };
  },
  methods: {
    submitForm() {
      localStorage.setItem('formData', JSON.stringify(this.formData));
      this.$router.push('/drawingTest');
    },
  },
});
</script>

