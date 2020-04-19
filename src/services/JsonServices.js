import axios from 'axios';
class JsonServices{
    baseJsonAsset = "/assets/";
    constructor(){
        
    }

    getJson(jsonFileName){
        return axios.get(this.baseJsonAsset + jsonFileName, { headers: { 'content-type': 'application/json' } });
    }

    
}

export default JsonServices;