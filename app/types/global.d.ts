import 'amap-jsapi-v2-types'

declare global {
    // 自行扩展类型用，一般不用
    // https://github.com/xyy94813/amap-jsapi-v2-types?tab=readme-ov-file
    namespace AMap {}
    interface Activity {
        id: number
        name: string
        organizer: string
        description: string
        tags: string[]
    }
}
