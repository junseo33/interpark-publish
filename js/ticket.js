window.addEventListener("load", function () {
  // console.log("투어특가");

  // 추천 상품 슬라이드 기능
  // 글로써 코딩 시나리오 작성 : 의사코드
  // 1. 외부 데이터를 불러온다.
  // : 외부 데이터 파일명.json
  const fileName = "ticket.json";

  // 외부 데이터 가져올때 작성법
  const xhr = new XMLHttpRequest();
  // 외부의 파일을 열어라
  // Get 방식으로 파일을 열어준다.
  xhr.open("GET", fileName);
  // 실제로 실행하자
  xhr.send();
  // 데이터의 전송상태를 체크합니다.
  xhr.onreadystatechange = function (event) {
    // console.log("데이터 전송 상태 확인", event.target.readystate);
    if (event.target.readyState === XMLHttpRequest.DONE) {
      // console.log("자료 가져오는데 성공완료", event.target.response);

      const res = event.target.response;

      const json = JSON.parse(res);
      makesHtmlTag(json);
    }
  };

  // html 태그를 만드는 기능
  function makesHtmlTag(_res) {
    // console.log(_res);
    // html 태그를 백틱을 이용해서 만든다.
    let htmlticketTag = ``;
    // _res 에 담겨진 객체에서 total 을 보관한다.
    // 우리가 몇번 반복(total)해야 하는지 안다.
    // for (초기값; 조건; 증감) {
    // 반복 하고 싶은일
    // }
    for (let i = 0; i < _res.total; i++) {
      // 가독성이 떨어집니다.
      const index = i + 1;
      // _res.good_1;
      // _res["good_2"];
      // _res["good_" + 3];
      const obj = _res["good_" + index];
      // console.log(obj);

      const tempTag = `
        <div class="swiper-slide">
          <div class="ticket-slide-item">
            <a href="${obj.url}" class="ticket-link">
              <div class="ticket-img">
                <img src="${obj.image}" alt="${obj.desc}" />
              </div>
              <div class="ticket-info">
                <ul class="ticket-good-list">
                  <li>
                    <span class="ticket-good-info-price">
                      <b>${obj.discount}%</b>
                      <em>${obj.price}</em>
                      원
                    </span>
                  </li>
                  <li>
                    <p class="ticket-good-info-desc">
                    ${obj.desc}
                    </p>
                  </li>
                </ul>
              </div>
            </a>
          </div>
        </div>
      `;
      // console.log(tempTag);
      // htmlticketTag = htmlticketTag + tempTag;
      htmlticketTag += tempTag;
    }

    // console.log(htmlticketTag);

    showsHtmlTag(htmlticketTag);
  }

  // html 출력 전용 기능을 만들자.
  function showsHtmlTag(_html) {
    // swiper 태그에 백틱을 배치한다.
    const ticketSlide = ".ticket-slide .swiper-wrapper";
    const tag = document.querySelector(ticketSlide);
    tag.innerHTML = _html;

    // swiper 만들고 실행하기
    makesSwiper();
  }

  function makesSwiper() {
    // swiper 작동시킨다.
    const swiperticket = new Swiper(".ticket-slide", {
      slidesPerView: 4,
      spaceBetween: 27,
      // 좌측, 우측 이동 버튼
      navigation: {
        nextEl: ".ticket-slide-wrap .slide-next-bt",
        prevEl: ".ticket-slide-wrap .slide-prev-bt",
      },
      // 4장씩 이동하라.
      slidesPerGroup: 4,
    });
  }
});
