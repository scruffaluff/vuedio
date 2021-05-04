import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import ControlBar from "@/components/ControlBar.vue";
import NoteList from "@/components/NoteList.vue";
import store from "@/store";

let vuetify: Vuetify;
const localVue = createLocalVue();
// Vuetify's slider requires a parent element with attribute data-app="true".
// Solution is taken from https://github.com/vuetifyjs/vuetify/issues/1210.
const elem = document.createElement("div");
elem.setAttribute("data-app", "true");
document.body.appendChild(elem);

beforeEach(() => {
  vuetify = new Vuetify();
});

describe("NoteList", () => {
  test("Changes color when clicked", async () => {
    const wrapper = mount(NoteList, {
      localVue,
      propsData: { track: store.state.tracks[0] },
      store,
      vuetify,
    });

    const card = wrapper.find("button.v-btn");
    expect(card.classes()).toContain("lighten-4");

    await card.trigger("click");
    expect(card.classes()).not.toContain("lighten-4");
  });

  test("Renders name when passed", () => {
    const wrapper = shallowMount(NoteList, {
      localVue,
      propsData: { track: store.state.tracks[0] },
      store,
      vuetify,
    });

    expect(wrapper.text()).toMatch("Kick");
  });
});

describe("ControlBar", () => {
  test("Changes volume icon with volume", async () => {
    const wrapper = mount(ControlBar, {
      localVue,
      store,
      vuetify,
    });

    store.state.volume = 20.0;
    // Cannot use ts-expect-error since Cypress compiles correctly.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore volumeIcon does exist as a computed property, but Jest
    // believes otherwise.
    expect(wrapper.vm.volumeIcon).toBe("mdi-volume-low");
  });
});
