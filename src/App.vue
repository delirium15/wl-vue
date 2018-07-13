<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">

                <div class="cat-list" >
                    <div class="kitten-item" v-for="pet in availableKittens">
                        <div class="kitten-box" data-lightbox="image-1" data-title="">
                            <img :src="pet.mainImg" class="img-responsive" :alt="pet.name">
                            <div class="kitten-box-caption">
                                <div class="kitten-box-caption-content">
                                    <div class="kitten-name text-faded">
                                        {{ pet.name }}
                                    </div>
                                    <div class="kitten-gender">
                                        {{ pet.gender | genderToText }}
                                    </div>
                                </div>
                                <button class="btn-dark"
                                        @click="selectCat(pet.id)"
                                >Reserve</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- PETS MODAL -->
                <transition name="modal">
                    <div class="modal customfade show bs-example-modal-lg" v-if="modalVisibility" tabindex="-1" role="dialog">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button
                                            type="button"
                                            class="close"
                                            aria-label="Закрыть"
                                            @click="modalVisibility = false"
                                            ><span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">

                                    <div class="pet-parents-details" v-if="currentPetHasParents">
                                        <div class="row photoList">
                                            <div class="col-xs-6 fatherDetails">
                                                <a class="kitten-box fatherImg">
                                                    <img :src="currentPetFather.mainImg"
                                                         :alt="currentPetFather.name"
                                                         class="img-responsive"
                                                         @click="selectCat(currentPetFather.id)"
                                                    >
                                                </a>
                                                <h2 class="fatherName"><span>{{ currentPetFather.name }}</span></h2>
                                            </div>
                                            <div class="col-xs-6 motherDetails">
                                                <a class="kitten-box motherImg">
                                                    <img :src="currentPetMother.mainImg"
                                                         :alt="currentPetMother.name"
                                                         class="img-responsive"
                                                         @click="selectCat(currentPetMother.id)"
                                                    >
                                                </a>
                                                <h2 class="motherName"><span>{{ currentPetMother.name }}</span></h2>
                                            </div>

                                        </div>
                                        <img class="inheritance-arrow" src="/src/imgs/parents_down_arrow.svg" alt="Arrow of inheritance"/>
                                    </div>

                                    <div class="pet-details" v-if="petDetailsVisibility">
                                        <div class="kitten-box kittyImg">
                                            <img :src="currentPet.mainImg"
                                                 :alt="currentPet.name"
                                                 class="img-responsive"
                                            />
                                        </div>
                                        <div class="pet-info">
                                            <h2><span class="catName">{{ currentPet.name }}</span></h2>
                                            <p class="catGender">Gender: {{ currentPet.gender | genderToText }}</p>
                                            <p class="catBirthdate">Birthdate: {{ currentPet.birthdate | birthdateToDate }}</p>
                                            <p class="catColor">Color: {{ currentPetColor.name }} ({{ currentPetColor.description }})</p>
                                            <p v-if="currentPetHasTitles">Titles: {{ currentPetTitles.abbr }} ({{ currentPetTitles.description }})</p>
                                        </div>
                                        <div class="photoList">
                                            <div class="kitten-box" v-for="photo in currentPet.imgs">
                                                <a href ="" data-fancybox="">
                                                    <img class="img-responsive"
                                                         :src="photo"
                                                         :alt="currentPet.name"
                                                    >
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Pet litters -->
                                    <div class="petChildren" v-if="currentPetHasLitters">
                                        <h2 class="text-center">Children of that pet</h2>
                                        <div class="litter-item" v-for="litter in currentPetLitters">
                                            <h3 class="text-center">Litter: {{ litter.charcode }}</h3>
                                            <p class="text-center">Birthdate: {{ litter.birthdate | birthdateToDate }}</p>

                                            <div class="photoList">
                                                <div v-for="p in getPetsInLitter(litter.id)">
                                                    <h3 class="text-center">{{p.name}}</h3>
                                                    <div class="kitten-box kittyImg">
                                                        <img :src="p.mainImg"
                                                             :alt="currentPet.name"
                                                             class="img-responsive"
                                                             @click="selectCat(p.id)"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <!-- Loading.. img -->
                                    <img src="/src/imgs/loader_dark.svg"
                                         alt="Loading..."
                                         class="loader-img"
                                         v-if="!petDetailsVisibility"
                                    >

                                </div>
                                <div class="modal-footer">
                                    <button class="btn-light"
                                            type="button"
                                            @click="modalVisibility = false"
                                            >Close</button>
                                    <button class="btn-dark reserveKittenBtn">Reserve</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>

                <!-- FEEDBACK MODAL -->



                <!-- MODAL BACKDROP -->
                <transition name="customfade">
                    <div class="modal-backdrop show" v-if="modalVisibility"></div>
                </transition>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selectedCatId: null,
                pets: [],
                petDetailsVisibility: false,
                modalVisibility: false,
            };
        },
        methods: {
            selectCat(catId) {
                this.selectedCatId = catId;
                this.modalVisibility = true;
                this.petDetailsVisibility = true;
            },
            getPetsInLitter(litterId){
                return this.pets.filter(pet => {
                    return pet.litter_id == litterId;
                });
            }
        },
        computed: {
            availableKittens() {
                return this.pets.filter(pet => {
                    return pet.status_id == 1
                })
            },
            currentPet() {
                return this.pets.filter(pet => {
                    return pet.id == this.selectedCatId
                })[0]
            },
            currentPetColor() {
                return this.colors.filter(color => {
                    return color.id == this.currentPet.color_id;
                })[0]
            },
            currentPetHasTitles(){
                return this.pets.filter(pet => {
                    return pet.title_id != 1 && pet.id == this.currentPet.id;
                }).length > 0
            },
            currentPetTitles(){
                if(this.currentPetHasTitles) {
                    return this.titles.filter(title => {
                        return title.id == this.currentPet.title_id;
                    })[0];
                }
            },
            currentPetHasParents(){
                return this.pets.filter(pet => {
                    return pet.litter_id != null && pet.id == this.currentPet.id;
                }).length > 0
            },
            currentPetLitter(){
                return this.litters.filter(litter => {
                    return litter.id == this.currentPet.litter_id;
                })[0];
            },
            currentPetFather(){
                if(this.currentPetHasParents){
                    return this.pets.filter(pet => {
                        return pet.id == this.currentPetLitter.father_id;
                    })[0];
                }
            },
            currentPetMother(){
                return this.pets.filter(pet => {
                    return pet.id == this.currentPetLitter.mother_id;
                })[0];
            },
            currentPetLitters(){
                return this.litters.filter(litter => {
                    return litter.mother_id == this.currentPet.id || litter.father_id == this.currentPet.id;
                });
            },
            currentPetHasLitters(){
                return this.currentPetLitters.length > 0;
            },

        },
        filters: {
            genderToText(value) {
                return value === 'm' ? 'Male' : 'Female'
            },
            birthdateToDate(value) {
                var date = new Date(value * 1000);
                var day = date.getDate()
                day = day.toString().length === 2 ? day : ('0' + day)
                var month = date.getMonth() + 1;
                month = month.toString().length === 2 ? month : ('0' + month)
                var year = date.getFullYear();
                return day + "." + month + "." + year;
            }
        },
        created() {
            const pet = (id, name, gender, birthdate, title_id, color_id, status_id, litter_id, imgs, published) => ({id, name, gender, birthdate, title_id, color_id, status_id, litter_id, imgs, published})
            const title = (id, abbr, description) => ({id, abbr, description});
            const color = (id, name, description) => ({id, name, description});
            const status = (id, title) => ({id, title});
            const litter = (id, charcode, birthdate, father_id, mother_id, published) => ({id, charcode, birthdate, father_id, mother_id, published});

            this.pets = [
                pet("1", "Valkyrie",        "f", "1390161600", "4", "2", "4",   null,	["/src/imgs/cats/Valkyrie/valkyrie.jpg","/src/imgs/cats/Valkyrie/valkyrie01.jpg","/src/imgs/cats/Valkyrie/valkyrie02.jpg","/src/imgs/cats/Valkyrie/valkyrie03.jpg","/src/imgs/cats/Valkyrie/valkyrie04.jpg","/src/imgs/cats/Valkyrie/valkyrie05.jpg","/src/imgs/cats/Valkyrie/valkyrie06.jpg","/src/imgs/cats/Valkyrie/valkyrie07.jpg","/src/imgs/cats/Valkyrie/valkyrie08.jpg"], "1"),
                pet("2", "Harty",           "m", "1399752000", "4", "2", "4",   null,	["/src/imgs/cats/Harty/harty.jpg","/src/imgs/cats/Harty/harty01.jpg","/src/imgs/cats/Harty/harty02.jpg"], "1"),
                pet("3", "Marilyn Monroe",  "f", "1458162000", "4", "2", "4",   null,	["/src/imgs/cats/Marilyn_Monroe/mary.jpg","/src/imgs/cats/Marilyn_Monroe/mary02.jpg","/src/imgs/cats/Marilyn_Monroe/mary06.jpg","/src/imgs/cats/Marilyn_Monroe/mary03.jpg","/src/imgs/cats/Marilyn_Monroe/mary01.jpg","/src/imgs/cats/Marilyn_Monroe/mary04.jpg","/src/imgs/cats/Marilyn_Monroe/mary05.jpg","/src/imgs/cats/Marilyn_Monroe/mary07.jpg"], "1"),
                pet("4", "Oin",             "m", "1488834000", "4", "2", "4",   null,	["/src/imgs/cats/Oin/oin.jpg","/src/imgs/cats/Oin/oin02.jpg","/src/imgs/cats/Oin/oin01.jpg","/src/imgs/cats/Oin/oin04.jpg","/src/imgs/cats/Oin/oin05.jpg","/src/imgs/cats/Oin/oin03.jpg"], "1"),
                pet("5", "Aine",            "f", "1486587600", "1", "1", "4",   "1",    ["/src/imgs/cats/Aine/aine.jpg","/src/imgs/cats/Aine/aine01.jpg","/src/imgs/cats/Aine/aine02.jpg","/src/imgs/cats/Aine/aine04.jpg","/src/imgs/cats/Aine/aine03.jpg"], "1"),
                pet("6", "Aislynn",         "f", "1486587600", "1", "2", "1",   "1",    ["/src/imgs/cats/Aislynn/ayslinn.jpg","/src/imgs/cats/Aislynn/ayslinn05.jpg","/src/imgs/cats/Aislynn/ayslinn04.jpg","/src/imgs/cats/Aislynn/ayslinn06.jpg","/src/imgs/cats/Aislynn/ayslinn01.jpg","/src/imgs/cats/Aislynn/ayslinn03.jpg","/src/imgs/cats/Aislynn/ayslinn02.jpg"], "1"),
                pet("7", "Airic",           "f", "1486587600", "1", "2", "3",   "1",    ["/src/imgs/cats/Airic/airic.jpg","/src/imgs/cats/Airic/airic04.jpg","/src/imgs/cats/Airic/airic02.jpg","/src/imgs/cats/Airic/airic01.jpg","/src/imgs/cats/Airic/airic03.jpg"], "1"),
                pet("8", "Brice",           "m", "1523566800", "1", "2", "1",   "2",    ["/src/imgs/cats/Brice/brice.jpg","/src/imgs/cats/Brice/brice01.jpg","/src/imgs/cats/Brice/brice02.jpg","/src/imgs/cats/Brice/brice03.jpg","/src/imgs/cats/Brice/brice11.jpg","/src/imgs/cats/Brice/brice09.jpg","/src/imgs/cats/Brice/brice10.jpg","/src/imgs/cats/Brice/brice04.jpg","/src/imgs/cats/Brice/brice05.jpg","/src/imgs/cats/Brice/brice06.jpg","/src/imgs/cats/Brice/brice08.jpg","/src/imgs/cats/Brice/brice07.jpg"], "1"),
                pet("9", "Boudica",         "f", "1523566800", "1", "2", "1",   "2",    ["/src/imgs/cats/Boudica/boudica.jpg","/src/imgs/cats/Boudica/boudica10.jpg","/src/imgs/cats/Boudica/boudica09.jpg","/src/imgs/cats/Boudica/boudica11.jpg","/src/imgs/cats/Boudica/boudica07.jpg","/src/imgs/cats/Boudica/boudica06.jpg","/src/imgs/cats/Boudica/boudica08.jpg","/src/imgs/cats/Boudica/boudica01.jpg","/src/imgs/cats/Boudica/boudica02.jpg","/src/imgs/cats/Boudica/boudica03.jpg","/src/imgs/cats/Boudica/boudica04.jpg","/src/imgs/cats/Boudica/boudica05.jpg"], "1")
            ];

            this.pets.forEach(function(item, i, arr) {
                item.mainImg = item.imgs.shift();
            });

            this.titles = [
                title("1", "", "Нет титулов"),
                title("2", "K-Ch.", "Котенок-чемпион"),
                title("3", "J-Ch.", "Юниор-чемпион"),
                title("4", "Ch.", "Чемпион"),
                title("5", "I.Ch.", "Международный чемпион"),
                title("6", "Gr.I.Ch.", "Большой международный чемпион"),
                title("7", "E.Ch.", "Европейский чемпион"),
                title("8", "C.Ch.", "Континентальный чемпион"),
                title("9", "Gr.E.Ch.", "Большой европейский чемпион"),
                title("10", "Gr.C.Ch.", "Большой континентальный чемпион"),
                title("11", "W.Ch.", "Чемпион мира")
            ];

            this.colors = [
                color("1", "n22", "Brown classic tabby"),
                color("2", "n24", "Brown spotted tabby")
            ]

            this.statuses = [
                status("1", "Продается"),
                status("2", "Зарезервирован"),
                status("3", "Продан"),
                status("4", "В племенной работе"),
                status("5", "На заслуженном отдыхе")
            ];

            this.litters = [
                litter("1", "A", "1486587600", "2", "1", "1"),
                litter("2", "B", "1523566800", "4", "5", "1")
            ]
        }
    }
</script>

<style>

    :root {
        --blackText: #000000;
        --greyText: #5e5e5e;
        --khakiText: #908402;
        --customOrange: #f68606;
        --customRed: #c12904;
        --lightBiege: #f8f7f2;
        --darkBiege: #f3f2ed;
        --catsLoopBg: url(/src/imgs/cats_loop_biege.png);
    }

    .btn-light {
        padding: 0px;
        margin: 0px 20px;
        width: 100px;
        height: 44px;
        border: solid 2px transparent;
        border-radius: 3px;
        background-image: linear-gradient(var(--lightBiege), var(--lightBiege)), linear-gradient(45deg, var(--customRed), var(--customOrange));
        background-origin: border-box;
        background-clip: content-box, border-box;
        transition: all .5s ease-in-out;
        outline: none;
    }

    .btn-light:disabled {
        opacity: .3;
        cursor: not-allowed;
    }

    .btn-dark {
        padding: 12px 30px;
        border: none;
        border-radius: 3px;
        background-image: linear-gradient(45deg, var(--customRed), var(--customOrange));
        transition: all .5s ease-in-out;
        outline: none;
        color: #f9f7f2
    }

    .photoList {
        display: flex;
        margin: 40px auto 20px;
        flex-wrap: wrap;
    }

    .pet-details .photoList .kitten-box {
        width: 200px;
    }

    .pet-parents-details h2 {
        margin: 5px auto 10px;
        font-weight: 500;
        text-align: center;
    }

    .pet-details .pet-info {
        text-align: center;
    }

    .inheritance-arrow {
        width: 30%;
        display: block;
        margin: 5px auto 20px;
    }

    .cat-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .kitten-box-caption {
        display: block;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        color: #fff;
        opacity: 0;
        background: rgba(13, 13, 13, 0.6);
        -moz-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        -webkit-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
    }



    .kitten-box {
        -webkit-mask: url("/src/imgs/mask.png");
        mask: url("/src/imgs/mask.png");
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
        display: block;
        position: relative;
        margin: 0 auto;
        max-width: 600px;
        overflow: hidden;
        margin-bottom: 15px;
    }

    .kitten-box-caption-content {
        position: relative;
        top: 25%;
        width: 100%;
        text-align: center;
    }

    .cat-list .kitten-box {
        max-width: 350px;
    }

    .kitten-item button {
        opacity: 0;
        transform: translateY(80px);
        margin: 35px 20px 0px;
    }
    .kitten-item .btn-dark {
        transition: all .7s ease-out .1s;
        -webkit-transition: all .7s ease-out .1s;
        -o-transition: all .7s ease-out .1s;
        -moz-transition: all .7s ease-out .1s;
    }

    .kitten-item:hover button {
        opacity: 1;
        transform: translateY(50px);
    }

    .kitten-item .btn-light {
        width: 140px;
        color: #333;
    }

    .modal .kitten-box {
        cursor: pointer;
    }

    .kitten-box .kitten-name,
    .kitten-box .kitten-gender {
        padding: 0 15px;
    }

    .kitten-box .kitten-name {
        text-transform: uppercase;
        font-size: 22px;
        font-weight: 700;
    }

    .kitten-box .kitten-gender {
        font-size: 18px;
    }

    .kitten-box:hover .kitten-box-caption {
        opacity: 1;
    }

    .cat-list .kitten-box img {
        transition: all 4s ease-in-out;
        transform: scale(1.2);
    }

    .kitten-box:hover img {
        transform: scale(1);
    }

    .kitten-box .kitten-box-caption .kitten-box-caption-content * {
        letter-spacing: 0px;
        transition: all 4s ease-out;
    }

    .kitten-box:hover .kitten-box-caption .kitten-box-caption-content * {
        letter-spacing: 2px;
        transform: scale(1.5);
    }

    /* ==========================================================================
    Modals
    ========================================================================== */

    .modal {
        overflow-y: auto;
    }
    .modal-backdrop {
        background: #FFF;
    }

    .modal-content {
        border-radius: 0px;
        border: none;
        box-shadow: 0 5px 15px rgba(0, 0, 0, .2);
    }

    .modal-content * {
        outline: none;
    }

    .modal-content h4 {
        margin-bottom: 30px;
        color: var(--khakiText);
    }

    .modal-header {
        border-bottom: none;
        height: 60px;
    }

    .modal-header .close {
        font-size: 36px;
        font-weight: 400;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zd…w9InVybCgjZ3JhZGllbnQpIiBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxMDAlIiAvPjwvc3ZnPg==);
        background-image: -webkit-gradient(linear, left top, 225deg, color-stop(0%, #F68606), color-stop(100%, #C12A04));
        background-image: -moz-linear-gradient(225deg, #F68606 0%, #C12A04 100%);
        background-image: -webkit-linear-gradient(225deg, #F68606 0%, #C12A04 100%);
        background-image: -o-linear-gradient(225deg, #F68606 0%, #C12A04 100%);
        background-image: -ms-linear-gradient(225deg, #F68606 0%, #C12A04 100%);
        background-image: linear-gradient(225deg, #F68606 0%, #C12A04 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        opacity: .8;
        text-shadow: none;
    }

    .modal-body {
        padding: 20px 30px;
    }

    .modal-footer {
        background: var(--catsLoopBg);
        border-top: none;
        padding: 40px 60px;
        display: flex;
        justify-content: center;
    }

    .modal-footer .btn-light {
        width: 150px;
        margin: 0px 30px;
    }

    .modal-backdrop.show {
        opacity: .7;
    }

    .loader-img {
        display: block;
        margin: 0 auto;
    }

    /* ANIMATIONS */
    .modal-enter-active,
    .modal-leave-active {
        transition: all .3s;
        opacity: 1;
    }

    .modal-enter,
    .modal-leave-to {
        transform: translateY(-100px);
        opacity: 0;
    }

    .customfade-enter-active {
        animation: .3s fade forwards;
    }

    .customfade-leave-active {
        animation: .3s fade reverse;
    }

    .customfade-enter,
    .customfade-leave-to {
        opacity: 0;
    }

    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: .5;
        }
    }
</style>
