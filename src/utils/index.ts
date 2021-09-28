export const validFloat = (float: number) => {
  return float > -1.0e-10 && float < 1.0e-10 ? 0 : float
}
export const validZero = (num: number) => {
  // 如果是正零或负零，返回正零，否则返回原值
  return num === 0 ? 0 : num
}
export const atanValidRad = (rad: number, Vx: number) => {
  if (Math.atan(rad) === 0) {
    if (Vx > 0) {
      return 0
    }
    return Math.PI
  }
  return Math.atan(rad)
}
export const newAtan = (y: number, x: number): number => {
  if (y === 0 && x > 0) {
    return 0
  }
  if (y > 0 && x > 0) {
    return Math.atan(y / x)
  }
  if (y > 0 && x === 0) {
    return Math.PI / 2
  }
  if (y > 0 && x < 0) {
    return Math.atan(y / x) + Math.PI
  }
  if (y === 0 && x < 0) {
    return Math.PI
  }
  if (y < 0 && x < 0) {
    return Math.atan(y / x) + Math.PI
  }
  if (y < 0 && x === 0) {
    return (3 * Math.PI) / 2
  }
  if (y < 0 && x > 0) {
    return Math.atan(y / x) + Math.PI * 2
  }
  return 0
}
