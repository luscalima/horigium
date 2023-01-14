import { mount } from "@vue/test-utils";
import AppButton from "../../src/components/AppButton.vue";

describe("AppButton", () => {
  it("When passing content to the default slot, it should appear as the button's text", () => {
    const buttonText = "Button text";
    const wrapper = mount(AppButton, {
      slots: {
        default: buttonText,
      },
    });

    expect(wrapper.text()).toContain(buttonText);
  });
});
