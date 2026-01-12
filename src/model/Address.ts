import { Base } from "./base";

export class AddressModel extends Base {
  constructor() {
    super("address");
  }

  // GET /address - Get all addresses (Admin only)
  getAllAddresses = async (query?: any): Promise<any> => {
    const res = await this.apiGet("/all", query);
    return res.data;
  };

  // GET /address/:id - Get address by ID
  getAddressById = async (id: number): Promise<any> => {
    const res = await this.apiGet(`/${id}`);
    return res.data;
  };

  // POST /address - Create new address
  createAddress = async (data: any): Promise<any> => {
    const res = await this.apiPost("/create", data);
    return res.data;
  };

  // PUT /address/:id - Update address
  updateAddress = async (id: number, data: any): Promise<any> => {
    const res = await this.apiPut(`/${id}`, data);
    return res.data;
  };

  // DELETE /address/:id - Delete address
  deleteAddress = async (id: number): Promise<any> => {
    const res = await this.apiDelete(`/${id}`);
    return res.data;
  };
}

const Address = new AddressModel();
export default Address;
