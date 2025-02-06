import axios from "axios";

const API_URL = "http://localhost:3000";
export const createPortfolio = async (portfolioData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/portfolios`,
      portfolioData,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchPortfolios = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/portfolios`, {
      withCredentials: true,
    });
    console.log("fetchPortfolios response.data ", response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const fetchPortfolioById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/portfolios/${id}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const updatePortfolio = async (updatedPortfolio) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/portfolios/${updatedPortfolio._id}`,
      updatedPortfolio,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deletePortfolio = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/portfolios/${id}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error;
  }
};
