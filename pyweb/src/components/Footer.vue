<template>
  <!-- <q-footer reveal> -->
    <div class="footer">
      <div>
        <p>Patrocinadores:</p>
      </div>
      <div>
        <p>Redes sociales:</p>
        <div class="social-network">
          <a href="mailto:pycampes@gmail.com" target="_blank"
            ><img
              class="social-network-icons"
              src="@/assets/footer_icons/email.png"
          /></a>
          <a href="https://twitter.com/PyCampES" target="_blank"
            ><img
              class="social-network-icons"
              src="@/assets/footer_icons/twitter.png"
          /></a>
          <a href="https://www.facebook.com/pycampes" target="_blank"
            ><img
              class="social-network-icons"
              src="@/assets/footer_icons/facebook.png"
          /></a>
          <a href="https://www.instagram.com/pycampes/" target="_blank"
            ><img
              class="social-network-icons"
              src="@/assets/footer_icons/instagram.png"
          /></a>
          <a href="https://t.me/pycampes" target="_blank"
            ><img
              class="social-network-icons"
              src="@/assets/footer_icons/telegram.png"
          /></a>
        </div>
      </div>
      <span> Icon made by Freepik from www.flaticon.com </span>
      <span> Icon made by Eucalyp from www.flaticon.com </span>
    </div>
  <!-- </q-footer> -->
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  background-color: #99d98c;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
p {
  text-align: center;
  color: black;
}
span {
  color: black;
}
.social-network {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 0.5rem;
}
img {
  width: 32px;
  height: 32px;
}
</style>
