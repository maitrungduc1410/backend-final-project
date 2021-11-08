<template>
  <AuthLayout>
    <div class="card-header">Login</div>

    <div class="card-body">
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
            required
            autocomplete="email"
            autofocus
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
            required
            autocomplete="current-password"
          />
        </div>
      </div>

      <div class="form-group row mb-0">
        <div class="col-md-8 offset-md-4">
          <button type="submit" class="btn btn-primary" @click="login">Login</button>
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
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      try {
        const response = await this.$axios.post('/auth/login', {
          email: this.email,
          password: this.password
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