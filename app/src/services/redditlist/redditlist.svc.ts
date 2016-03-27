import {async, register} from 'platypus';
import BaseService from '../base/base.svc';

export default class RedditListService extends BaseService {
    getList(): async.IAjaxThenable<Array<any>> {
        return this.http.json({
            method: 'GET',
            url: this.host
        }).then((success) => {
            let stuff: any = success;
            return stuff.response.data.children;
        }, (err) => {
            console.log(err);
            throw err;
        });
    }
    }



register.injectable('redditlist-svc', RedditListService);
