import {async, register} from 'platypus';
import BaseRepository from '../base/base.repo';
import RedditListService from '../../services/redditlist/redditlist.svc';

export default class RedditListerRepository extends BaseRepository {
    containerArray: Array<models.ISubReddit> = [];
    constructor(private redSvc: RedditListService) {
        super();
    }

    getAllReddits(): async.IThenable<Array<models.ISubReddit>> {
        return this.redSvc.getList().then((success) => {
            this.containerArray = [];
            success.forEach((post) => {
                let redd: models.ISubReddit = {
                    title: post.data.title,
                    author: post.data.author,
                    id: post.data.id,
                    url: post.data.url
                }
                this.containerArray.push(redd);
            });
            return this.containerArray;
        })
    }

    getOneReddit(nameKey: any) {
        
        for (var i = 0; i < this.containerArray.length; i++) {
            if (this.containerArray[i].id === nameKey) {
                return this.containerArray[i];
            }
        }
    }
}



register.injectable('redditlister-repo', RedditListerRepository, [RedditListService]);
