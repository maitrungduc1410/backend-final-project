<template>
  <div class="h-100 app-container">
    <div class="h-100 container position-relative chat-container">
      <div class="app-header clearfix">
        <router-link
          to="/"
          class="float-left router-link-active"
          style="text-decoration: none"
          ><h2 class="text-white">Realtime Chat App</h2>
        </router-link>
        <div class="btn-logout float-right">
          <a
            href="/logout"
            onclick="event.preventDefault();
                            document.getElementById('logout-form').submit();"
            class="btn btn-danger"
          >
            Logout
          </a>
          <form
            id="logout-form"
            action="/logout"
            method="POST"
            style="display: none"
          >
            <input
              type="hidden"
              name="_token"
              value="DyJ70zkDX3kpynwPSLABt999zqizA9U3ZZSZmN81"
            />
          </form>
        </div>
      </div>
      <div class="row justify-content-center h-100">
        <div class="col-md-12 chat">
          <div class="card">
            <div class="card-header msg_head">
              <div class="bd-highlight">
                <div class="user_info"><span>Chatroom</span></div>
                <div class="text-white ml-3">Where heroes rise</div>
              </div>
            </div>
            <div class="card-body msg_card_body" id="chat-container">
              <div v-for="message in messages" :key="message.id">
                <div class="msg-item d-flex justify-content-end mb-4" v-if="message.author._id === $root.user._id">
                  <div
                    data-toggle="tooltip"
                    data-placement="top"
                    :title="message.createdAt | toLocalTime"
                    class="msg_container_send"
                  >
                    <div><span class="highlightText"></span></div>
                  </div>
                  <div
                    data-toggle="tooltip"
                    data-placement="top"
                    :title="message.author.name"
                    class="img_cont_msg"
                  >
                    <img
                      src="../assets/current_user.jpeg"
                      class="rounded-circle user_img_msg"
                    />
                  </div>
                </div>
                <div class="msg-item d-flex justify-content-start mb-4" v-else>
                  <div
                    data-toggle="tooltip"
                    data-placement="top"
                    :title="message.author.name"
                    class="
                      img_cont_msg
                      bg-white
                      rounded-circle
                      d-flex
                      justify-content-center
                      align-items-center
                    "
                  >
                    <span
                      class="
                        rounded-circle
                        d-flex
                        justify-content-center
                        align-items-center
                      "
                      style="background-color: rgb(200, 243, 121)"
                      >{{ message.author.name[0] }}</span
                    >
                  </div>
                  <div
                    data-toggle="tooltip"
                    data-placement="top"
                    :title="message.createdAt | toLocalTime"
                    class="msg_container"
                  >
                    <div>{{ message.text }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <div class="input-group">
                <textarea
                  placeholder="Type your message..."
                  class="form-control type_msg"
                  v-model="text"
                  @keyup.enter="saveMessage"
                ></textarea>
                <div class="input-group-append">
                  <span class="input-group-text send_btn"
                    ><i class="fas fa-location-arrow"></i
                  ></span>
                </div>
              </div>
            </div>
            <!---->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      text: "",
    };
  },
  created() {
    this.loadMessages()
  },
  mounted() {
    // eslint-disable-next-line no-undef
    $(function () {
      // eslint-disable-next-line no-undef
      $('[data-toggle="tooltip"]').tooltip();
    });
  },
  methods: {
    async loadMessages() {
      try {
        const response = await this.$axios.get('/messages')

        this.messages = response.data
      } catch (error) {
        console.log(error)
      }
    },
    async saveMessage() {
      try {
        const response = await this.$axios.post('/messages', {
          text: this.text
        })

        this.messages.push(response.data)
        this.text = ''
        this.$nextTick(() => {
          this.scrollToBottom()
        })
      } catch (error) {
        console.log(error)
      }
    },
    scrollToBottom() {
      const el = document.getElementById('chat-container')
      el.scrollTo({
        top: el.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
};
</script>
<style lang="scss">
body,
html,
#app {
  height: 100%;
  margin: 0;
}
.app-container {
  background: #0078d4;
  background-image: -o-linear-gradient(0deg, #0078d4, #00bcf2);
  background-image: -moz-linear-gradient(0deg, #0078d4, #00bcf2);
  background-image: -webkit-linear-gradient(0deg, #0078d4, #00bcf2);
  background-image: linear-gradient(0deg, #0078d4, #00bcf2);
  .app-header {
    position: absolute;
    width: 100%;
    top: 30px;
    .btn-logout {
      margin-right: 30px;
    }
  }
}
.chat {
  margin-top: auto;
  margin-bottom: auto;
  .card {
    height: 500px;
    border-radius: 15px !important;
    background-color: rgba(0, 0, 0, 0.4) !important;
    .card-header {
      border-radius: 15px 15px 0 0 !important;
      border-bottom: 0 !important;
      .search_btn {
        border-radius: 0 15px 15px 0 !important;
        background-color: rgba(0, 0, 0, 0.3) !important;
        border: 0 !important;
        color: white !important;
        cursor: pointer;
      }
      .search {
        border-radius: 15px 0 0 15px !important;
        background-color: rgba(0, 0, 0, 0.3) !important;
        border: 0 !important;
        color: white !important;
        &:focus {
          box-shadow: none !important;
          outline: 0px !important;
        }
      }
    }
    .msg_head {
      position: relative;
    }
    .msg_card_body {
      overflow-y: auto;
    }
    .card-footer {
      border-radius: 0 0 15px 15px !important;
      border-top: 0 !important;
      .type_msg {
        background-color: rgba(0, 0, 0, 0.3) !important;
        border: 0 !important;
        color: white !important;
        height: 60px !important;
        overflow-y: auto;
        border-radius: 15px 0 0 15px !important;
        &:focus {
          box-shadow: none !important;
          outline: 0px !important;
        }
      }
      .send_btn {
        border-radius: 0 15px 15px 0 !important;
        background-color: rgba(0, 0, 0, 0.3) !important;
        border: 0 !important;
        color: white !important;
        cursor: pointer;
      }
    }
  }
  .contacts_body {
    padding: 0.75rem 0 !important;
    overflow-y: auto;
    white-space: nowrap;
    .contacts {
      list-style: none;
      padding: 0;
      li {
        width: 100% !important;
        padding: 5px 10px;
        transition: background-color 0.2s;
        cursor: pointer;
        position: relative;
        &:hover {
          background-color: rgba(0, 0, 0, 0.3);
        }
        &.active {
          background-color: rgba(0, 0, 0, 0.3);
        }
        .current-user-mark {
          height: 100%;
          width: 3px;
          background: #00ffa4;
          position: absolute;
          left: 0;
          top: 0;
        }
        .img_cont {
          position: relative;
          .user_img {
            height: 45px;
            width: 45px;
            border: 2px solid #f5f6fa;
          }
        }
      }
    }
  }
}
.container {
  align-content: center;
}
.user_img_msg {
  height: 40px;
  width: 40px;
  border: 2px solid #f5f6fa;
}
.online_icon {
  position: absolute;
  height: 15px;
  width: 15px;
  background-color: #4cd137;
  border-radius: 50%;
  bottom: 17px;
  right: 0;
  border: 2px solid white;
}
.offline {
  background-color: #c2c2c2 !important;
}
.user_info {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 15px;
}
.user_info span {
  font-size: 20px;
  color: white;
}
.user_info p {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6);
}
.msg_container {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 10px;
  border-radius: 25px;
  background-color: #00a0e5;
  padding: 10px;
  position: relative;
  color: white;
  word-break: break-word;
  max-width: 70%;
}
.msg_container_send {
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
  border-radius: 25px;
  background-color: #42e274;
  padding: 10px;
  position: relative;
  color: white;
  word-break: break-word;
  max-width: 70%;
}
@media (max-width: 768px) {
  .app-container {
    height: auto !important;
    .app-header {
      position: initial;
      padding-top: 30px;
      .btn-logout {
        margin-right: 0;
      }
    }
    .chat {
      margin-top: 1rem;
      &:last-child,
      &:first-child {
        margin-top: 1rem;
      }
    }
  }
}
@media (max-width: 576px) {
  .contacts_card {
    margin-bottom: 15px !important;
  }
}
.font-12px {
  font-size: 12px !important;
}
.private-message-container {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: white;
  position: absolute;
  bottom: 0;
  right: 10px;
  width: 300px;
  &.expand {
    height: 350px;
  }
  .chat-header {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    transition: background-color 0.2s;
    cursor: pointer;
    &:hover {
      background-color: #e6e5e5;
    }
    .img_cont {
      position: relative;
    }
    .btn-close {
      position: absolute;
      right: 15px;
      top: 15px;
      outline: none;
      border: none;
      background: none;
      i {
        font-size: 18px;
        transition: transform 0.2s;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
  .private-chat-body {
    height: calc(100% - 65px - 40px);
    overflow-y: scroll;
    .msg_container_send {
      padding: 5px 10px 5px 10px !important;
      border-radius: 15px !important;
      max-width: 165px;
    }
    .msg_container {
      padding: 5px 10px 5px 10px !important;
      border-radius: 15px !important;
      max-width: 165px;
    }
  }
  .text-input {
    input {
      height: 40px;
      border: none;
      border-top: solid 1px #ddd;
      outline: none;
      padding: 7px;
      font-size: 12px;
    }
  }
}
.img_cont_msg {
  width: 40px;
  height: 40px;
  span {
    width: 36px;
    height: 36px;
  }
}
@keyframes wave {
  0%,
  60%,
  100% {
    transform: initial;
  }
  30% {
    transform: translateY(-15px);
  }
}
#wave {
  .dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 1px;
    background: white;
    animation: wave 1.3s linear infinite;
    margin-bottom: 3px;
    &:nth-child(2) {
      animation-delay: -1.1s;
    }
    &:nth-child(3) {
      animation-delay: -0.9s;
    }
  }
}
.blink-anim {
  animation: blink 2s infinite;
}
@keyframes wave {
  0%,
  60%,
  100% {
    transform: initial;
  }
  30% {
    transform: translateY(-7px);
  }
}
@keyframes blink {
  0%,
  100% {
    background: white;
  }
  50% {
    background: #2e7fd7;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.slide {
  &-left,
  &-right {
    &-enter,
    &-leave {
      &-active {
        transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
      }
    }
  }
}
.slide {
  &-left-enter,
  &-right-leave-active {
    opacity: 0;
    transform: translate(30px, 0);
  }
}
.slide {
  &-left-leave-active,
  &-right-enter {
    opacity: 0;
    transform: translate(-30px, 0);
  }
}
</style>