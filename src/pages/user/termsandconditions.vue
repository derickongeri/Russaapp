<template>
  <q-page class="q-pa-md">
    <q-card flat>
      <q-card-section>
        <!-- <div class="text-h5 text-center q-mb-md">
          Terms and Conditions
        </div> -->


          <div class="q-pa-sm">
            <p class="q-mb-md">
              <strong>Introduction</strong>
              <br />
              Welcome to [Your App Name]. These terms and conditions outline the rules and regulations for the use of our service.
            </p>
            <p class="q-mb-md">
              <strong>1. Acceptance of Terms</strong>
              <br />
              By accessing or using this service, you agree to abide by the terms outlined in this document.
            </p>
            <p class="q-mb-md">
              <strong>2. User Responsibilities</strong>
              <br />
              You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device.
            </p>
            <p class="q-mb-md">
              <strong>3. Data Privacy</strong>
              <br />
              We respect your privacy. Please review our Privacy Policy for information on how we collect, use, and protect your data.
            </p>
            <p class="q-mb-md">
              <strong>4. Community Guidelines</strong>
              <br />
              Our platform is a place for individuals to share their experiences. We ask all users to be respectful and kind when posting content.
            </p>
            <p class="q-mb-md">
              <strong>5. Limitation of Liability</strong>
              <br />
              [Your App Name] is not liable for any damages or losses arising from the use of the service, either direct or indirect.
            </p>
            <p class="q-mb-md">
              <strong>6. Modifications to the Terms</strong>
              <br />
              We may modify these terms from time to time. Any changes will be reflected on this page.
            </p>
            <p class="q-mb-md">
              <strong>7. Governing Law</strong>
              <br />
              These terms and conditions shall be governed by the laws of [Your Country].
            </p>
          </div>

      </q-card-section>

      <q-card-actions>
        <q-btn to="/home" label="Back to Home" color="primary" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'TermsAndConditions',
}
</script>

<style scoped>
/* You can customize the styles here */
.q-page {
  background-color: #f9f9f9;
}

.q-card {
  max-width: 800px;
  margin: auto;
}
</style>
