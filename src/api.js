const BASE_URL = 'https://openmind-api.vercel.app/4-8';

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

export async function getAllSubject(limit, offset, sort) {
  limit = limit || 8;
  offset = offset || 0;
  sort = sort || 'time';

  try {
    const response = await fetch(
      `${BASE_URL}/subjects/?limit=${limit}&offset=${offset}&sort=${sort}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    // 네트워크 연결 오류 처리
    console.error('Network error:', error);
    return null;
  }
}

export async function getSubjectById(id) {
  try {
    const response = await fetch(`${BASE_URL}/subjects/${id}/`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    // 네트워크 연결 오류 처리
    console.error('Network error:', error);
    return null;
  }
}

export async function getQuestionsById(id) {
  try {
    const response = await fetch(`${BASE_URL}/subjects/${id}/questions/`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    // 네트워크 연결 오류 처리
    console.error('Network error:', error);
    return null;
  }
}

export async function postQuestionsReaction(id, type) {
  try {
    const response = await fetch(`${BASE_URL}/questions/${id}/reaction/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: type,
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
}
