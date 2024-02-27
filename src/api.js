const BASE_URL = 'https://openmind-api.vercel.app/4-8/';

export async function getAllSubject(limit, offset, sort) {
  limit = limit || 8;
  offset = offset || 0;
  sort = sort || 'time';

  try {
    const response = await fetch(
      `${BASE_URL}subjects/?limit=${limit}&offset=${offset}&sort=${sort}`,
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
