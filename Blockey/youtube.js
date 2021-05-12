//clicks the youtube buttons constantly
const click = (clazz) => {
    const buttons = document.getElementsByClassName(clazz);
    for (const button of buttons) {
      button.click();
      console.log("Ads skipped or closed successfully");
    }
  }
// Interval  set to run the above fuction every 300 miliseconds to skip and close ads
  setInterval(() => {
    click("ytp-ad-skip-button-text");
    click("ytp-ad-overlay-close-button");
  }, 300);
  console.log("Ad skipper/closer running");

