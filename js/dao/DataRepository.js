/**
 * Created by Administrator on 2017/5/17.
 */

import HttpUtils from '../utils/HttpUtils'
export default class DataRepository{

    fetchRepository(url){
        return HttpUtils.get(url)
    }


}