<template>
  <q-page class="q-pa-none">
    <div class="row q-pt-md q-px-md q-my-md head-text" style="width: 100%">
      Welcome back, {{ username }}
    </div>

    <!-- <div class="q-pa-md q-my-lg header-div" id="quick-actions">
      <div class="quick-actions">
        <div class="row q-gutter-x-md">
          <div class="quick-actions-btn">
            <div class="my-bubble"></div>
          </div>

          <div class="quick-actions-btn" style="rotate: 180deg">
            <div class="my-bubble"></div>
          </div>
        </div>
                <div class="row q-gutter-x-md">
          <div class="quick-actions-btn">
            <div class="my-bubble"></div>
          </div>

          <div class="quick-actions-btn" style="rotate: 120deg">
            <div class="my-bubble"></div>
          </div>
        </div>
      </div>
    </div> -->

    <div>
      <div>
        <carouselContent />
      </div>

      <div class="row q-px-sm justify-between" style="width: 100%">
        <div v-for="item in journalList" :key="item.id" class="col-6">
          <div class="q-pa-sm" style="width: 100%">
            <q-btn
              flat
              no-caps
              class="full-width log-button"
              color="grey-8"
              push
              :style="{
                'background-color': item.bgColor,
                'border-radius': '10px',
                height: '16vh',
              }"
              @click="goToPage(item.routeName)"
            >
              <div
                class="column justify-around items-start no-wrap"
                style="width: 100%; height: 100%"
              >
                <div class="col q-pt-sm self-start text-center">
                  <q-icon size="32px" :name="item.icon"></q-icon>
                </div>
                <div class="col-2 head-text q-py-sm" style="font-size: 20px">
                  {{ item.name }}
                </div>
                <div
                  class="col caption-text text-grey-7 q-py-md"
                  style="font-size: 16px"
                >
                  {{ item.description }}
                </div>
              </div>
            </q-btn>
          </div>
        </div>
      </div>

      <!-- <div class="row text-primary q-px-md" style="width: 100%">
        <div class="header-home q-my-" style="width: 100%">
          <div
            class="row q-pa-md caption-text"
            style="width: 100%; border-bottom: 1px solid; font-weight: 600"
          >
            Quick Actions
          </div>
          <div class="row justify-between q-py-md q-px-xs">
            <q-btn flat no-caps color="grey-9" push to="/siku">
              <div class="column items-center q-gutter-y-sm no-wrap">
                <q-avatar
                  size="48px"
                  class="shadow-1"
                  color="primary"
                  text-color="grey-1"
                  ><q-icon size="24px" name="ti-plus"></q-icon
                ></q-avatar>
                <div class="text-center">
                  Daily <br />
                  Journal
                </div>
              </div>
            </q-btn>

            <q-btn flat no-caps color="grey-9" push>
              <div class="column items-center q-gutter-y-sm no-wrap">
                <q-avatar
                  size="48px"
                  class="shadow-1"
                  color=""
                  text-color="grey-9"
                  ><q-icon size="24px" name="ti-blackboard"></q-icon
                ></q-avatar>
                <div class="text-center">
                  My <br />
                  Experiments
                </div>
              </div>
            </q-btn>
            <q-btn flat no-caps color="grey-9" push>
              <div class="column items-center q-gutter-y-sm no-wrap">
                <q-avatar
                  size="42px"
                  class="shadow-1"
                  color=""
                  text-color="grey-9"
                  ><q-icon size="24px" name="ti-file"></q-icon
                ></q-avatar>
                <div class="text-center">
                  Health <br />
                  Report
                </div>
              </div>
            </q-btn>

            <q-btn flat no-caps color="grey-9" push>
              <div class="column items-center q-gutter-y-sm no-wrap">
                <q-avatar
                  size="48px"
                  class="shadow-1"
                  color=""
                  text-color="grey-9"
                  ><q-icon size="24px" name="ti-thumb-up"></q-icon
                ></q-avatar>
                <div class="text-center">
                  Review <br />
                  Treatment
                </div>
              </div>
            </q-btn>
          </div>
          <div class="row justify-between q-py-md q-px-xs">
            <q-btn flat no-caps color="grey-9" push>
              <div class="column items-center q-gutter-y-sm no-wrap">
                <q-avatar
                  size="48px"
                  class="shadow-1"
                  color=""
                  text-color="grey-9"
                  ><q-icon size="24px" name="ti-agenda"></q-icon
                ></q-avatar>
                <div class="text-center">
                  Daily <br />
                  Journal
                </div>
              </div>
            </q-btn>

            <q-btn flat no-caps color="grey-9" push>
              <div class="column items-center q-gutter-y-sm no-wrap">
                <q-avatar
                  size="48px"
                  class="shadow-1"
                  color=""
                  text-color="grey-9"
                  ><q-icon size="24px" name="ti-blackboard"></q-icon
                ></q-avatar>
                <div class="text-center">
                  Learn <br />
                  Basics
                </div>
              </div>
            </q-btn>

            <q-btn flat no-caps color="grey-9" push>
              <div class="column items-center q-gutter-y-sm no-wrap">
                <q-avatar
                  size="48px"
                  class="shadow-1"
                  color=""
                  text-color="grey-9"
                  ><q-icon size="24px" name="ti-comments"></q-icon
                ></q-avatar>
                <div class="text-center">
                  Engage <br />
                  Community
                </div>
              </div>
            </q-btn>

            <q-btn flat no-caps color="grey-9" push>
              <div class="column items-center q-gutter-y-sm no-wrap">
                <q-avatar
                  size="42px"
                  class="shadow-1"
                  color=""
                  text-color="grey-9"
                  ><q-icon size="24px" name="ti-file"></q-icon
                ></q-avatar>
                <div class="text-center">
                  Health <br />
                  Report
                </div>
              </div>
            </q-btn>
          </div>
        </div>
      </div> -->
    </div>

    <div>
      <div class="row q-px-md q-my-md head-text" style="width: 100%">
        The Basics
      </div>

      <div class="horizontal-content q-my-lg">
        <q-scroll-area
          class=""
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="height: 30vh; max-width: 100%"
        >
          <div class="row q-px-sm no-wrap">
            <div
              v-for="n in 10"
              :key="n"
              style="width: 85vw; height: 30vh"
              class="q-pa-sm"
            >
              <q-card
                class="my-card bg-lime-1"
                flat
                style="border-radius: 20px; height: 100%"
              >
                <q-img src="~/src/assets/bgImg4.png" style="height: 55%" />

                <q-card-section>
                  <div class="caption-text">
                    How to keep hydrated during perimenopause and menopause
                  </div>
                  <!-- <div class="text-h6">Our Changing Planet</div> -->
                  <div class="text-subtitle2">by John Doe</div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-scroll-area>
      </div>

      <div class="row q-px-md q-my-md head-text" style="width: 100%">
        Expert Articles
      </div>

      <div class="horizontal-content q-my-lg">
        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="height: 35vh; max-width: 100%"
        >
          <div class="row q-px-sm no-wrap">
            <div
              v-for="n in 10"
              :key="n"
              style="width: 85vw; height: 30vh"
              class="q-pa-sm"
            >
              <q-card class="my-card" flat style="border-radius: 20px">
                <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

                <q-card-section>
                  <div class="text-h6">Our Changing Planet</div>
                  <div class="text-subtitle2">by John Doe</div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>

    <stories />

    <q-separator insert />

    <!-- <div class="row q-px-md" style="width: 100%">
      <div class="card-home q-my-xs"></div>
    </div> -->

    <div class="row q-mt-lg q-mb-md q-px-md" style="width: 100%">
      <q-btn no-caps flat class="card-home action-card-1 q-my-xs">
        <div
          class="column justify-around q-px-md items-start"
          style="width: 100%"
        >
          <div class="caption-text text-grey-7 q-py-md" style="font-size: 16px">
            Tell us what you think about the app
          </div>
          <div
            class="col text-grey-0 head-text q-py-sm"
            style="font-size: 20px"
          >
            Share feedback <i class="fa-regular fa-message"></i>
          </div>
        </div>
      </q-btn>
    </div>

    <div class="row q-mt-lg q-mb-md q-px-md" style="width: 100%">
      <q-btn
        @click="shareContent"
        no-caps
        flat
        class="card-home action-card-2 q-my-xs"
      >
        <div
          class="column justify-around q-px-md items-start"
          style="width: 100%"
        >
          <div class="caption-text text-grey-7 q-py-md" style="font-size: 16px">
            Recomend the app to a friend
          </div>
          <div
            class="col text-grey-0 head-text q-py-sm"
            style="font-size: 20px"
          >
            Share now <i class="fa-solid fa-arrow-up-from-bracket"></i>
          </div>
        </div>
      </q-btn>
    </div>

    <div class="row q-mt-lg q-mb-md q-px-md" style="width: 100%">
      <q-btn no-caps flat class="card-home action-card-3 q-my-xs">
        <div
          class="column justify-around q-px-md items-start"
          style="width: 100%"
        >
          <div class="caption-text text-grey-7 q-py-md" style="font-size: 16px">
            Recomend the app to a friend
          </div>
          <div
            class="col text-grey-0 head-text q-py-sm"
            style="font-size: 20px"
          >
            Book a consultation
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </div>
        </div>
      </q-btn>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, ref, watch, computed } from "vue";
import carouselContent from "src/components/homepage/carousel.vue";
import userAuthUser from "src/composables/userAuthUser";
import stories from "src/components/Reusables/storiesSlides.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const { user } = userAuthUser();
const username = computed(() => {
  return user.value.user_metadata.firstName
});

const journalList = ref([
  {
    name: "Daily log",
    description: "Some descriptive text",
    bgColor: "#A8DADC50", // Example color
    icon: "mdi-notebook-heart-outline",
    routeName: "signs",
  },
  {
    name: "Your Health",
    description: "Some descriptive text",
    bgColor: "#FFCCCC50", // Example color
    icon: "mdi-face-woman-shimmer-outline",
    routeName: "maarifa",
  },
  {
    name: "Community",
    description: "Some descriptive text",
    bgColor: "#CCCCFF50", // Example color
    icon: "mdi-open-in-new",
    routeName: "utu",
  },
  {
    name: "Movement",
    description: "Some descriptive text",
    bgColor: "#CCFFCC50", // Example color
    icon: "mdi-dumbbell",
    routeName: "movement",
  },
]);

const goToPage = (val) => {
  router.push({
    name: val,
  });
};

function canBrowserShareData(data) {
  if (!navigator.share || !navigator.canShare) {
    return false;
  }

  return navigator.canShare(data);
}

const shareContent = async () => {
  const sharedDataSample = {
    title: "Some text title",
    text: "More text",
    url: "A url we want to share",
  };

  try {
    await navigator.share(sharedDataSample);
    // resultPara.textContent = "MDN shared successfully";
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

const thumbStyle = ref({
    right: "4px",
    borderRadius: "5px",
    backgroundColor: "#027be300",
    width: "5px",
    opacity: 0.75,
  }),
  barStyle = ref({
    right: "2px",
    borderRadius: "9px",
    backgroundColor: "#027be300",
    width: "9px",
    opacity: 0.2,
  });
</script>

<style lang="scss">
.carousel {
  background-color: #f8f9f4;
}
</style>
