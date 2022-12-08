let input = document.querySelector('#pais');

let botao = document.querySelector('#submit');

let info = document.querySelector('#info');

let titulo, imagem, paragrafo, imagem2, paragrafo2;

titulo = document.createElement('h1');

imagem = document.createElement('img');

imagem.src = '';

imagem2 = document.createElement('img');

imagem2.src = '';

paragrafo = document.createElement('p');

paragrafo2 = document.createElement('p');

let bu;

info.appendChild(titulo);
info.appendChild(imagem);
info.appendChild(paragrafo);
info.appendChild(imagem2);
info.appendChild(paragrafo2);

botao.addEventListener('click', async function() {
    if(!info.classList.contains('hidden')) {
        info.classList.add('hidden');
    }

    try {
        let resposta = await fetch(`https://restcountries.com/v3.1/name/${input.value}`);

        let informacoes = await resposta.json();
    
        input.value = '';
    
        titulo.innerHTML = `About ${informacoes[0].name.common}`;
    
        imagem.src = informacoes[0].flags.png;
    
        info.classList.toggle('hidden');
    
        paragrafo.innerHTML = `${informacoes[0].name.official}, or ${informacoes[0].name.common}, is`;
    
        if(informacoes[0].independent) {
            paragrafo.innerHTML += ' an independent country and';
        } else {
            paragrafo.innerHTML += ' not an independent country and';
            console.log(informacoes[0].tld.independent);
        }
    
        if(informacoes[0].unMember) {
            paragrafo.innerHTML += ' a UN member.';
        } else {
            paragrafo.innerHTML += ' not a UN member.';
        }
    
        paragrafo.innerHTML += '<br><br>';
    
        paragrafo.innerHTML += ' The country is located in';
    
        if(informacoes[0].region == 'Americas') {
            paragrafo.innerHTML += ` ${informacoes[0].region.slice(0, informacoes[0].region.length - 1)}, in the subregion of`;
        } else {
            paragrafo.innerHTML += ` ${informacoes[0].region}, in the subregion of`;
        }
    
        paragrafo.innerHTML += ` ${informacoes[0].subregion}. The main language spoken in the country is ${informacoes[0].languages[Object.keys(informacoes[0].languages)[0]]}.`;
    
        paragrafo.innerHTML += `<br><br>`;
    
        paragrafo.innerHTML += `The country's capital is ${informacoes[0].capital} and the currency used by the country is the ${informacoes[0].currencies[Object.keys(informacoes[0].currencies)[0]].name} (${informacoes[0].currencies[Object.keys(informacoes[0].currencies)[0]].symbol}).`;
    
        imagem2.src = informacoes[0].coatOfArms.png;
    
        paragrafo2.innerHTML = `This is the country's coat of arms.`;    
    } catch(err) {
        console.log(err)
    }
})