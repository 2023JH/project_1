
// 문서의 상품(a) 요소 리스트
// ✏️querySelectorAll()을 사용해야 집합을 가져올 수 있습니다.
var items = document.querySelectorAll('.basket_item a');

// 쇼핑카트
var cart = document.querySelector('#cart');

// 쇼핑카트 리스트(배열)
// ✏️사용자가 선택한 상품을 하나의 데이터로 보관/관리하려면 배열(Array)을 사용해야 합니다.
var shoppingCart = [];

// 쇼핑카트 알림 메시지
// ✏️사용자가 상품을 선택하면 '선택된 상품이 없습니다.' 메시지가 사라져야 합니다.
var shoppingCartNoti = cart.querySelector('.cart_noti');

// 상품 리스트 순환
// ✏️상품 집합을 순환 처리하려면 배열의 능력을 사용해야 합니다.
items.forEach(function (item) {
    // 개별 상품 요소에 이벤트 연결
    // ✏️집합의 각 개별 아이템에 이벤트를 연결해야 합니다.
    item.addEventListener('click', addShoppingCart);
});

// 쇼핑카트 추가 함수
function addShoppingCart(e) {
    // 브라우저 기본 동작 차단
    e.preventDefault();

    // 선택한 상품(아이템)
    var target = e.target.parentNode;

    // 선택한 상품 객체
    var newItem = {
        image: target.querySelector('img').getAttribute('src'),
        title: target.querySelector('.item_title').textContent,
        price: target.querySelector('.item_price').textContent,
    }

    // 사용자가 선택한 상품이 
    // 쇼핑 카트 리스트에 포함되어 있는지 검사
    if (inspectHasItemInShoppingList(newItem)) {
        // 이미 상품이 포함되어 있으면 함수 종료
        // ✏️사용자가 이미 선택한 상품이 집합 내에 있으면 쇼핑카트에 포함시키지 않아야 합니다.
        return;
    }

    // 선택한 상품 쇼핑카트에 추가
    // ✏️사용자가 선택한 상품이 쇼핑카트에 없으면 신규 아이템을 집합에 포함시킵니다. (배열의 능력 활용)
    shoppingCart.push({
        image: target.querySelector('img').getAttribute('src'),
        title: target.querySelector('.item_title').textContent,
        price: target.querySelector('.item_price').textContent,
    });

    // 쇼핑카트 렌더링
    renderShoppingCart();
}

// 쇼핑카트 렌더링 함수
function renderShoppingCart() {

    // 쇼핑카트 HTML 코드
    var cartListCode = '';

    // 카트 요소에 show 클래스 부여
    cart.classList.add('show');

    // 쇼핑카트 알림 메시지 표시 처리
    displayShoppingCartNoti();

    // 쇼핑카트 렌더링
    // ✏️쇼핑카트의 ul 안에 그려질 li 집합이 여기서 처리됩니다.
    shoppingCart.map(function (item) {
        cartListCode +=
            `<li class="cart_item">
        <div class="cart_img">
          <img src="${item.image}" alt="">
        </div>
        <div class="cart_txt">${item.title}</div>
        <div class="cart_price">${item.price}</div>
      </li>
      `;
        cart.querySelector('.cart_list').innerHTML = cartListCode;
    });

}

// 쇼핑카트에 사용자가 선택한 상품이 포함되어 있는지 검사하는 함수  
function inspectHasItemInShoppingList(item) {
    // ✏️아래 코드는 주니어 레벨이 아니라, 시니어 레벨에서 학습합니다.
    return shoppingCart.find(function (existedItem) {
        return existedItem.title === item.title
    });
}

// 쇼핑카트 알림 메시지 표시 설정 함수
// ✏️3항 연산 식을 활용해 조건 처리하는 구문입니다. 주니어 코스에서 다룹니다.
function displayShoppingCartNoti() {
    shoppingCartNoti.style.display = shoppingCart.length > 0 ? 'none' : 'block';
}