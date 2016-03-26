import {async, register} from 'platypus';
import BaseRepository from '../base/base.repo';
import RedditListService from '../../services/redditlist/redditlist.svc';

export default class RedditListerRepository extends BaseRepository {
    constructor(private redSvc: RedditListService) {
        super();
    }
    
    getAllReddits(): async.IThenable<Array<models.ISubReddit>> {
        return this.redSvc.getList();
    }
}

register.injectable('redditlister-repo', RedditListerRepository, [RedditListService]);
