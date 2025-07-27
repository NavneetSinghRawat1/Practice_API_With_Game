let btn = document.getElementById('btn');
let your_store_score = document.getElementById('your_score');
let comp_store_score = document.getElementById('comp_score');
let show_rolling = document.getElementById('card_box');
let insert_img_in_roller = document.getElementById('insert_image');
let btn_ok = document.getElementById('btn_ok');
let card_name = document.getElementById('card_name');
let card_race = document.getElementById('card_race');
let card_maxKi = document.getElementById('card_maxKi');
let winner_background = document.getElementById('winner_background');
let Winner = document.getElementById('Winner');
let Winner_message = document.getElementById('Winner_message');
let your_team_score = document.getElementById('your_team_score');
let comp_team_score = document.getElementById('comp_team_score');
const flipCard = document.getElementById('card_1');
const base = "https://dragonball-api.com/api/characters/";
let take_img;
let sum;
let sum_1;
let you = 1, comp = 5;
let your_scrore = 0, comp_score = 0;
btn.addEventListener('click', random);
for (let i = 1; i <= 8; i++) {
    let box = document.getElementById(`box_${i}`);
    box.appendChild(document.createElement('img'));
    let x = box.children[0];
    x.style.height = "100%";
    x.style.width = "100%";
}
function random_1(a) {
    let random_no = Math.floor(Math.random() * 35) + 1;
    const base_2 = base + random_no;
    const get_img_base = async () => {
        let response = await fetch(base_2);
        let data = await response.json();
        let temp = new Promise(() => {
            show_rolling.classList.add('show');
            let take_img;

            if (a == 1) {
                if (data['transformations'].length == 0) {
                    take_img = data['image'];
                    card_name.setAttribute('name', data['name']);
                    card_race.setAttribute('race', data['race']);
                    card_maxKi.setAttribute('maxKi', data['maxKi']);
                }
                else {
                    let max_img = data['transformations'][data['transformations'].length - 1];
                    take_img = max_img['image'];
                    card_name.setAttribute('name', max_img['name']);
                    card_race.setAttribute('race', max_img['race']);
                    card_maxKi.setAttribute('maxKi', max_img['maxKi']);
                }
                btn_ok.style.display = "";
                document.getElementById('Chance').innerText = "Your Chance:";
                insert_img_in_roller.setAttribute('src', take_img);
                flipCard.classList.add('flipping');
                btn_ok.disabled = "true";
                flipCard.addEventListener('animationend', () => {
                    flipCard.classList.remove('flipping');
                    flipCard.classList.add('is-flipped');
                    btn_ok.removeAttribute('disabled');
                    card_name.innerText = "Name: " + card_name.getAttribute('name');
                    card_race.innerText = "Race: " + card_race.getAttribute('race');
                    document.getElementById('card_1').style.border = "2px solid black";
                    document.getElementById('card_1').style.borderRadius = "4px";
                    sum = sum_number(data['maxKi'], 1);
                    let no = data['maxKi'].split(" ");
                    no[0] = no[0].replaceAll(".", "");
                    no[0] = parseFloat(no[0]);
                    card_maxKi.innerText = "MaxKi: " + no[0] + " " + ((no[1] != undefined) ? no[1] : "");
                }, { once: true });
                btn_ok.addEventListener('click', () => {
                    document.getElementById(`box_${you}`).style.backgroundImage = "url('https://web.dragonball-api.com/images-compress/89980.webp')";
                    document.getElementById(`box_${you}`).style.backgroundRepeat = "no-repeat";
                    document.getElementById(`box_${you}`).style.backgroundSize = "cover";
                    document.getElementById(`box_${you}`).children[0].setAttribute('src', take_img);
                    show_rolling.classList.remove('show');
                    flipCard.classList.remove('is-flipped');
                    card_name.innerText = "Name:";
                    card_race.innerText = "Race:";
                    card_maxKi.innerText = "MaxKi:";
                    document.getElementById('card_1').style.border = "";
                    document.getElementById('card_1').style.borderRadius = "";
                    you++;
                    your_store_score.innerText = "Your Team Total Ki: " + sum;
                    re_size(sum, 1);
                    chanche_of_computer();
                }, { once: true });
            }
            else {
                if (data['transformations'].length == 0) {
                    take_img = data['image'];
                    card_name.setAttribute('name', data['name']);
                    card_race.setAttribute('race', data['race']);
                    card_maxKi.setAttribute('maxKi', data['maxKi']);
                }
                else {
                    let max_img = data['transformations'][data['transformations'].length - 1];
                    take_img = max_img['image'];
                    card_name.setAttribute('name', max_img['name']);
                    card_race.setAttribute('race', max_img['race']);
                    card_maxKi.setAttribute('maxKi', max_img['maxKi']);
                }
                btn_ok.style.display = "none";
                document.getElementById('Chance').innerText = "Computer Chance:";
                insert_img_in_roller.setAttribute('src', take_img);
                flipCard.classList.add('flipping');
                flipCard.addEventListener('animationend', () => {
                    flipCard.classList.remove('flipping');
                    flipCard.classList.add('is-flipped');
                    card_name.innerText = "Name: " + card_name.getAttribute('name');
                    card_race.innerText = "Race: " + card_race.getAttribute('race');
                    document.getElementById('card_1').style.border = "2px solid black";
                    document.getElementById('card_1').style.borderRadius = "4px";
                    sum_1 = sum_number(data['maxKi'], 0);
                    let no = data['maxKi'].split(" ");
                    no[0] = no[0].replaceAll(".", "");
                    no[0] = parseFloat(no[0]);
                    card_maxKi.innerText = "MaxKi: " + no[0] + " " + ((no[1] != undefined) ? no[1] : "");
                }, { once: true });
                setTimeout(() => {
                    document.getElementById(`box_${comp}`).style.backgroundImage = "url('https://web.dragonball-api.com/images-compress/89980.webp')";
                    document.getElementById(`box_${comp}`).style.backgroundRepeat = "no-repeat";
                    document.getElementById(`box_${comp}`).style.backgroundSize = "cover";
                    document.getElementById(`box_${comp}`).children[0].setAttribute('src', take_img);
                    show_rolling.classList.remove('show');
                    flipCard.classList.remove('is-flipped');
                    card_name.innerText = "Name:";
                    card_race.innerText = "Race:";
                    card_maxKi.innerText = "MaxKi:";
                    document.getElementById('card_1').style.border = "";
                    document.getElementById('card_1').style.borderRadius = "";
                    comp_store_score.innerText = "Computer Team Total Ki: " + sum_1;
                    re_size(sum_1, 0);
                    comp++;
                    setTimeout(() => {
                        if (comp == 9) {
                            winner_background.classList.add('show_1');
                            if (your_scrore > comp_score) {
                                Winner.innerText = "You Win!";
                                Winner_message.innerText = "Congratulations on your amazing victory!";
                            }
                            else if (your_scrore < comp_score) {
                                Winner.innerText = "Computer Win!";
                                Winner_message.innerText = "Nice Try!";
                            }
                            else {
                                Winner.innerText = "Match Draw!";
                                Winner_message.innerText = "Well Played!";
                            }
                            your_team_score.innerText = "Your Team Score: " + sum;
                            comp_team_score.innerText = "Computer Team Score: " + sum_1;
                        }
                    }, 500);
                }, 3500);
            }
        });
        let temp_1 = await temp;
    }
    get_img_base();
}
function chanche_of_computer() {
    random_1(0);
}

function random() {
    random_1(1);
}
function sum_number(check, a) {
    let count;
    let no = check.split(" ");
    no[0] = no[0].replaceAll(".", "");
    no[0] = parseFloat(no[0]);
    if (check.indexOf('Septillion') != -1 || check.indexOf('septillion') != -1 || check.indexOf('septllion') != -1) // This spelling error are coming from api
    {
        count = no[0] * Math.pow(10, 24);
    }
    else if (check.indexOf('Billion') != -1) {

        count = no[0] * Math.pow(10, 9);
    }
    else if (check.indexOf('Quintillion') != -1) {

        count = no[0] * Math.pow(10, 18);
    }
    else if (check.indexOf('Trillion') != -1) {

        count = no[0] * Math.pow(10, 12);
    }
    else if (check.indexOf('Quadrillion') != -1) {

        count = no[0] * Math.pow(10, 15);
    }
    else {
        count = parseInt(no[0]);
    }
    if (a == 1) {
        your_scrore += count;
        const formatter = new Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'long'
        });

        const formattedNumber = formatter.format(your_scrore);
        return formattedNumber;
    }
    else {
        comp_score += count;
        const formatter = new Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'long'
        });
        const formattedNumber = formatter.format(comp_score);
        return formattedNumber;
    }
}
function re_size(change_font_size, a) {
    if (a == 1 && change_font_size.indexOf('trillion') != -1) {
        document.getElementById('your_score').style.fontSize = "2rem";
    }
    else if (a == 0 && change_font_size.indexOf('trillion') != -1) {
        document.getElementById('comp_score').style.fontSize = "1.8rem";
    }
}
