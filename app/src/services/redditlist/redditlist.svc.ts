import {async, register} from 'platypus';
import BaseService from '../base/base.svc';

export default class RedditListService extends BaseService {
    getList(): async.IAjaxThenable<Array<models.ISubReddit>> {
        return this.http.json<Array<models.ISubReddit>>({
            method: 'GET',
            url: this.host,
        }).then((success) => {
            return success.response.data.children;
        }, (err) => {
            console.log(err);
            throw err;
        });
    }
    }



register.injectable('redditlist-svc', RedditListService);
