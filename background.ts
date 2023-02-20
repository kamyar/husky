import { SHORTCUTS_STORAGE_KEY } from "~config"
import type { ShortcutItem } from "~shortcut"
import { storage } from "~utils/storage"

export {}

const SHORTCUTS = new Map<string, ShortcutItem>([
  ["gm", { address: "https://mail.google.com/mail/u/0/" }],
  ["dd", { address: "https://mail.google.com/mail/u/0/" }],
])

function shortcutHandler(arg1, arg2) {
  const default_target: ShortcutItem = SHORTCUTS.get(arg1)
  console.log(default_target.address)
  if (default_target) chrome.tabs.update({ url: default_target.address })
}

function updateShortcutsFromStorage(shortcuts = []) {
  if (!shortcuts) return
  shortcuts.forEach((s) => {
    SHORTCUTS.set(s.key, s)
  })
  chrome.omnibox.onInputEntered.addListener(shortcutHandler)
}

storage
  .get<ShortcutItem[]>(SHORTCUTS_STORAGE_KEY)
  .then(updateShortcutsFromStorage)

storage.watch({
  [SHORTCUTS_STORAGE_KEY]: (c) => {
    updateShortcutsFromStorage(c.newValue)
  },
})

// TODO: fix this
// chrome.omnibox.onInputChanged.addListener((arg) => {
//   const base = arg.split(" ")[0];
//   if (base in SHORTCUTS) {
//     // console.log("yes", base);
//     chrome.omnibox.setDefaultSuggestion({
//       description: SHORTCUTS[base],
//     });
//   } else {
//     const potential_shortcuts = Object.keys(SHORTCUTS)
//       .filter((k: string) => k.startsWith(base))
//       .join(",");
//     chrome.omnibox.setDefaultSuggestion({
//       description: `Potential matches: ${potential_shortcuts}`,
//     });
//   }
// });
