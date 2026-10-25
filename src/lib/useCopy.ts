import { useCallback, useRef, useState } from "react";

// Copies text to the clipboard and reports "copied" for a couple of seconds.
// Used for the email address: mailto: links do nothing for visitors without
// a desktop mail app, so copying guarantees the click always does something.
export function useCopy(timeout = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const copy = useCallback(
    (text: string) => {
      navigator.clipboard?.writeText(text).then(() => {
        setCopied(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), timeout);
      });
    },
    [timeout],
  );

  return { copied, copy };
}
