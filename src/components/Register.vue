<template>
  <AuthLayout>
    <div class="card-header">Register</div>

    <div class="card-body">
      <div class="form-group row">
        <label for="name" class="col-md-4 col-form-label text-md-right"
          >Name</label
        >

        <div class="col-md-6">
          <input
            type="text"
            class="form-control"
            name="name"
            autocomplete="name"
            v-model="name"
          />
        </div>
      </div>

      <div class="form-group row">
        <label for="email" class="col-md-4 col-form-label text-md-right"
          >E-Mail Address</label
        >

        <div class="col-md-6">
          <input
            v-model="email"
            type="email"
            class="form-control"
            name="email"
            value=""
            required=""
            autocomplete="email"
          />
        </div>
      </div>

      <div class="form-group row">
        <label for="password" class="col-md-4 col-form-label text-md-right"
          >Password</label
        >

        <div class="col-md-6">
          <input
            v-model="password"
            type="password"
            class="form-control"
            name="password"
            required=""
            autocomplete="new-password"
          />
        </div>
      </div>

      <div class="form-group row mb-0">
        <div class="col-md-6 offset-md-4">
          <button type="submit" class="btn btn-primary" @click="register">Register</button>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async register() {
      try {
        const response = await this.$axios.post('/auth/register', {
          email: this.email,
          password: this.password,
          name: this.name,
        })
        localStorage.setItem('authToken', response.data.token)
        this.$root.user = response.data.user
        this.initSocket()
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>