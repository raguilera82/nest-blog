import { NicknameVO } from '../vos/nickname.vo';
import { IdVO } from './../vos/id.vo';
import { ContentCommentVO } from '../vos/content-comment.vo';
import { TimestampVO } from '../vos/timestamp.vo';

export type CommentType = {
    id: IdVO;
    nickname: NicknameVO;
    content: ContentCommentVO;
    timestamp: TimestampVO;
}

export class Comment {

    constructor(private comment: CommentType) {}

    get id(): IdVO {
        return this.comment.id;
    }

    get nickname(): NicknameVO {
        return this.comment.nickname;
    }

    get content(): ContentCommentVO {
        return this.comment.content;
    }

    get timestamp(): TimestampVO {
        return this.comment.timestamp;
    }
}