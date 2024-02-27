const BASE_URL = `https://openmind-api.vercel.app/4-8`;

export const createInterviewer = async name => {
  try {
    const response = await fetch(`${BASE_URL}/subjects/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        team: '8',
      }),
    });

    if (response.ok) {
      return response.json();
    }
    return new Error('');
  } catch (e) {
    if (e instanceof Error) {
      return e;
    }
  }
};
