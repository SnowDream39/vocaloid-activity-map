import type LngLat from "amap-jsapi-v2-types/types/common/LngLat";

export function lnglatToLonlat(lnglat: LngLat): LonLat {
    return {
        lat: lnglat.lat,
        lon: lnglat.lng,
    }
}

export function lonlatToArray(lonlat: LonLat): [number, number] {
    return [lonlat.lon, lonlat.lat]
}