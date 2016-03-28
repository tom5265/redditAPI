import {async, register} from 'platypus';
import BaseRepository from '../base/base.repo';
import RedditListService from '../../services/redditlist/redditlist.svc';

export default class RedditListerRepository extends BaseRepository {
    containerArray: Array<models.ISubReddit> = [];
    constructor(private redSvc: RedditListService) {
        super();
    }

    getAllReddits(): async.IThenable<Array<models.ISubReddit>> {
        if (this.containerArray.length === 0) {
            return this.redSvc.getList().then((success) => {
                this.containerArray = [];
                success.forEach((post) => {
                    let redd: models.ISubReddit = {
                        title: post.data.title,
                        author: post.data.author,
                        id: post.data.id,
                        url: post.data.url,
                        selftext: post.data.selftext
                    }
                    this.containerArray.push(redd);
                });
                return this.containerArray;
            });
        } else {
            return this.Promise.resolve(this.containerArray);
        }   
    }

    getOneReddit(nameKey: any): async.IThenable<models.ISubReddit> {
        
        return this.getAllReddits().then((reddits) => {
            for (var i = 0; i < reddits.length; i++) {
                if (reddits[i].id === nameKey) {
                    return reddits[i];
                }
            }
        });
    }
}

register.injectable('redditlister-repo', RedditListerRepository, [RedditListService]);