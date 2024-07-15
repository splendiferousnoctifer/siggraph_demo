<template>
  <div>
    <h1>Fill Out Information</h1>
    <el-form ref="form" :model="formData" :rules="rules" label-position="top" size="large">
      <el-form-item label="Age Group" prop="age">
        <el-select v-model="formData.age" placeholder="Select your age group" required size="large" style="width:300px">
          <el-option label="Under 18" value="Under 18"></el-option>
          <el-option label="18-24" value="18-24"></el-option>
          <el-option label="25-34" value="25-34"></el-option>
          <el-option label="35-44" value="35-44"></el-option>
          <el-option label="45-54" value="45-54"></el-option>
          <el-option label="55-64" value="55-64"></el-option>
          <el-option label="65 and over" value="65 and over"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Gender" prop="gender">
        <el-select v-model="formData.gender" placeholder="Select your gender" required size="large" style="width:300px">
          <el-option label="Male" value="male"></el-option>
          <el-option label="Female" value="female"></el-option>
          <el-option label="Diverse" value="diverse"></el-option>
          <el-option label="Prefer not to say" value="prefer not to say"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Handedness" prop="handedness">
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
import { ElMessage } from 'element-plus';
import router from '../router'; // Adjust the path as necessary

export default defineComponent({
  name: 'FormPage',
  data() {
    return {
      formData: {
        age: '',
        gender: '',
        handedness: '',
      },
      rules: {
        age: [
          { required: true, message: 'Age group is required', trigger: 'change' }
        ],
        gender: [
          { required: true, message: 'Gender is required', trigger: 'change' }
        ],
        handedness: [
          { required: true, message: 'Handedness is required', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid: boolean) => {
        if (valid) {
          localStorage.setItem('formData', JSON.stringify(this.formData));
          const nextRoute = router.getRoutes().find(route => route.meta.order === this.$route.meta.order + 1);
          if (nextRoute) {
            this.$router.push({ name: nextRoute.name });
          } else {
            ElMessage.error('No next route found.');
          }        
        } else {
          ElMessage.error('Please complete the form before continuing.');
          return false;
        }
      });
    }
  }
});
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

form label {
  font-weight: 500;
}

form select,
form input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
}

.radio-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.radio-group label {
  font-weight: 500;
  display: flex;
  align-items: center;
}

form input[type="radio"] {
  margin-right: 10px;
}

</style>
