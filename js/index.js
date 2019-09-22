// スライダーに表示する画像のパス
var imgList = [
	"images/img01.jpg",
	"images/img02.jpg",
	"images/img03.jpg",
	"images/img04.jpg"
];

// 画像とナビの要素を自動で追加(スライドショーの画像タグを作成)
for(var i = 0; i < imgList.length; i++) {
	// li要素を取得
	var slide = document.createElement("li");
	// li要素の中に画像タグを埋め込む
	slide.innerHTML = "<img src = '" + imgList[i] + "'>";
	// li要素をクラス名「slider-inner」の子要素として追加
	document.getElementsByClassName("slider-inner")[0].appendChild(slide);



// 画像とナビの要素を自動で追加(ドットナビの追加)

	// li要素を取得
var nav = document.createElement("li");
	// プロパティ「data-nav-index」に数値を割り振る
nav.setAttribute("data-nav-index", i);
	// li要素をクラス名「nav」の子要素として追加(ドットナビ追加)
document.getElementsByClassName("nav") [0].appendChild(nav);
}

// スライドの数を取得(処理のために-1する)
var length = imgList.length - 1;
// クラス名「imageSlide」に画像の1枚の要素を格納
var imageSlide = document.getElementsByClassName("slider-inner")[0]
.getElementsByTagName("li");
// クラス名「dotNavigation」にドットナビの1つの要素を格納
var dotNavigation = document.getElementsByClassName("nav")[0]
.getElementsByTagName("li");
// 「現在○○枚目のスライドを表示している」というインデックス番号を格納する変数
var nowIndex = 0;

// 現在表示されている画像とドットナビにクラス名を付ける
imageSlide[nowIndex].classList.add("show");
dotNavigation[nowIndex].classList.add("current");
// スライドがアニメーション中か判断するフラグ
var isChanging = false;
// スライドのsetTimeoutを管理するタイマー
var slideTimer;
// スライド切り替え時に呼び出す関数
function sliderSlide(val) {
	// スライド中なら画像の切り替えをしない（if分)
	if (isChanging === true) {
		return false;
	}
	// スライド中
	isChanging = true;
	// 現在表示している画像とドットナビからクラス名を削除
	imageSlide[nowIndex].classList.remove("show");
	dotNavigation[nowIndex].classList.remove("current");
	nowIndex = val;
	// 次に表示する画像とナビにクラス名を付与
	imageSlide[nowIndex].classList.add("show");
	dotNavigation[nowIndex].classList.add("current");

	// アニメーションが終わるタイミングでisChangingのステータスをfalseに
	slideTimer = setTimeout(function(){
		isChanging = false;
	}, 600);
}

// 左矢印のナビをクリックした時のイベント
document.getElementById("arrow-prev").addEventListener("click", function(){
	// 前の画像の番号
	var index = nowIndex -1;
	// 先頭の画像表示から前へ移動すると末尾の画像に移動
	if(index < 0) {
		index = length;
	} 
	sliderSlide(index);
}, false);


// 右矢印のナビをクリックした時のイベント
document.getElementById("arrow-next").addEventListener("click", function(){
	// 次の画像の番号
	var index = nowIndex + 1;
	// 末尾の画像を表示した状態で次に移動すると先頭の画像に移動
	if(index > length){
		index = 0;
	}
	sliderSlide(index);
}, false);

// ドットナビをクリックした時のイベントを作成
for(var i = 0; i < dotNavigation.length; i++) {
	// データ属性のインデックス番号を元にスライドを行う
	dotNavigation[i].addEventListener("click", function(){
		var index = Number(this.getAttribute("data-nav-index"));
		sliderSlide(index);
	}, false);
}





