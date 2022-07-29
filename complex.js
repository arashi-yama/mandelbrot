export default class Complex {
  constructor(r, i) {
    this.r = r;
    this.i = i;
  }

  static from(complex) {
    return new Complex(complex.r, complex.i);
  }

  add({ r, i }) {
    this.r += r;
    this.i += i;
    return this;
  }
  time({ r, i }) {
    const rr = this.r * r - this.i * i;
    const ri = this.r * i + this.i * r;
    this.r = rr;
    this.i = ri;
    return this;
  }
  toString() {
    return `${this.r}+${this.i}i`;
  }

  isInMandelbrot(max = 255) {
    for (let i = 0, z = Complex.from(this); i < max; i++) {
      z = z.time(z).add(this);
      if (z.r ** 2 + z.i ** 2 > 4) return i /max;
    }
    return true;
  }
}
