declare module 'haversine-distance' {
  interface Point {
    lat: number;
    lng: number;
  }

  export default function haversine(a: Point, b: Point): number;
}
