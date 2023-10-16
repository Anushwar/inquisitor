const fetchPrompt = async (prompt?: string) => {
  const base = import.meta.env.VITE_API_BASE_URL ?? '';
  try {
    const response = await fetch(`${base}/gpt/chat?prompt=${prompt}`, {
      method: 'GET',
    });
    const res = await response.json();

    return res;
  } catch {
    throw new Error('Error fetching response!');
  }
};

const fetchCSVResult = async (formData?: FormData) => {
  const base = import.meta.env.VITE_API_BASE_URL ?? '';
  try {
    const response = await fetch(`${base}/gpt/process`, {
      method: 'POST',
      body: formData,
    });
    const res = await response.json();

    return res;
  } catch {
    throw new Error('Error fetching response!');
  }
};

export { fetchPrompt, fetchCSVResult };
