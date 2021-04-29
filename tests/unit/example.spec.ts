import { createLocalVue, mount } from "@vue/test-utils";
import NoteList from "@/components/NoteList.vue";
import Vuetify from "vuetify";

describe("NoteList.vue", () => {
  const localVue = createLocalVue();
  let vuetify: Vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("Renders name when passed", () => {
    const name = "Synth";
    const wrapper = mount(NoteList, {
      localVue,
      vuetify,
      propsData: { name },
    });

    expect(wrapper.text()).toMatch(name);
  });
});
