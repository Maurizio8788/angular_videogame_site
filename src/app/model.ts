export interface Game {
    id: number;
    slug: string;
    name: string;
    released: string;
    tba: boolean;
    background_image: string;
    rating: number;
    rating_top: number;
    ratings: Ratings;
    ratings_count: number;
    reviews_text_count: string;
    added: number;
    genres:Genre;
    added_by_status: any;
    metacritic: number;
    playtime: number;
    suggestions_count: number;
    parent_platforms:[];
    publishers:[];
    website:string;
    updated: Date;
    esb_rating:ESBRating,
    platforms:Platforms,
    screenshots:Screenshots[],
    trailers:Trailer[];
    description:any;
}

export interface APIResponse<T> {
    results: Array<T>;
}

interface ESBRating{
    id: 0,
    slug: string,
    name: string
}

interface Genre{
    name: string
}

interface Platforms{
    platform:Platform,
    released_at:string
    requirements:Requirements
}

interface Platform{
    id:number,
    slug:string,
    name: string
}

interface Requirements{
    minimum:string,
    reccomended: string
}

interface Ratings{
    id:number,
    count:number,
    title:string
}

interface Screenshots{
    image:string
}

interface Trailer {
    data:{
        max:string
    }
}