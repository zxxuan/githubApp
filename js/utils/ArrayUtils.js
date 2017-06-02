/**
 * Created by zhangxuan on 2017/5/31.
 */

export default class ArrayUtils{
    static clone(from){
        let array = []
        for(var i=0;i<from.length;i++){
            array[i] = from[i]
        }
        return array
    }

    static isEqual(array1,array2){
        if (!(array1 && array2)) return false
        if (array1.length !== array2.length) return false

        for (var i=0;i<array1.length;i++){
            if (array1[i] !== array2[i]){
                return false
            }
        }
        return true
    }
}