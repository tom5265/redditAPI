import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import RedditListerRepository from '../../repositories/redditlister/redditlister.repo';
import HomeViewControl from '../home/home.vc';

export default class SinglePostViewControl extends BaseViewControl {
    templateString: string = require('./singlepost.vc.html');
    
    constructor(private redRepo: RedditListerRepository) {
        super();
    }

    context: any = {
        
    };
    
    navigatedTo(parameters: { id: string } ): void { 
        let id = parameters.id;
        this.redRepo.getOneReddit(id).then((r) => {
            this.context = r;
        });
        
    }
    
    goHome() {
        this.navigator.navigate(HomeViewControl)
    }
    
    
}



register.viewControl('singlepost-vc', SinglePostViewControl, [RedditListerRepository]);
