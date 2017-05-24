/**
 * Created by Administrator on 2017/5/19.
 */
import {
    AsyncStorage
} from 'react-native'
import Keys from '../../res/data/keys.json'

export var FLAG_LANGUAGE = {flag_key:'language_dao_key'}
export default class KeysDao{

    constructor(flag){
        this.flag = flag
    }
    fetchKeys(){
       return new Promise((resolve,reject)=>{
           AsyncStorage.getItem(this.flag,(error,result)=>{
               if(error){
                   reject(error)
               }else{
                   if(result){
                        resolve(JSON.parse(result))
                   }else{
                        resolve(Keys)
                        this.saveToDao(Keys)
                   }
               }
           })
       })
    }

    saveToDao(data){
        AsyncStorage.setItem(this.flag,JSON.stringify(data),(error)=>{
        })
    }

    cleanKeys(){
        AsyncStorage.removeItem(this.flag,(error)=>{

        })
    }

}