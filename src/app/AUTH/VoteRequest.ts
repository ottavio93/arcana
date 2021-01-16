import { VoteType } from './Vote-type';

export interface VoteRequest {
  postId: number;
  userName: String;
  voteType: VoteType;
}
