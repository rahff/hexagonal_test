import { CommentTweetRequestDto, ICommentTweetDto } from "../../domain/ports/driver/comment.dto";
import { CommentTweetTask } from "src/domain/ports/driver/api";


export const commentTweetService = async (feature: CommentTweetTask, body: ICommentTweetDto) => {
    try {
        const commentTweetRequest = new CommentTweetRequestDto(body);
        return await feature.execute(commentTweetRequest);
    } catch (error: any) {
        throw error;
    }
}