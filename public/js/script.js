//@ APlayer
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
    let dataSong = aplayer.getAttribute("data-song");
    dataSong = JSON.parse(dataSong);
    let dataSinger = aplayer.getAttribute("data-singer");
    dataSinger = JSON.parse(dataSinger);
    const ap = new APlayer({
        container: aplayer,
        audio: [
            {
                name: dataSong.title,
                artist: dataSinger.fullName,
                url: dataSong.audio,
                cover: dataSong.avatar,
            },
        ],
        autoplay: true,
    });
    const avatar = document.querySelector(".singer-detail .inner-avatar");

    ap.on("play", () => {
        avatar.style.animationPlayState = "running";
    });

    ap.on("pause", () => {
        avatar.style.animationPlayState = "paused";
    });
}
//@ APlayer

//@ Button Like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
    buttonLike.addEventListener("click", () => {
        const idSong = buttonLike.getAttribute("button-like");
        const isActive = buttonLike.classList.contains("active");
        const typeLike = isActive ? "dislike" : "like";
        const link = `/songs/like/${typeLike}/${idSong}`; //$ đây là api like lúc nãy code, mà ở dây nó ngầm đinh trước cái /songs  là localhost:3000 rồi nên ko cần điền đầy đủ link

        const option = {
            method: "PATCH",
        }; //! Vì tính năng like cũng là dạng cập nhật trong database, thì để method patch
        fetch(link, option)
            .then((res) => res.json())
            .then((data) => {
                if (data.code == 200) {
                    const span = buttonLike.querySelector("span");
                    span.innerHTML = `${data.like} thích`;
                    buttonLike.classList.toggle("active");
                }
            });
    });
}
//@ End Button Like

//@ Button Favorite
const listButtonFavorite = document.querySelectorAll("[button-favorite]");
if (listButtonFavorite.length > 0) {
    listButtonFavorite.forEach((buttonFavorite) => {
        buttonFavorite.addEventListener("click", () => {
            const idSong = buttonFavorite.getAttribute("button-favorite");
            const isActive = buttonFavorite.classList.contains("active");
            const typeFavorite = isActive ? "unfavorite" : "favorite";
            const link = `/songs/favorite/${typeFavorite}/${idSong}`; //$ đây là api like lúc nãy code, mà ở dây nó ngầm đinh trước cái /songs  là localhost:3000 rồi nên ko cần điền đầy đủ link

            const option = {
                method: "PATCH",
            }; //! Vì tính năng like cũng là dạng cập nhật trong database, thì để method patch
            fetch(link, option)
                .then((res) => res.json())
                .then((data) => {
                    if (data.code == 200) {
                        buttonFavorite.classList.toggle("active");
                    }
                });
        });
    });
}
//@ End Button Favorite

//@ Search Suggest
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
    const input = boxSearch.querySelector("input[name='keyword']");
    const boxSuggest = boxSearch.querySelector(".inner-suggest");
    input.addEventListener("keyup", () => {
        const keyword = input.value;
        const link = `/search/suggest?keyword=${keyword}`;

        fetch(link) //! mặc định method get thì ko cần option vì nó mặc định là method get
            .then((res) => res.json())
            .then((data) => {
                const songs = data.songs;
                if (songs.length > 0) {
                    boxSuggest.classList.add("show");

                    const htmls = songs.map((song) => {
                        return `
                        <a class="inner-item" href="/songs/detail/${song.slug}">
                            <div class="inner-image"><img src="${song.avatar}" /></div>
                            <div class="inner-info">
                                <div class="inner-title">${song.title}</div>
                                <div class="inner-singer"><i class="fa-solid fa-microphone-lines"></i> ${song.infoSinger.fullName}</div>
                            </div>
                        </a>

                        `;
                    });

                    const boxList = boxSuggest.querySelector(".inner-list");
                    console.log(boxList);
                    boxList.innerHTML = htmls.join("");
                } else {
                    boxSuggest.classList.remove("show");
                }
            });
    });
}
//@ End Search Suggest
