
export function tabSelect(tab) {
  return {
    type: 'tabSelect',
    tab,
  };
}

export function appLaunch() {
  return {
    type: 'appLaunching',
    launch: true,
  };
}

export function appLaunchDone() {
  return {
    type: 'appLaunching',
    launch: false,
  };
}
