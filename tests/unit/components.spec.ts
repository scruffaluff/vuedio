import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import ControlBar from "@/components/ControlBar.vue";
import NoteList from "@/components/NoteList.vue";
import Vuetify from "vuetify";

describe("NoteList", () => {
  const localVue = createLocalVue();
  let vuetify: Vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("Changes color when clicked", async () => {
    const wrapper = mount(NoteList, {
      localVue,
      vuetify,
      propsData: { name: "Synth" },
    });

    const card = wrapper.find("button.v-btn");
    expect(card.classes()).toContain("lighten-4");

    await card.trigger("click");
    expect(card.classes()).not.toContain("lighten-4");
  });

  it("Renders name when passed", () => {
    const name = "Synth";
    const wrapper = shallowMount(NoteList, {
      localVue,
      vuetify,
      propsData: { name },
    });

    expect(wrapper.text()).toMatch(name);
  });
});

describe("ControlBar", () => {
  const localVue = createLocalVue();
  let vuetify: Vuetify;

  // Vuetify's slider requires a parent element with attribute data-app="true".
  // Solution is taken from https://github.com/vuetifyjs/vuetify/issues/1210.
  const elem = document.createElement("div");
  elem.setAttribute("data-app", "true");
  document.body.appendChild(elem);

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("Changes volume icon with volume", async () => {
    const wrapper = mount(ControlBar, {
      localVue,
      vuetify,
      propsData: {
        attachTo: "data-app",
        name: "Synth",
      },
    });

    wrapper.vm.$data.volume = 20.0;
    // @ts-expect-error volumeIcon does exist as a computed property.
    expect(wrapper.vm.volumeIcon).toBe("mdi-volume-low");
  });
});
