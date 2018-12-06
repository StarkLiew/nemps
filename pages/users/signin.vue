<template> 
  <v-layout
    column
    justify-space-between>
    <div>
      <v-layout justify-center>
        <v-flex 
          xs12 
          sm6 
          md4>
          <div class="text-xs-center text-sm-center text-md-center">
            <logo/>
            <h1>DevOps</h1>
            <p>Sign in to your account</p>
          </div>
        </v-flex>
      </v-layout>
    </div>
    <div>
      <v-layout justify-center>
        <v-flex 
          xs12 
          sm6 
          md4>
          <v-card class="loginCard">
            <v-form v-model="valid">
              <v-card-text>
                <v-text-field
                  id="email"
                  :rules="rules.email"
                  name="email"
                  label="Email address"
                  placeholder=""
                  type="email"
                  required
                />
                <v-text-field
                  id="password"
                  :rules="rules.password"
                  name="password"
                  label="Password"
                  placeholder=""
                  type="password"
                  required
                />
              </v-card-text>
              <v-card-actions>
                <v-btn
                  :disabled="!valid"
                  color="primary"
                  outline
                  block
                  nuxt
                  to="/inspire">SIGN IN</v-btn>
              </v-card-actions>
            </v-form> 
          </v-card>
        </v-flex>
      </v-layout>
    </div>
    <div> 
      <v-layout justify-center>
        <v-flex 
          xs12 
          sm6 
          md4>
          <div class="text-xs-center text-sm-center text-md-center">
            <p>
              <router-link :to="{path:'/users/forgot'}">Forgot password?</router-link>
            </p>
            <p>Don’t have an account?
              <router-link :to="{path:'/users/signup'}">Sign Up</router-link>
            </p>
          </div> 

          <v-footer>
            <div>&copy; 2019 StarkLiew</div>
            <v-spacer/>
            <div>
              <a 
                v-link="{path:'/users/support'}" 
                href="#"
              >Support Center</a>
            </div>
          </v-footer>
        </v-flex>
      </v-layout>
    </div>  
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      valid: false,
      rules: {
        email: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        password: [v => !!v || 'Password is required']
      }
    }
  },
  layout(context) {
    return 'visitor'
  }
}
</script>
