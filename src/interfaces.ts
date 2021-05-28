export interface RouteParams {
  subreddit: string;
}

export interface PostType {
  data: {
    [key: string]: any;
  };
}

export interface TrimPostType {
  [key: string]: any;
}

export interface SelectedType {
  [key: string]: TrimPostType;
}

export interface Subreddit {
  data: {
    children: PostType[];
    after: string;
    before: string;
  };
}
