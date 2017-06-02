/**
 * Created by Administrator on 2017/5/17.
 */

import {
    AsyncStorage,
    DeviceEventEmitter
} from 'react-native'
import HttpUtils from '../utils/HttpUtils'
export default class DataRepository {

    /**
     * 先获取本地数据,如果没有数据或过期再由网络获取
     * @param url
     * @returns {Promise}
     */
    fetchRepository(url) {
        return new Promise((resolve, reject) => {
            return this.fetchLocalRepository(url)
                .then(result => {
                    if (result) {
                        DeviceEventEmitter.emit('dataChangeListener','本地数据')
                        if (result.update_date&&this.checkDate(result.update_date)){
                            resolve(result.data)
                        }else{
                            DeviceEventEmitter.emit('dataChangeListener','本地数据过期')
                            HttpUtils.get(url).then(result => {
                                DeviceEventEmitter.emit('dataChangeListener','网络数据')
                                resolve(result)
                                this.saveDataRepository(url,result)
                            }).catch(e => {
                                reject(e)
                            })
                        }
                    } else {
                        HttpUtils.get(url).then(result => {
                            DeviceEventEmitter.emit('dataChangeListener','网络数据')
                            resolve(result)
                            this.saveDataRepository(url,result)
                        }).catch(e => {
                            reject(e)
                        })
                    }
                }).catch(e => {
                reject(e)
            })
        })
    }

    /**
     * 获取本地数据
     * @param url
     * @returns {Promise}
     */
    fetchLocalRepository(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result))
                    } catch (e) {
                        reject(e)
                        console.error(e)
                    }

                } else {
                    reject(error)
                    console.error(error)
                }
            })
        })
    }

    /**
     * 保存数据到本地
     * @param url
     * @param result
     */
     saveDataRepository(url,result){
         let wrapData = {data:result,update_date:new Date().getTime()}
        AsyncStorage.setItem(url,JSON.stringify(wrapData),(error)=>{

        })
     }

    /**
     * 检查数据存储时间，判断数据是否过期
     * @param time
     * @returns {boolean}
     */
     checkDate(time){
         let currentTime = new Date().getTime()
         if (currentTime - time > 1000 * 60 * 60 * 2 ){
             return false
         }
         return true
     }
}