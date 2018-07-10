import Vue from 'vue'
import VueResource from 'vue-resource';
import App from './App.vue'

Vue.use(VueResource)

Vue.http.options.root = 'https://testvue-67674.firebaseio.com';
// Vue.http.interceptors.push((request, next) => {
//     console.log(request);
//     if(request.method == 'POST') {
//         request.method = 'PUT';
//     }
//     next(response => {
//
//     });
// })

new Vue({
    el: '#app',
    render: h => h(App)
})






// const pet = (id, gender, birthdate, is_owned, title_id, color_id, status_id, litter_id, imgs, published) => ({id, gender, birthdate, is_owned, title_id, color_id, status_id, litter_id, imgs, published})
// const title = (id, abbr, description) => ({id, abbr, description});
// const color = (id, name, description) => ({id, name, description});
// const status = (id, title) => ({id, title});
// const litter = (id, charcode, birthdate, father_id, mother_id, published) => ({id, charcode, birthdate, father_id, mother_id, published});
//
// const genders = {
//     m: 'Male',
//     f: 'Female'
// }
//
// const titles = [
//     title("1", "", "Нет титулов"),
//     title("2", "K-Ch.", "Котенок-чемпион"),
//     title("3", "J-Ch.", "Юниор-чемпион"),
//     title("4", "Ch.", "Чемпион"),
//     title("5", "I.Ch.", "Международный чемпион"),
//     title("6", "Gr.I.Ch.", "Большой международный чемпион"),
//     title("7", "E.Ch.", "Европейский чемпион"),
//     title("8", "C.Ch.", "Континентальный чемпион"),
//     title("9", "Gr.E.Ch.", "Большой европейский чемпион"),
//     title("10", "Gr.C.Ch.", "Большой континентальный чемпион"),
//     title("11", "W.Ch.", "Чемпион мира")
// ];
//
// const colors = [
//     color("1", "n22", "Brown classic tabby"),
//     color("2", "n24", "Brown spotted tabby")
// ]
//
// const statuses = [
//     status("1", "Продается"),
//     status("2", "Зарезервирован"),
//     status("3", "Продан"),
//     status("4", "В племенной работе"),
//     status("5", "На заслуженном отдыхе")
// ];
//
// const litters = [
//     litter("1", "A", "1486587600", "2", "1", "1"),
//     litter("2", "B", "1523566800", "4", "5", "1")
// ]
//
// const pets = [
//     pet("1", "Valkyrie", "f", "1390161600", "4", "2", "4"	, null,	["/web/uploads/cats/Valkyrie/valkyrie.jpg","/web/uploads/cats/Valkyrie/valkyrie01.jpg","/web/uploads/cats/Valkyrie/valkyrie02.jpg","/web/uploads/cats/Valkyrie/valkyrie03.jpg","/web/uploads/cats/Valkyrie/valkyrie04.jpg","/web/uploads/cats/Valkyrie/valkyrie05.jpg","/web/uploads/cats/Valkyrie/valkyrie06.jpg","/web/uploads/cats/Valkyrie/valkyrie07.jpg","/web/uploads/cats/Valkyrie/valkyrie08.jpg"], "1"),
//     pet("2", "Harty", "m", "1399752000", "4", "2", "4"	, null,	["/web/uploads/cats/Harty/harty.jpg","/web/uploads/cats/Harty/harty01.jpg","/web/uploads/cats/Harty/harty02.jpg"], "1"),
//     pet("3", "Marilyn Monroe", "f", "1458162000", "4", "2", "4"	, null,	["/web/uploads/cats/Marilyn_Monroe/mary.jpg","/web/uploads/cats/Marilyn_Monroe/mary02.jpg","/web/uploads/cats/Marilyn_Monroe/mary06.jpg","/web/uploads/cats/Marilyn_Monroe/mary03.jpg","/web/uploads/cats/Marilyn_Monroe/mary01.jpg","/web/uploads/cats/Marilyn_Monroe/mary04.jpg","/web/uploads/cats/Marilyn_Monroe/mary05.jpg","/web/uploads/cats/Marilyn_Monroe/mary07.jpg"], "1"),
//     pet("4", "Oin", "m", "1488834000", "4", "2", "4"	, null,	["/web/uploads/cats/Oin/oin.jpg","/web/uploads/cats/Oin/oin02.jpg","/web/uploads/cats/Oin/oin01.jpg","/web/uploads/cats/Oin/oin04.jpg","/web/uploads/cats/Oin/oin05.jpg","/web/uploads/cats/Oin/oin03.jpg"], "1"),
//     pet("5", "Aine", "f", "1486587600", "1", "1", "4", "1", ["/web/uploads/cats/Aine/aine.jpg","/web/uploads/cats/Aine/aine01.jpg","/web/uploads/cats/Aine/aine02.jpg","/web/uploads/cats/Aine/aine04.jpg","/web/uploads/cats/Aine/aine03.jpg"], "1"),
//     pet("6", "Aislynn", "f", "1486587600", "1", "2", "1", "1", ["/web/uploads/cats/Aislynn/ayslinn.jpg","/web/uploads/cats/Aislynn/ayslinn05.jpg","/web/uploads/cats/Aislynn/ayslinn04.jpg","/web/uploads/cats/Aislynn/ayslinn06.jpg","/web/uploads/cats/Aislynn/ayslinn01.jpg","/web/uploads/cats/Aislynn/ayslinn03.jpg","/web/uploads/cats/Aislynn/ayslinn02.jpg"], "1"),
//     pet("7", "Airic", "f", "1486587600", "1", "2", "3", "1", ["/web/uploads/cats/Airic/airic.jpg","/web/uploads/cats/Airic/airic04.jpg","/web/uploads/cats/Airic/airic02.jpg","/web/uploads/cats/Airic/airic01.jpg","/web/uploads/cats/Airic/airic03.jpg"], "1"),
//     pet("8", "Brice", "m", "1523566800", "1", "2", "1", "2", ["/web/uploads/cats/Brice/brice.jpg","/web/uploads/cats/Brice/brice01.jpg","/web/uploads/cats/Brice/brice02.jpg","/web/uploads/cats/Brice/brice03.jpg","/web/uploads/cats/Brice/brice11.jpg","/web/uploads/cats/Brice/brice09.jpg","/web/uploads/cats/Brice/brice10.jpg","/web/uploads/cats/Brice/brice04.jpg","/web/uploads/cats/Brice/brice05.jpg","/web/uploads/cats/Brice/brice06.jpg","/web/uploads/cats/Brice/brice08.jpg","/web/uploads/cats/Brice/brice07.jpg"], "1"),
//     pet("9", "Boudica", "f", "1523566800", "1", "2", "1", "2", ["/web/uploads/cats/Boudica/boudica.jpg","/web/uploads/cats/Boudica/boudica10.jpg","/web/uploads/cats/Boudica/boudica09.jpg","/web/uploads/cats/Boudica/boudica11.jpg","/web/uploads/cats/Boudica/boudica07.jpg","/web/uploads/cats/Boudica/boudica06.jpg","/web/uploads/cats/Boudica/boudica08.jpg","/web/uploads/cats/Boudica/boudica01.jpg","/web/uploads/cats/Boudica/boudica02.jpg","/web/uploads/cats/Boudica/boudica03.jpg","/web/uploads/cats/Boudica/boudica04.jpg","/web/uploads/cats/Boudica/boudica05.jpg"], "1")
// ];














