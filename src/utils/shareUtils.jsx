const url = window.location.href;

// Facebook
export const shareFacebook = () => {
  window.open('http://www.facebook.com/sharer/sharer.php?u=' + url);
};

// Kakao
export const shareKakao = () => {
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
    }

    kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: 'OpenMind',
        description: 'Welcome to OpenMind',
        imageUrl:
          'https://github.com/codeit-bootcamp-frontend/4-Weekly-Mission/assets/40304565/7fdc6563-f1b8-4913-8e5d-b68c2d2d33da',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '자세히 보러 가기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  }
};
