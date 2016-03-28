import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import RedditListerRepository from '../../repositories/redditlister/redditlister.repo';
import SinglePostViewControl from '../singlepost/singlepost.vc';


export default class HomeViewControl extends BaseViewControl {
    templateString: string = require('./home.vc.html');
    
    constructor(private redRepo: RedditListerRepository) {
        super();
    }

    context: any = {
        reddits: <Array<models.ISubReddit>>[]
    };
    
    navigatedTo(): void {
        this.redRepo.getAllReddits().then((success) => {
            console.log(success);
            this.context.reddits = success;
        }, (err) => {
            console.log('something went wrong!');
            console.log(err);
        });
    }
    
     readMore(postId: string): void {
        this.navigator.navigate(SinglePostViewControl, {
            parameters: {
                id: postId
            }
        }
        )}
    
}

register.viewControl('home-vc', HomeViewControl, [RedditListerRepository]);
