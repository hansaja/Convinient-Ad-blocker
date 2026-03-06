# Blockey

A Chrome extension that blocks ads, skips YouTube ads, warns about insecure HTTP sites, and lets you block custom domains.

Built with **Manifest V3** and Chrome's `declarativeNetRequest` API for fast, efficient ad blocking without slowing down your browser.

## Features

- **Ad Blocking** — 30,000 known ad/tracker domains blocked via declarativeNetRequest rules
- **YouTube Ad Skipper** — Automatically clicks skip/close buttons on YouTube ads using a MutationObserver (zero CPU waste when no ads are playing)
- **HTTP Security Warnings** — Alerts you when visiting insecure HTTP sites, with the option to approve individual hosts
- **Custom Domain Blocking** — Add your own domains to block; matching tabs are closed automatically
- **URL Safety Checker** — Right-click any link to check if the URL looks safe

## Installation

1. Clone or download this repository
2. Open `chrome://extensions/` in Chrome
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** and select the `Blockey/` folder
5. The Blockey icon should appear in your toolbar

## Usage

### Popup

Click the Blockey icon in your toolbar to see the total number of ads blocked.

### Settings

Click **more** in the popup (or go to the extension's options page) to:

- Add domains to block (one per line)
- Toggle blocking on/off with the **Enabled** checkbox
- Click **Save** to persist your changes

### URL Checker

Right-click any link on a page and select **Check this URL** to see a quick safety check.

### HTTP Warnings

When you navigate to an HTTP site, Blockey shows a warning page. You can:

- **Go Back** — closes the tab
- **Continue** — adds the host to your approved list and proceeds (you won't be warned again for that host)

## Project Structure

```
Blockey/
  manifest.json         Manifest V3 extension config
  service-worker.js     Background service worker (context menu, tab blocking, ad count)
  rules.json            30,000 declarativeNetRequest ad-blocking rules
  youtube.js            Content script — YouTube ad skipper
  main.js               Content script — HTTP security warning redirect
  popup.html/js/css     Extension popup UI
  block.html            Settings page
  option.js             Settings page logic
  more.css              Settings page styles
  options/
    warning.html/js     HTTP warning interstitial page
  icon.png              16x16 icon
  icons_128.png         128x128 icon
scripts/
  build-rules.js        Node.js script to regenerate rules.json from a domain list
```

## Building Rules

The `rules.json` file is pre-built and ready to use. If you need to regenerate it from a domain blocklist:

```bash
node scripts/build-rules.js
```

This parses a `blockedsites.js` source file (not included in the repo after migration), deduplicates domains, and outputs the first 30,000 as declarativeNetRequest rules.

## Permissions

| Permission                        | Why                                                         |
|-----------------------------------|-------------------------------------------------------------|
| `declarativeNetRequest` | Block ad network requests |
| `declarativeNetRequestFeedback` | Track how many requests were blocked |
| `contextMenus` | "Check this URL" right-click option |
| `scripting` | Show alert from service worker context |
| `alarms` | Periodic blocked-count polling (service workers can't use setInterval) |
| `tabs` | Detect navigation for custom domain blocking |
| `storage` | Persist settings and blocked count |
| `activeTab` | Access current tab for URL checking |
| `<all_urls>` (host) | Content scripts and request blocking need broad host access |

## Tech Stack

- Chrome Extension Manifest V3
- `declarativeNetRequest` for ad blocking
- `MutationObserver` for YouTube ad detection
- Vanilla JS, HTML, CSS — no external dependencies

## License

This project is provided as-is for educational and personal use.
