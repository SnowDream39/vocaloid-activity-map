import 'amap-jsapi-v2-types'
import type { DateTime } from 'luxon'

declare global {
    // 自行扩展类型用，一般不用
    // https://github.com/xyy94813/amap-jsapi-v2-types?tab=readme-ov-file
    namespace AMap {}
    
    interface Activity {
        id:          number;
        name:        string;
        description: string;
        location:    string;
        start_time:  DateTime;
        end_time:    DateTime;
        max_member:  number;
        position:    Position;
        tags:        Tag[];
        owner:       User;
    }

    export interface User {
        id:       number;
        nickname: string;
    }

    export interface Position {
        type:        string;
        coordinates: number[];
    }

    export interface Tag {
        id:   number;
        name: string;
        type: string;
    }

    interface SearchForm {
        keywords: string;
        tag_ids: number[];
        max_member_gt: number | null;
        max_member_lt: number | null;
        time_begin: DateTime | null;
        time_end: DateTime | null;
        page: number;
        page_size: number;
    }

}
