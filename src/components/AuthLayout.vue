<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="/">
          <img src="../assets/favicon.png" alt="logo" style="width: 45px" />
          <h2 class="ml-2 mb-0" style="font-weight: 400">Realtime Chat App</h2>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!-- Left Side Of Navbar -->
          <ul class="navbar-nav mr-auto"></ul>

          <!-- Right Side Of Navbar -->
          <ul class="navbar-nav ml-auto">
            <!-- Authentication Links -->
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/login"
                exact
                >Login
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/register"
                exact
                >Register
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="py-4">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>