import axios from "axios";

export const createAsset = async (data) => {
    const response = await axios.post('/api/asset', data);

    return response;
}