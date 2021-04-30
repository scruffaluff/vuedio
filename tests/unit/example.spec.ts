import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import NoteList from "@/components/NoteList.vue";
import Vuetify from "vuetify";

describe("NoteList.vue", () => {
  const localVue = createLocalVue();
  let vuetify: Vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("Changes color when clicked", () => {
    const wrapper = mount(NoteList, {
      localVue,
      vuetify,
      propsData: { name: "Synth" },
    });

    const card = wrapper.find("div.v-card");
    expect(card.classes()).toContain("lighten-4");

    card.trigger("click");
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
