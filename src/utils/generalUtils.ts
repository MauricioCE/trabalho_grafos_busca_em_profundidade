// Diz se o dispositivo do usuário é ou não mobile
export function isMobileDevice() {
  return /Mobi|Android|iPhone/i.test(navigator.userAgent);
}

// Limita um valor entre um valor mínimo e um máximo
export function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}
