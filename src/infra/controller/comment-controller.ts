import { CommentTweetRequestDto, ICommentTweetDto } from "../../domain/modules/ports/driver/comment.dto";
import { CommentTweetTask } from "src/domain/modules/ports/driver/api";


export const commentTweetController = async (feature: CommentTweetTask, body: ICommentTweetDto) => {
    try {
        const commentTweetRequest = new CommentTweetRequestDto(body);
        return await feature.execute(commentTweetRequest);
    } catch (error: any) {
        throw error;
    }
}