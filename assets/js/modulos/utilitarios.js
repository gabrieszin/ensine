const isEmpty = (valor) => {
  if(typeof valor == 'string'){
    return valor == undefined || valor == null || valor.length <= 0;
  }else if(Array.isArray(valor)){
    return valor.length <= 0;
  }else{
    return valor == undefined || valor == null
  }
}

const capitalize = (valor) => {
  return valor.charAt(0).toUpperCase() + valor.substr(1, valor.length);
}

const atualizarDatas = () => {
  const dataAtual = new Date();
  document.querySelectorAll("[data-ano-atual]").forEach(area => {
    area.textContent = `${dataAtual.getFullYear()}`;
  })
} 

const controleFechamentoModal = () => {
  const modais = document.querySelectorAll('.modal');
  modais.forEach(modal => {
    const btnFecha = modal.querySelector('[data-modal-fecha]');
    btnFecha.addEventListener('click', () => {
      $('#' + modal.id).modal('hide');
    })
  })
}

function sanitizarString(string){
  if(typeof string == 'string'){
    const substituir = [
      {
        original: '-',
        subst: ''
      },
      {
        original: '(',
        subst: ''
      },
      {
        original: ')',
        subst: ''
      },
      {
        original: ' ',
        subst: ''
      },
    ]
    
    substituir.forEach(substituicao => {
      string = string.replace(substituicao.original, substituicao.subst)
    })
    
    return string.trim();
  }else{
    console.log('O tipo do parâmetro passado não é uma string.');
    return null;
  }
}

const pegarNomeDominio = (url) => {
  try{
    const urlOutro = new URL(url).host.toString().split('.');
    let marca_dominio = '';

    const procurar = urlOutro[(urlOutro.length - 1)];

    if(urlOutro.indexOf(`${procurar}`) >= 0){
      marca_dominio = urlOutro.indexOf(`${procurar}`);
    }else if(urlOutro.indexOf(`${procurar}/`) >= 0){
      marca_dominio = urlOutro.indexOf(`${procurar}/`);
    }else{
      marca_dominio = null;
    }
    
    if(marca_dominio !== null){
      const nomeDominio = urlOutro[marca_dominio - 1];
      return nomeDominio.charAt(0).toUpperCase() + nomeDominio.substring(1, nomeDominio.length).toLowerCase();
    } else {
      return null;
    }
  }catch(error){
    
  }
}

export{
  isEmpty,
  capitalize,
  atualizarDatas,
  controleFechamentoModal,
  sanitizarString,
  pegarNomeDominio
}