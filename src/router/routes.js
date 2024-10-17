
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/home.vue"),
        meta: { title: "Rusa", requiresAuth: true },
      },
      {
        path: "/utu",
        name: "utu",
        component: () => import("pages/community.vue"),
        meta: { title: "Community" },
      },
      {
        path: "/siku",
        name: "siku",
        component: () => import("pages/logs.vue"),
        meta: { title: "Logs" },
      },
      {
        path: "/maarifa",
        name: "maarifa",
        component: () => import("pages/insights.vue"),
        meta: { title: "Insights" },
      },
    ],
  },

  {
    path: "/User",
    component: () => import("layouts/onBoardingLayout.vue"),
    children: [
      {
        path: "/auth",
        name: "auth",
        component: () => import("pages/user/indexPage.vue"),
      },
      {
        path: "/meta/language",
        name: "lang",
        component: () => import("pages/user/languageSelection.vue"),
      },
      {
        path: "/meta/user",
        name: "meta",
        component: () => import("pages/user/userMeta.vue"),
      },
      {
        path: "/meta/user/update",
        name: "metaUpdate",
        component: () => import("pages/user/userMetaUpdate.vue"),
      },
    ],
  },

  {
    path: "/Logs",
    component: () => import("layouts/journalLayout.vue"),
    children: [
      {
        path: "/signs",
        name: "signs",
        component: () => import("pages/Journal/singsJournal.vue"),
        meta: { title: "Sings" },
      },
      {
        path: "/sleep",
        name: "sleep",
        component: () => import("pages/Journal/sleepJournal.vue"),
        meta: { title: "My sleep" },
      },
      {
        path: "/sleepnotes",
        name: "sleepnotes",
        component: () => import("pages/Journal/sleepJournalNotes.vue"),
        meta: { title: "My sleep" },
      },
      {
        path: "/mood",
        name: "mood",
        component: () => import("pages/Journal/singsJournal.vue"),
        meta: { title: "My mood" },
      },
      {
        path: "/movement",
        name: "movement",
        component: () => import("pages/Journal/movement.vue"),
        meta: { title: "My movement" },
      },
      {
        path: "/movementlog",
        name: "movementlog",
        component: () => import("pages/Journal/movement_log.vue"),
        meta: { title: "My movement" },
      },
      {
        path: "/period",
        name: "period",
        component: () => import("pages/Journal/period_log.vue"),
        meta: { title: "My Cycle" },
      },
    ],
  },

  {
    path: "/stories",
    component: () => import("layouts/stories.vue"),
    children: [
      {
        path: "/createpost",
        name: "poststory",
        component: () => import("pages/Stories/postStory.vue"),
        meta: { title: "Create story" },
      },
      {
        path: "/readpost",
        name: "readstory",
        component: () => import("pages/Stories/readStory.vue"),
        meta: { title: "Story" },
      },
    ],
  },

  {
    path: "/Logmeta",
    component: () => import("layouts/stories.vue"),
    children: [
      {
        path: "/editsigns",
        name: "editsigns",
        component: () => import("pages/Journal/editSignList.vue"),
        meta: { title: "Edit Sign List" },
      },
      {
        path: "/addsign",
        name: "addsigns",
        component: () => import("pages/Journal/addSign.vue"),
        meta: { title: "Add Sign" },
      },
      {
        path: "/lognewsign",
        name: "logaddedsign",
        component: () => import("pages/Journal/logAddedSign.vue"),
        meta: { title: "Add Sign" },
      },
      {
        path: "/readpost",
        name: "readstory",
        component: () => import("pages/Stories/readStory.vue"),
        meta: { title: "Story" },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes
