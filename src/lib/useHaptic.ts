export function useHaptic() {
  const supported = typeof navigator !== 'undefined' && 'vibrate' in navigator;
  return () => {
    if (supported) navigator.vibrate(12);
  };
}
