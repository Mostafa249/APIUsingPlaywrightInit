import { test, expect } from "@playwright/test";
import Crocodiles from "../api/requests/Crocodiles";
import CrocodilesActions from "../api/action/CrocodilesActions";
import { info } from "../utils/Logger";
import { getRandomDigit } from "../utils/Random"
import { readJsonFile } from "../utils/DataReader"

const data = readJsonFile('./src/test-data/CrocodilesData.json');

test.describe('Get crocodiles scenarios', () => {

    test('Verify that the returned response is an aray', async () => {
        info('Get all crocodiles response');
        const getCrocoRes = await Crocodiles.getCrocodiles();
        info('Assert on the response status');
        expect(getCrocoRes.status()).toEqual(200);
        info('Get all crocodiles response body');
        const getCrocoResBody = await getCrocoRes.json();
        info('Assert that the response return as an array');
        expect(Array.isArray(getCrocoResBody)).toBeTruthy();
    });

    test('Verify that all returned ids are unique', async () => {
        info('Get all ids');
        const ids = await CrocodilesActions.getAllCrocodilesIds();
        info('Assert that all ids are unique');
        expect(new Set(ids).size).toBe(ids.length);
    });
});

test.describe('Add new crocodile scenarios', () => {
    test('Verify that user can not add croco without name', async () => {
        info('Add new croco without name');
        const addCrocRes = await Crocodiles.addCrocodile(data.addCrocoWithoutName);
        info('Assert that response status code is 400');
        expect(addCrocRes.status()).toEqual(400);
        info('Get add new crocodile response body');
        const addCrocResBody = await addCrocRes.json();
        info('Assert on the type of the returned message');
        expect(Array.isArray(addCrocResBody.name)).toBeTruthy();
        info('Assert on the returned error message');
        expect(addCrocResBody.name).toContain('This field is required.');
    });

    test('Verify that user can not add croco with invalid date format', async () => {
        info('Add new croco with invalid date format');
        const addCrocRes = await Crocodiles.addCrocodile(data.addCrocoWithInvalidDateFormat);
        info('Assert that response status code is 400');
        expect(addCrocRes.status()).toEqual(400);
        info('Get add new crocodile response body');
        const addCrocResBody = await addCrocRes.json();
        info('Assert on the type of the returned message');
        expect(Array.isArray(addCrocResBody.date_of_birth)).toBeTruthy();
        info('Assert on the returned error message');
        expect(addCrocResBody.date_of_birth).toContain('Date has wrong format. Use one of these formats instead: YYYY-MM-DD.');
    });

    test('Verify that user can add croco successfully', async () => {
        info('Update the crocodile name to be unique');
        data.addCrocoWithValidBody.name = `Croco${getRandomDigit}`;
        info('Add new croco with valid request body');
        const addCrocRes = await Crocodiles.addCrocodile(data.addCrocoWithValidBody);
        info('Assert that response status code is 201');
        expect(addCrocRes.status()).toEqual(201);
        info('Get the created croco id');
        const id = (await addCrocRes.json()).id;
        info('Get the created croco by id');
        const getCrocByIdRes = await Crocodiles.getCrocoileById(id);
        info('Assert on the returned response status');
        expect(getCrocByIdRes.status()).toEqual(200);
    });

});
