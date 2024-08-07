// src/utils/apiClient.ts

const getToken = () => {
	return localStorage.getItem('token');
  };
  
  const apiClient = async (endpoint: string, method = 'GET', body?: any) => {
	const token = getToken();
  
	const headers: HeadersInit = {
	  'Content-Type': 'application/json',
	};
  
	if (token) {
	  headers['Authorization'] = `Bearer ${token}`;
	}
  
	const response = await fetch(endpoint, {
	  method,
	  headers,
	  body: JSON.stringify(body),
	});
  
	if (!response.ok) {
	  throw new Error('Network response was not ok');
	}
  
	const data = await response.json();
	return data;
  };
  
  export default apiClient;
  