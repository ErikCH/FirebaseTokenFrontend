import HelloWorld from "@/components/HelloWorld.vue";
import TopHeader from "@/components/Top-Header.vue";
import Secret from "@/views/Secret.vue";
import Register from "@/views/Register.vue";
import { shallowMount, mount } from "@vue/test-utils";
import flushPromises from "flush-promises";

const $router = {
  replace: jest.fn()
};

jest.mock("firebase/app", () => ({
  auth() {
    return {
      signOut: () => {
        return Promise.resolve();
      },
      onAuthStateChanged(fnc) {
        return fnc(true);
        // return Promise.resolve(true);
      },
      createUserWithEmailAndPassword: () => {
        return Promise.resolve();
      },
      currentUser: {
        getIdToken: () => "blah"
      }
    };
  }
}));

// jest.mock("firebase/app", () => ({
//   auth() {
//     return jest.fn();
//   }
// }));

fdescribe("Register.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Register, {
      mocks: {
        $router
      },
      data() {
        return {
          email: "test@test.com",
          password: "123",
          error: false
        };
      }
    });
  });
  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("sends to secret route if promise resolves", async () => {
    // wrapper.setData({email})

    // firebase.auth().mockImplementation(() => {
    //   return {
    //     signOut: () => {
    //       return Promise.resolve();
    //     },
    //     onAuthStateChanged(fnc) {
    //       return fnc(true);
    //       // return Promise.resolve(true);
    //     },
    //     createUserWithEmailAndPassword: () => {
    //       return Promise.resolve();
    //     },
    //     currentUser: {
    //       getIdToken: () => "blah"
    //     }
    //   };
    // });
    wrapper.find("form").trigger("submit");
    // wrapper.vm.pressed();
    await flushPromises();
    expect($router.replace).lastCalledWith({ name: "secret" });
  });
});

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

const $axios = {
  get: () => {
    return Promise.resolve({ data: [{ char_id: 1, name: "123" }] });
  }
};

describe("secret vue", () => {
  let wrapper;
  it("renders", () => {
    wrapper = mount(Secret, { mocks: { $axios } });
    expect(wrapper.exists()).toBe(true);
  });

  it("shows correct name", async () => {
    wrapper = mount(Secret, { mocks: { $axios } });
    await flushPromises();
    const l = wrapper.find("h5");
    expect(l.text()).toBe("123");
  });
});

describe("TopHeader.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TopHeader, {
      // methods: { setupFirebase: () => {} },
      mocks: {
        $router
      }
    });

    jest.resetModules();
    jest.clearAllMocks();
  });
  it("renders", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("sets the correct user to logged in", async () => {
    // await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.loggedIn).toBe(true);
  });
});
