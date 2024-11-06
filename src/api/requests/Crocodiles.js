import BaseService from '../base/BaseService';

const myCrocodiles_service = '/my/crocodiles/';

class Crocodiles {
    async getCrocodiles() {
        const response = await BaseService.getRequest(myCrocodiles_service);
        return response;
    };

    async addCrocodile(reqBody) {
        const response = await BaseService.postRequest(myCrocodiles_service, reqBody);
        return response;
    };

    async getCrocoileById(id) {
        const response = await BaseService.getRequest(`${myCrocodiles_service}${id}`);
        return response;
    };
}
module.exports = new Crocodiles();