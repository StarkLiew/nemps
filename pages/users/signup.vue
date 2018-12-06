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
          <div class="text-xs-center">
            <logo/>
            <h1>DevOps</h1>
            <p>Create an account</p>
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
            <v-form>
              <v-card-text>
                <v-text-field
                  id="firstname"
                  name="firstname"
                  label="First Name"
                  placeholder="e.g. Stark"
                  required
                />
                <v-text-field
                  id="lastname"
                  name="lastname"
                  label="Last Name"
                  placeholder="e.g. Liew"
                  required
                />
                <v-text-field
                  id="email"
                  name="email"
                  label="Email address"
                  placeholder="e.g. stark.liew@mail.com"
                  type="email"
                  required
                />
                <v-text-field
                  id="password"
                  :append-icon="showPass ? 'visibility_off' : 'visibility'"
                  :rules="rules.password"
                  :type="showPass ? 'text' : 'password'"
                  name="password"
                  label="Password"
                  placeholder="e.g. Abc@1234"
                  hint="At least 8 characters"
                  required
                  @click:append="showPass = !showPass"
                />
                <v-text-field
                  id="companyname"
                  name="companyname"
                  label="Company name"
                  placeholder="e.g. Stark Salon"
                  required
                />
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  outline
                  block
                  nuxt
                  to="/inspire">CREATE MY ACCOUNT</v-btn>
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
          <div class="text-xs-center">
            <p>Already have an account?
              <router-link :to="{path:'/'}">Sign In</router-link>
            </p>
          </div> 

          <v-footer>
            <div>&copy; 2019 StarkLiew</div>
            <v-spacer/>
            <div>
              <a 
                v-link="{path:'/users/register'}" 
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
      showPass: false,
      valid: false,
      rules: {
        name: [
          v => !!v || 'Name is required',
          v => v.length <= 10 || 'Name must be less than 10 characters'
        ],
        password: [
          v => !!v || 'Password is required.',
          v => (v && v.length >= 8) || 'Min 8 characters'
        ]
      }
    }
  },
  layout(context) {
    return 'visitor'
  }
}
</script>
