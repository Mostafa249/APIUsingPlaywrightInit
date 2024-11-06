import Crocodiles from "../requests/Crocodiles";

class CrocodilesActions {

    async getAllCrocodilesIds() {
        const getCrocoRes = await Crocodiles.getCrocodiles();
        if (getCrocoRes.status() === 200) {
            const getCrocoResBody = await getCrocoRes.json();
            return getCrocoResBody.map(croco => croco.id)
        }
        throw new Error("can't get the crocodiles ids");
    }
}

module.exports = new CrocodilesActions();