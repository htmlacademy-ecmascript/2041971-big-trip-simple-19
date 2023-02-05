import ApiService from '../framework/api-service.js';
import {Url} from '../const.js';
export default class OffersApiService extends ApiService {
  get offers() {
    return this._load({url: Url.OFFERS})
      .then(ApiService.parseResponse);
  }
}
