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
